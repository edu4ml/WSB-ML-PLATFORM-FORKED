import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CourseType } from '../../types/course';
import { Button, notification } from 'antd';
import { useIssueCourseCommandMutation } from '../../features/courses/coursesApi';
import { Enums } from '../../shared';
import { UserType } from '../../types/user';

const CourseDetailsButton = ({ course }: { course: CourseType }) => {
    const navigate = useNavigate();

    return (
        <Button
            onClick={() => {
                navigate(`/app/courses/${course.uuid}/edit`);
            }}
            style={{ width: '100%' }}
        >
            {course.is_draft ? 'Edytuj' : 'Szczegóły'}
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
    const [issueCourseCommand, {}] = useIssueCourseCommandMutation();
    const navigate = useNavigate();

    const command = {
        type: Enums.COMMAND_TYPES.ENROLL_FOR_COURSE,
        user_uuid: user.pk,
    };

    return (
        <Button
            onClick={() => {
                issueCourseCommand({
                    id: course.uuid,
                    command: command,
                })
                    .unwrap()
                    .then((res) => {
                        notification.info({
                            message: 'Zapisano!',
                            duration: 2,
                        });
                        navigate(`/app/courses/${course.uuid}`);
                    })
                    .catch((err) => {
                        notification.error({
                            message: 'Ups! coś poszło nie tak!',
                        });
                        console.error('Err: ', err);
                    });
            }}
            style={{ width: '100%' }}
            type={'primary'}
            data-cy="course-catalog-list-item-enroll-button"
        >
            Dołącz do kursu
        </Button>
    );
};

export { CourseEnrollButton, CourseDetailsButton };
