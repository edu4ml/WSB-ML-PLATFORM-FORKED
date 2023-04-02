import { Button } from 'antd';
import React from 'react';
import { useIssueCourseCommandMutation } from '../../features/courses/coursesApi';
import { Enums } from '../../shared';
import { CheckCircleTwoTone } from '@ant-design/icons';

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
            icon={<CheckCircleTwoTone />}
            block
            onClick={() => {
                issueCommand({ id: course_uuid, command });
            }}
        >
            Zakończ
        </Button>
    );
};

const CourseStepUploadSubmissionButton = ({
    progress_tracking_uuid,
    course_uuid,
}) => {
    const [issueCommand, {}] = useIssueCourseCommandMutation();

    return (
        <Button
            icon={<CheckCircleTwoTone />}
            block
            onClick={() => {
                console.log('TODO: upload submission');
            }}
        >
            Prześlij rozwiązanie
        </Button>
    );
};

export { CourseStepSelfEvaluateButton, CourseStepUploadSubmissionButton };
