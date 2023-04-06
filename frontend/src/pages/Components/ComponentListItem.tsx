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
import {
    useDeleteCourseComponentMutation,
    useUpdateCourseComponentMutation,
} from '../../features/courses/coursesApi';
import {
    NOTIF_COURSE_COMPONENT_DELETED,
    TITLE_COURSE_COMPONENT_EDIT_RESOURCES,
    NOTIF_COURSE_COMPONENT_UPDATED,
    BTN_EDIT,
    BTN_REMOVE,
    NOTIF_SOMETHING_WENT_WRONG,
} from '../../texts';

import { EditTwoTone, DeleteTwoTone, FileTextTwoTone } from '@ant-design/icons';
import ComponentEditModal from './ComponentEditModal';
import ComponentEditResources from './ComponentEditResources';
import ComponentTitle from './ComponentTitle';
import ResourceAvatarLink from '../../components/common/ResourceAvatarLink';
import { Link } from 'react-router-dom';

const { Text } = Typography;

const ComponentListItem = ({ component }) => {
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [isResourcesModalOpen, setIsResourcesModalOpen] =
        React.useState(false);

    const [updateCourseComponent, {}] = useUpdateCourseComponentMutation();
    const [deleteCourseComponent, {}] = useDeleteCourseComponentMutation();

    const handleEditModalOk = (payload) => {
        updateCourseComponent({
            id: payload.uuid,
            payload: {
                title: payload.title,
                description: payload.description,
                type: payload.type,
            },
        })
            .unwrap()
            .then((res) => {
                notification.info({
                    message: NOTIF_COURSE_COMPONENT_UPDATED,
                    duration: 2,
                });
            })
            .catch((err) => {
                notification.error({
                    message: NOTIF_SOMETHING_WENT_WRONG,
                    duration: 2,
                });
            });
        setIsEditModalOpen(false);
    };

    const showResourcesModal = () => {
        setIsResourcesModalOpen(true);
    };

    const handleResourcesModalCancel = () => {
        setIsResourcesModalOpen(false);
    };

    const showEditModal = () => {
        setIsEditModalOpen(true);
    };
    const handleEditModalCancel = () => {
        setIsEditModalOpen(false);
    };

    return (
        <Link to={`/app/course-components/${component.uuid}`}>
            <Card
                key={component.uuid}
                hoverable
                data-cy={'course-component-list-item'}
                style={{ marginTop: '20px' }}
                title={<ComponentTitle component={component} />}
                extra={
                    <Space direction="horizontal">
                        <Button icon={<EditTwoTone />} onClick={showEditModal}>
                            {BTN_EDIT}
                        </Button>
                        <Button
                            icon={<FileTextTwoTone />}
                            onClick={showResourcesModal}
                        >
                            {TITLE_COURSE_COMPONENT_EDIT_RESOURCES}
                        </Button>
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
                <ComponentEditModal
                    component={component}
                    onCancel={handleEditModalCancel}
                    onOk={handleEditModalOk}
                    isOpen={isEditModalOpen}
                />
                <ComponentEditResources
                    component={component}
                    onCancel={handleResourcesModalCancel}
                    isOpen={isResourcesModalOpen}
                />
            </Card>
        </Link>
    );
};

export default ComponentListItem;
