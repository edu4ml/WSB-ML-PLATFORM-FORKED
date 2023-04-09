import { Card, Col, Divider, Row, Space, Typography } from 'antd';
import React from 'react';

import { Link } from 'react-router-dom';
import ResourceAvatarLink from '../../common/ResourceAvatarLink';
import { useTranslation } from 'react-i18next';

const { Text, Title } = Typography;

const ComponentItem = ({ component }) => {
    const { t } = useTranslation();

    return (
        <Link to={`/app/course-components/${component.uuid}`}>
            <Card
                key={component.uuid}
                hoverable
                data-cy={'course-component-list-item'}
                style={{ marginTop: '20px' }}
                title={<Title level={4}>{component.title}</Title>}
                extra={<Space direction="horizontal"></Space>}
            >
                <Row>
                    <Col span={12}>{component.description}</Col>
                    <Col span={1}>
                        <Divider type="vertical" style={{ height: '100%' }} />
                    </Col>
                    <Col span={11}>
                        <Space direction="vertical">
                            <Text disabled={false} strong>
                                {t('Resources')}
                            </Text>

                            {component.resources.map((resource) => (
                                <ResourceAvatarLink
                                    key={resource.uuid}
                                    resource={resource}
                                    disabled={true}
                                />
                            ))}
                        </Space>
                    </Col>
                </Row>
            </Card>
        </Link>
    );
};

export default ComponentItem;
