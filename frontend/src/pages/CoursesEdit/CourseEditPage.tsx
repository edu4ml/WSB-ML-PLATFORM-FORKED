import { Button, Card, notification, Space, Typography } from 'antd';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import CardHeader from '../../components/common/CardHeader';

import { useNavigate } from 'react-router-dom';
import {
    useIssueCourseCommandMutation,
    useGetCourseQuery,
} from '../../features/courses/coursesApi';
import { Enums } from '../../shared';
import CourseEditStepsList from './CourseEditStepsList';
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

import PageHeader from '../../components/common/PageHeader';
import { getCourseTitle, getCourseSubtitle } from '../../helpers/namesFactory';
import CourseEditDetails from './CourseEditDetails';

const { Paragraph } = Typography;

const PublishButton = ({ steps }) => {
    const [issueCommand, {}] = useIssueCourseCommandMutation();

    const publish = () => {
        const command = {
            type: Enums.COMMAND_TYPES.UPDATE_COURSE,
            is_draft: false,
            description: courseDescription,
            steps: mapToCourseSteps(courseSteps),
        };

        issueCommand({ id: courseId, command })
            .unwrap()
            .then((res) => {
                notification.info({
                    message: TEXT_COURSE_PUBLISHED,
                    duration: 2,
                });
                navigate('/app/courses/');
            })
            .catch((err) => {
                notification.error({
                    message: TEXT_SOMETHING_WENT_WRONG,
                });
            });
    };

    return (
        <Button
            data-cy="course-details-edit-publish"
            onClick={onClick}
            style={{
                float: 'right',
                marginLeft: '10px',
            }}
            type="primary"
        >
            {TEXT_PUBLISH}
        </Button>
    );
};

const SaveButton = ({ onClick }) => {
    const [issueCommand, {}] = useIssueCourseCommandMutation();

    return (
        <Button
            data-cy="course-details-edit-save"
            onClick={onClick}
            style={{
                float: 'right',
                marginLeft: '10px',
            }}
            type="primary"
        >
            {TEXT_SAVE}
        </Button>
    );
};

const CourseEditPage = () => {
    const navigate = useNavigate();
    const { courseId } = useParams();
    const { data: course, isLoading, isSuccess } = useGetCourseQuery(courseId);

    const [issueCommand, {}] = useIssueCourseCommandMutation();
    const [courseSteps, setCourseSteps] = useState([]);
    const [courseDescription, setCourseDescription] = useState('');
    const [notSaved, setNotSaved] = useState(false);

    useEffect(() => {
        if (course) {
            setCourseDescription(course.description);
            setCourseSteps(course.steps);
        }
    }, [course]);

    useEffect(() => {
        setNotSaved(true);
    }, [courseSteps, courseDescription]);

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
                    description: courseDescription,
                    steps: mapToCourseSteps(courseSteps),
                };

                issueCommand({ id: courseId, command })
                    .unwrap()
                    .then((res) => {
                        notification.info({
                            message: TEXT_COURSE_PUBLISHED,
                            duration: 2,
                        });
                        navigate('/app/courses/');
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
            type: notSaved ? 'primary' : 'default',
            onClick: () => {
                const command = {
                    type: Enums.COMMAND_TYPES.UPDATE_COURSE,
                    description: courseDescription,
                    steps: mapToCourseSteps(courseSteps),
                };

                issueCommand({ id: courseId, command })
                    .unwrap()
                    .then((res) => {
                        notification.info({
                            message: TEXT_COURSE_SAVED,
                            duration: 2,
                        });
                        setNotSaved(false);
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

    // if (!isLoading && isSuccess) {
    //     return (
    //         <Card
    //             title={
    //                 <CardHeader
    //                     title={
    //                         course.is_draft
    //                             ? `${course.title} (${TEXT_DRAFT_VERSION})`
    //                             : `${course.title} (${TEXT_COURSE_PUBLISHED})`
    //                     }
    //                     actions={course.is_draft ? actions : []}
    //                 />
    //             }
    //             bordered={false}
    //         >
    //             <Paragraph
    //                 data-cy={'course-details-edit-description'}
    //                 editable={{
    //                     onChange: handleDescriptionChange,
    //                 }}
    //             >
    //                 {editableDescription}
    //             </Paragraph>
    //             <CourseEditStepsList
    //                 editable={course.is_draft}
    //                 dataSource={dataSource}
    //                 setDataSource={setDataSource}
    //                 setEditedButNotSaved={setEditedButNotSaved}
    //             />
    //         </Card>
    //     );
    // }
    // return <div></div>;

    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <PageHeader
                title={getCourseTitle(course)}
                actions={undefined}
                subtitle={getCourseSubtitle(course)}
            />
            <CourseEditDetails
                onUpdateDescription={setCourseDescription}
                onUpdateSteps={setCourseSteps}
                description={courseDescription}
                steps={courseSteps}
            />
        </Space>
    );
};
export default CourseEditPage;
