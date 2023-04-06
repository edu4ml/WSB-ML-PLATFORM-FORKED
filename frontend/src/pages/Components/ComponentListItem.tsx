import {
    Button,
    Card,
    Col,
    Divider,
    notification,
    Row,
    Space,
    Typography,
} from 'antd';
import React from 'react';
import { useDeleteCourseComponentMutation } from '../../features/courses/coursesApi';
import {
    NOTIF_COURSE_COMPONENT_DELETED,
    BTN_REMOVE,
    NOTIF_SOMETHING_WENT_WRONG,
} from '../../texts';

import { DeleteTwoTone } from '@ant-design/icons';
import ResourceAvatarLink from '../../components/common/ResourceAvatarLink';
import { Link } from 'react-router-dom';

const { Text, Title } = Typography;

const ComponentListItem = ({ component }) => {
    const [deleteCourseComponent, {}] = useDeleteCourseComponentMutation();
    return (
        <Link to={`/app/course-components/${component.uuid}`}>
            <Card
                key={component.uuid}
                hoverable
                data-cy={'course-component-list-item'}
                style={{ marginTop: '20px' }}
                title={<Title level={4}>{component.title}</Title>}
                extra={
                    <Space direction="horizontal">
                        <Button
                            icon={<DeleteTwoTone />}
                            onClick={() => {
                                deleteCourseComponent(component.uuid)
                                    .unwrap()
                                    .then((res) => {
                                        notification.info({
                                            message:
                                                NOTIF_COURSE_COMPONENT_DELETED,
                                            duration: 2,
                                        });
                                    })
                                    .catch((err) => {
                                        notification.error({
                                            message: NOTIF_SOMETHING_WENT_WRONG,
                                            duration: 2,
                                        });
                                    });
                            }}
                        >
                            {BTN_REMOVE}
                        </Button>
                    </Space>
                }
            >
                <Row>
                    <Col span={12}>{component.description}</Col>
                    <Col span={1}>
                        <Divider type="vertical" style={{ height: '100%' }} />
                    </Col>
                    <Col span={11}>
                        <Space direction="vertical">
                            <Text disabled={false} strong>
                                Meteriały dodatkowe
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

export default ComponentListItem;
