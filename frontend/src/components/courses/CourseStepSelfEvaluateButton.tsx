import { Button } from 'antd';
import React from 'react';

const CourseStepSelfEvaluateButton = ({ step_id, course_id }) => {
    return (
        <Button
            block
            type="primary"
            onClick={() => {
                console.log(
                    'Finishing step id: ',
                    step_id,
                    ' for course id: ',
                    course_id
                );
            }}
        >
            Zakończ
        </Button>
    );
};

export default CourseStepSelfEvaluateButton;
