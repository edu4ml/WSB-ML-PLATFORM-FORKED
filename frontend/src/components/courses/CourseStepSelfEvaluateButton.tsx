import { Button } from 'antd';
import React from 'react';
import { useIssueCourseCommandMutation } from '../../features/courses/coursesApi';

const CourseStepSelfEvaluateButton = ({ progress_tracking_id, course_id }) => {
    const [issueCommand, {}] = useIssueCourseCommandMutation();

    const command = {
        type: 'COMPLETE_COURSE_STEP',
        progress_tracking_id,
    };

    return (
        <Button
            block
            type="primary"
            onClick={() => {
                issueCommand({ id: course_id, command });
            }}
        >
            Zakończ
        </Button>
    );
};

export default CourseStepSelfEvaluateButton;
