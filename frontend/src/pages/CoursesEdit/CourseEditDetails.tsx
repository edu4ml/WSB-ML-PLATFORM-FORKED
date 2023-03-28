import { Card, Space, Typography } from 'antd';
import React from 'react';
import CourseEditStepsList from './CourseEditStepsList';

const { Paragraph } = Typography;

const CourseEditDescription = ({ description, onUpdateDescription }) => {
    return (
        <Paragraph
            data-cy={'course-details-edit-description'}
            editable={{
                onChange: onUpdateDescription,
            }}
        >
            {description}
        </Paragraph>
    );
};

const CourseEditDetails = ({
    steps,
    description,
    onUpdateDescription,
    onUpdateSteps,
}) => {
    return (
        <Space direction="vertical">
            <Card>
                <CourseEditDescription
                    description={description}
                    onUpdateDescription={onUpdateDescription}
                />
            </Card>
            <Card>
                <CourseEditStepsList
                    steps={steps}
                    onUpdateSteps={onUpdateSteps}
                />
            </Card>
        </Space>
    );
};

export default CourseEditDetails;
