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
import {
    TEXT_COURSE_PUBLISHED,
    TEXT_COURSE_PUBLISH_NO_STEP_OR_DESCRIPTION_WARNING,
    TEXT_COURSE_SAVED,
    TEXT_COURSE_SAVE_NO_STEP_OR_DESCRIPTION_WARNING,
    TEXT_PUBLISH,
    TEXT_SAVE,
    TEXT_SOMETHING_WENT_WRONG,
} from '../../texts';

import PageHeader from '../../components/common/PageHeader';
import { getCourseTitle, getCourseSubtitle } from '../../helpers/namesFactory';
import CourseEditDetails from './CourseEditDetails';

const PublishButton = ({ onClick }) => {
    return (
        <Button
            data-cy="course-details-edit-publish"
            onClick={onClick}
            type="primary"
        >
            {TEXT_PUBLISH}
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
            {TEXT_SAVE}
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

    const publish = () => {
        const command = {
            type: Enums.COMMAND_TYPES.UPDATE_COURSE,
            is_draft: false,
            description: courseDescription,
            steps: mapToCourseSteps(courseSteps),
        };

        if (!validateBeforePublish(command.steps, command.description)) {
            notification.error({
                message: TEXT_COURSE_PUBLISH_NO_STEP_OR_DESCRIPTION_WARNING,
            });
            return;
        }

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

    const save = () => {
        const command = {
            type: Enums.COMMAND_TYPES.UPDATE_COURSE,
            description: courseDescription,
            steps: mapToCourseSteps(courseSteps),
        };

        console.log(command);
        if (!validateBeforeSave(command.steps, command.description)) {
            notification.error({
                message: TEXT_COURSE_SAVE_NO_STEP_OR_DESCRIPTION_WARNING,
            });
            return;
        }

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
    };

    const validateBeforePublish = (steps, description) => {
        return steps.length > 0 && description.length > 0;
    };

    const validateBeforeSave = (steps, description) => {
        return steps.length > 0 || description.length > 0;
    };

    const actions = [
        <PublishButton onClick={publish} />,
        <SaveButton onClick={save} />,
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
