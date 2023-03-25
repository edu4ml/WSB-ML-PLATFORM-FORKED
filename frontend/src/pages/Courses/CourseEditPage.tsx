import { Card, notification, Typography } from 'antd';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import CardHeader from '../../components/common/CardHeader';

import { useNavigate } from 'react-router-dom';
import {
    useIssueCourseCommandMutation,
    useGetCourseQuery,
} from '../../features/courses/coursesApi';
import { Enums } from '../../shared';
import CourseEditStepsList from '../../components/courses/CourseEditStepsList';
import {
    CardHeaderRightButtonActionType,
    CourseStepType,
} from '../../types/course';
import {
    TEXT_COURSE_PUBLISHED,
    TEXT_COURSE_SAVED,
    TEXT_DRAFT_VERSION,
    TEXT_PUBLISH,
    TEXT_SAVE,
    TEXT_SOMETHING_WENT_WRONG,
} from '../../texts';

const { Paragraph } = Typography;

const CourseEditPage = () => {
    const { courseId } = useParams();
    const { data: course, isLoading, isSuccess } = useGetCourseQuery(courseId);

    const [issueCommand, {}] = useIssueCourseCommandMutation();
    const [dataSource, setDataSource] = useState([]);
    const [editedButNotSaved, setEditedButNotSaved] = useState(false);

    const [editableDescription, setEditableDescription] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (course) {
            setEditableDescription(course.description);
            setDataSource(course.steps);
        }
    }, [course]);

    const handleDescriptionChange = (description: string) => {
        setEditedButNotSaved(true);
        setEditableDescription(description);
    };

    const mapToCourseSteps = (data) => {
        return data.map((item: CourseStepType, index: number) => ({
            component: item.component.uuid,
            order: index + 1,
            evaluation_type: item.evaluation_type,
        }));
    };

    let actions: Array<CardHeaderRightButtonActionType> = [
        {
            text: TEXT_PUBLISH,
            onClick: () => {
                const command = {
                    type: Enums.COMMAND_TYPES.UPDATE_COURSE,
                    is_draft: false,
                    description: editableDescription,
                    steps: mapToCourseSteps(dataSource),
                };

                issueCommand({ id: courseId, command })
                    .unwrap()
                    .then((res) => {
                        notification.info({
                            message: TEXT_COURSE_PUBLISHED,
                            duration: 2,
                        });
                        navigate('/courses/');
                    })
                    .catch((err) => {
                        notification.error({
                            message: TEXT_SOMETHING_WENT_WRONG,
                        });
                    });
            },
            type: 'default',
            dataCy: 'course-details-edit-publish',
        },
        {
            text: TEXT_SAVE,
            type: editedButNotSaved ? 'primary' : 'default',
            onClick: () => {
                const command = {
                    type: Enums.COMMAND_TYPES.UPDATE_COURSE,
                    description: editableDescription,
                    steps: mapToCourseSteps(dataSource),
                };

                issueCommand({ id: courseId, command })
                    .unwrap()
                    .then((res) => {
                        notification.info({
                            message: TEXT_COURSE_SAVED,
                            duration: 2,
                        });
                        setEditedButNotSaved(false);
                    })
                    .catch((err) => {
                        notification.error({
                            message: TEXT_SOMETHING_WENT_WRONG,
                        });
                    });
            },
            dataCy: 'course-details-edit-save',
        },
    ];

    if (!isLoading && isSuccess) {
        return (
            <Card
                title={
                    <CardHeader
                        title={
                            course.is_draft
                                ? `${course.title} (${TEXT_DRAFT_VERSION})`
                                : `${course.title} (${TEXT_COURSE_PUBLISHED})`
                        }
                        actions={course.is_draft ? actions : []}
                    />
                }
                bordered={false}
            >
                <Paragraph
                    data-cy={'course-details-edit-description'}
                    editable={{
                        onChange: handleDescriptionChange,
                    }}
                >
                    {editableDescription}
                </Paragraph>
                <CourseEditStepsList
                    editable={course.is_draft}
                    dataSource={dataSource}
                    setDataSource={setDataSource}
                    setEditedButNotSaved={setEditedButNotSaved}
                />
            </Card>
        );
    }
    return <div></div>;
};
export default CourseEditPage;
