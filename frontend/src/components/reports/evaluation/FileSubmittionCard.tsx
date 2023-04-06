import { Card } from 'antd';
import React from 'react';
import { UserOutlined } from '@ant-design/icons';

const FileSubmissionCard = ({ evaluation }) => {
    return (
        <Card type="inner" hoverable={true} title={evaluation.title}>
            <UserOutlined /> {evaluation.student.email}
        </Card>
    );
};

export default FileSubmissionCard;
