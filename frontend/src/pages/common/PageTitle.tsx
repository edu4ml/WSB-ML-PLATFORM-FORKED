import { Col, Row, Space, Typography } from 'antd';
import React from 'react';

const { Title, Text } = Typography;

const PageTitle = ({ title, actions = [], subtitle = '' }) => {
    return (
        <Row>
            <Col span={12}>
                <Title level={2}>{title}</Title>
                <Text type="secondary">{subtitle}</Text>
            </Col>
            <Col span={12}>
                <Space
                    style={{
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        marginBottom: '10px',
                    }}
                >
                    {actions?.map((action) => action)}
                </Space>
            </Col>
        </Row>
    );
};

export default PageTitle;
