import { Button, notification } from 'antd';
import React from 'react';
import { useIssueCourseCommandMutation } from '../../features/courses/coursesApi';
import { Enums } from '../../shared';
import { CourseType } from '../../types/course';
import { UserType } from '../../types/user';
import { useNavigate } from 'react-router-dom';

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
        >
            Dołącz do kursu
        </Button>
    );
};

export default CourseEnrollButton;
