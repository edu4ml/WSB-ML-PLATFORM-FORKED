import { Button } from 'antd';
import React from 'react';
import { useIssueCourseCommandMutation } from '../../features/courses/coursesApi';
import { Enums } from '../../shared';
import { CourseListItemType, UserType } from '../../types/course';

const CourseEnrollButton = ({
    course,
    user,
}: {
    course: CourseListItemType;
    user: UserType;
}) => {
    const [issueCourseCommand, {}] = useIssueCourseCommandMutation();

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
                });
            }}
            style={{ width: '100%' }}
        >
            Dołącz do kursu
        </Button>
    );
};

export default CourseEnrollButton;
