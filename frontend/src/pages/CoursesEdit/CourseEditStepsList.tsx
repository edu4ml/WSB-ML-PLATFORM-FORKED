import React from 'react';
import CourseEditStepsListSortable from './CourseEditStepsListSortable';
import CourseEditStepsListDropdownAdd from './CourseEditStepsListDropdownAdd';
import { Space } from 'antd';

const CourseEditStepsList = ({ steps, onUpdateSteps }) => {
    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <CourseEditStepsListSortable
                steps={steps}
                onUpdateSteps={onUpdateSteps}
            />
            <CourseEditStepsListDropdownAdd
                steps={steps}
                onUpdateSteps={onUpdateSteps}
            />
        </Space>
    );
};

export default CourseEditStepsList;
