import { Button, Progress, notification } from 'antd';
import React from 'react';
import { CourseType } from '../../../types/course';
import { useNavigate } from 'react-router-dom';
import { UserType } from '../../../types/user';
import { useTranslation } from 'react-i18next';
import { Enums } from '../../../shared';
import { useIssueCommandMutation } from '../../../features/courses/coursesApi';

const CourseDetailsButton = ({ course }: { course: CourseType }) => {
    const { t } = useTranslation();

    const navigate = useNavigate();
    return (
        <Button
            onClick={() => {
                navigate(`/app/courses/${course.uuid}/edit`);
            }}
            style={{ width: '100%' }}
        >
            {course.is_draft ? t('Edit') : t('Details')}
        </Button>
    );
};

const CourseEnrollButton = ({
    course,
    user,
}: {
    course: CourseType;
    user: UserType;
}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [issueCommand, {}] = useIssueCommandMutation();

    const command = {
        type: Enums.COMMAND_TYPES.ENROLL_FOR_COURSE,
        user_uuid: user.pk,
        course_uuid: course.uuid,
    };

    const handleEnroll = (command) => {
        issueCommand({
            command,
        })
            .unwrap()
            .then((res) => {
                notification.info({
                    message: t('Enrolled!'),
                    duration: 2,
                });
                navigate(`/app/courses/${course.uuid}`);
            })
            .catch((err) => {
                notification.error({
                    message: t('Ups! something went wrong!'),
                });
                console.error('Err: ', err);
            });
    };

    return (
        <Button onClick={() => handleEnroll(command)} style={{ width: '100%' }}>
            {t('Enroll')}
        </Button>
    );
};

const getActions = (course: CourseType, user: UserType) => {
    if (course.is_enrolled && !course.is_draft) {
        return (
            <Progress
                style={{ width: '400px' }}
                data-cy="course-list-item-progress"
                percent={course.progress}
            />
        );
    } else if (!course.is_enrolled && !course.is_draft) {
        return (
            <CourseEnrollButton key={'enroll'} course={course} user={user} />
        );
    } else {
        return <CourseDetailsButton key={'details'} course={course} />;
    }
};

export default getActions;
