import { Button, notification, Space } from 'antd';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import { useNavigate } from 'react-router-dom';
import {
    useIssueCourseCommandMutation,
    useGetCourseQuery,
} from '../../features/courses/coursesApi';
import { Enums } from '../../shared';
import { CourseStepType } from '../../types/course';

import PageHeader from '../../components/common/PageHeader';
import { getCourseTitle, getCourseSubtitle } from '../../helpers/namesFactory';
import CourseEditDetails from './CourseEditDetails';
import {
    CATEGORY_BUTTON_TEXTS,
    CATEGORY_NOTIFICATIONS,
    CATEGORY_OTHER_TEXTS,
} from '../../texts';

const PublishButton = ({ onClick }) => {
    return (
        <Button
            data-cy="course-details-edit-publish"
            onClick={onClick}
            type="primary"
        >
            {CATEGORY_BUTTON_TEXTS.publish}
        </Button>
    );
};

const SaveButton = ({ onClick }) => {
    return (
        <Button
            data-cy="course-details-edit-save"
            onClick={onClick}
            type="primary"
        >
            {CATEGORY_BUTTON_TEXTS.save}
        </Button>
    );
};

const CourseEditPage = () => {
    const navigate = useNavigate();
    const { courseId } = useParams();
    const { data: course } = useGetCourseQuery(courseId);

    const [issueCommand, {}] = useIssueCourseCommandMutation();
    const [courseSteps, setCourseSteps] = useState([]);
    const [courseDescription, setCourseDescription] = useState('');

    useEffect(() => {
        if (course) {
            setCourseDescription(course.description);
            setCourseSteps(course.steps);

            if (!course.is_draft) {
                navigate(`/app/courses/`);
            }
        }
    }, [course]);

    const mapToCourseSteps = (data) => {
        return data.map((item: CourseStepType, index: number) => ({
            component: item.component.uuid,
            order: index + 1,
            evaluation_type: item.evaluation_type,
        }));
    };

    const publish = () => {
        const command = {
            type: Enums.COMMAND_TYPES.UPDATE_COURSE,
            is_draft: false,
            description: courseDescription,
            steps: mapToCourseSteps(courseSteps),
        };

        if (!validateBeforePublish(command.steps, command.description)) {
            notification.error({
                message:
                    CATEGORY_OTHER_TEXTS.coursePublishNoStepOrDescriptionWarning,
            });
            return;
        }

        issueCommand({ id: courseId, command })
            .unwrap()
            .then((res) => {
                notification.info({
                    message: CATEGORY_NOTIFICATIONS.coursePublished,
                    duration: 2,
                });
                navigate('/app/courses/');
            })
            .catch((err) => {
                notification.error({
                    message: CATEGORY_NOTIFICATIONS.somethingWentWrong,
                });
            });
    };

    const save = () => {
        const command = {
            type: Enums.COMMAND_TYPES.UPDATE_COURSE,
            description: courseDescription,
            steps: mapToCourseSteps(courseSteps),
        };

        if (!validateBeforeSave(command.steps, command.description)) {
            notification.error({
                message:
                    CATEGORY_OTHER_TEXTS.courseSaveNoStepOrDescriptionWarning,
            });
            return;
        }

        issueCommand({ id: courseId, command })
            .unwrap()
            .then((res) => {
                notification.info({
                    message: CATEGORY_NOTIFICATIONS.courseSaved,
                    duration: 2,
                });
            })
            .catch((err) => {
                notification.error({
                    message: CATEGORY_NOTIFICATIONS.somethingWentWrong,
                });
            });
    };

    const validateBeforePublish = (steps, description) => {
        return steps.length > 0 && description.length > 0;
    };

    const validateBeforeSave = (steps, description) => {
        return steps.length > 0 || description.length > 0;
    };

    const actions = [
        <PublishButton key="publish" onClick={publish} />,
        <SaveButton key="save" onClick={save} />,
    ];

    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <PageHeader
                title={getCourseTitle(course)}
                actions={actions}
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
