import { Col, Row, Typography } from 'antd';
import React from 'react';

const { Title, Text } = Typography;

const PageHeader = ({ title, actions, subtitle = '' }) => {
    return (
        <Row>
            <Col span={12}>
                <Title level={2}>{title}</Title>
                <Text type="secondary">{subtitle}</Text>
            </Col>
            <Col span={12}>{actions?.map((action) => action)}</Col>
        </Row>
    );
};

export default PageHeader;
