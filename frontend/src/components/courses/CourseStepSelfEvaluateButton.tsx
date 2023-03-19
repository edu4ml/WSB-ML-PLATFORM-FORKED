import { Button } from 'antd';
import React from 'react';
import { useIssueCourseCommandMutation } from '../../features/courses/coursesApi';
import { Enums } from '../../shared';

const CourseStepSelfEvaluateButton = ({
    progress_tracking_uuid,
    course_uuid,
}) => {
    const [issueCommand, {}] = useIssueCourseCommandMutation();

    const command = {
        type: Enums.COMMAND_TYPES.COMPLETE_COURSE_STEP,
        progress_tracking_uuid,
    };

    return (
        <Button
            block
            type="primary"
            onClick={() => {
                issueCommand({ id: course_uuid, command });
            }}
        >
            Zakończ
        </Button>
    );
};

export default CourseStepSelfEvaluateButton;
