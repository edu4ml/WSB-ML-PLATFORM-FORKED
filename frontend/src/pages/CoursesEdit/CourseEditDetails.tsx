import { Card, Space, Typography } from 'antd';
import React from 'react';
import CourseEditStepsList from './CourseEditStepsList';

const { Paragraph } = Typography;

const CourseEditDescription = ({ description, onUpdateDescription }) => {
    return (
        <div data-cy={'course-details-edit-description'}>
            <Paragraph
                data-cy={'course-details-edit-description-button'}
                editable={{
                    onChange: onUpdateDescription,
                }}
            >
                {description}
            </Paragraph>
        </div>
    );
};

const CourseEditDetails = ({
    steps,
    description,
    onUpdateDescription,
    onUpdateSteps,
}) => {
    return (
        <Space direction="vertical" style={{ width: '100%' }}>
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
