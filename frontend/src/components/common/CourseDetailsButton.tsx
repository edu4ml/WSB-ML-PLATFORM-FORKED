import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { CourseListItemType } from '../../types/course';

const CourseDetailsButton = ({ course }: { course: CourseListItemType }) => {
    const navigate = useNavigate();

    return (
        <Button
            onClick={() => {
                navigate(`/courses/${course.uuid}/edit`);
            }}
            style={{ width: '100%' }}
        >
            {course.is_draft ? 'Edytuj' : 'Szczegóły'}
        </Button>
    );
};

export default CourseDetailsButton;
