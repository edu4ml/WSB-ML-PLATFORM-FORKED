import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { CourseType } from '../../types/course';

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

export default CourseDetailsButton;
