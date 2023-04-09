import { Card, Typography } from 'antd';
import React from 'react';

const { Paragraph } = Typography;

const CourseDescription = ({ description, editable }) => {
    return (
        <Card>
            <div data-cy={'course-details-edit-description'}>
                <Paragraph
                    data-cy={'course-details-edit-description-button'}
                    editable={editable}
                >
                    {description}
                </Paragraph>
            </div>
        </Card>
    );
};

export default CourseDescription;
