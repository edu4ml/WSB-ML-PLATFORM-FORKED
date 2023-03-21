import { Card, Typography } from 'antd';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import CardHeader from '../../components/common/CardHeader';

import {
    useIssueCourseCommandMutation,
    useGetCourseQuery,
} from '../../features/courses/coursesApi';
import { Enums } from '../../shared';
import CourseEditStepsList from '../../components/courses/CourseEditStepsList';
import {
    CardHeaderRightButtonActionType,
    CourseComponentItemType,
} from '../../types/course';

const { Paragraph } = Typography;

const CourseEditPage = () => {
    const { courseId } = useParams();
    const { data: course, isLoading, isSuccess } = useGetCourseQuery(courseId);
    const [issueCommand, {}] = useIssueCourseCommandMutation();
    const [dataSource, setDataSource] = useState([]);
    const [editedButNotSaved, setEditedButNotSaved] = useState(false);

    const [editableDescription, setEditableDescription] = useState('');

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
        return data.map((item: CourseComponentItemType, index: number) => ({
            content_type: item.content_type,
            uuid: item.uuid,
            order: index + 1,
        }));
    };

    let actions: Array<CardHeaderRightButtonActionType> = [
        {
            text: 'Opublikuj',
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
                        console.log('Success!', res);
                    })
                    .catch((err) => {
                        console.error('Err: ', err);
                    });
            },
            type: 'default',
            dataCy: 'course-details-edit-publish',
        },
        {
            text: 'Zapisz',
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
                        console.log('Success!: ', res);
                        setEditedButNotSaved(false);
                    })
                    .catch((err) => {
                        console.log('Err: ', err);
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
                                ? `${course.title} (Wersja robocza)`
                                : `${course.title} (Ten kurs jest opublikowany)`
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
