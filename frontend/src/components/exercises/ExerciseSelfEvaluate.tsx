import { Button } from 'antd';
import React from 'react';

const ExerciseSelfEvaluateButton = ({ exercise_id }) => {
    return (
        <Button
            block
            type="primary"
            onClick={() => {
                console.log('Finishing exercise: ', exercise_id);
            }}
        >
            Zakończ
        </Button>
    );
};

export default ExerciseSelfEvaluateButton;
