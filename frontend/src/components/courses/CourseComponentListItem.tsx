import {
    Avatar,
    Button,
    Card,
    Col,
    Divider,
    notification,
    Row,
    Space,
    Tag,
    Tooltip,
    Typography,
} from 'antd';
import React from 'react';
import {
    useAddFileToCourseComponentMutation,
    useUpdateCourseComponentMutation,
} from '../../features/courses/coursesApi';
import {
    TEXT_COURSE_COMPONENT_EDIT_RESOURCES,
    TEXT_COURSE_COMPONENT_UPDATED,
    TEXT_EDIT_COURSE_COMPONENT_MODAL_TITLE,
    TEXT_REMOVE,
    TEXT_SOMETHING_WENT_WRONG,
} from '../../texts';

import {
    EditTwoTone,
    DeleteTwoTone,
    FileTextTwoTone,
    FileOutlined,
} from '@ant-design/icons';
import CourseComponentEditModal from './CourseComponentEditModal';
import CourseComponentEditResources from './CourseComponentEditResources';

const { Title } = Typography;

const CourseComponentListItem = ({ component }) => {
    // ----------------------------------------
    // Modal Edit
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [isResourcesModalOpen, setIsResourcesModalOpen] =
        React.useState(false);

    const [updateCourseComponent, {}] = useUpdateCourseComponentMutation();

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
                    message: TEXT_COURSE_COMPONENT_UPDATED,
                    duration: 2,
                });
            })
            .catch((err) => {
                notification.error({
                    message: TEXT_SOMETHING_WENT_WRONG,
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

    const componentTitle = (component) => {
        return (
            <Space direction="vertical">
                <Title level={4}>{component.title}</Title>
                <Tag color={'geekblue'}> {component.type}</Tag>
            </Space>
        );
    };

    const filesAvatars = (component) => {
        return component.resources.map((file) => {
            return (
                <Tooltip title={file.title} placement="top">
                    <Avatar
                        size="large"
                        icon={<FileOutlined />}
                        style={{ marginRight: '10px' }}
                        onClick={() =>
                            console.log('file clicked', file.file_link)
                        }
                    />
                </Tooltip>
            );
        });
    };

    return (
        <Card
            hoverable
            data-cy={'course-component-list-item'}
            style={{ marginTop: '20px' }}
            title={componentTitle(component)}
            extra={
                <Space direction="horizontal">
                    <Button icon={<EditTwoTone />} onClick={showEditModal}>
                        {TEXT_EDIT_COURSE_COMPONENT_MODAL_TITLE}
                    </Button>
                    <Button
                        icon={<FileTextTwoTone />}
                        onClick={showResourcesModal}
                    >
                        {TEXT_COURSE_COMPONENT_EDIT_RESOURCES}
                    </Button>
                    <Button
                        icon={<DeleteTwoTone />}
                        onClick={() => console.log('delete not implemented')}
                    >
                        {TEXT_REMOVE}
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
                    <Avatar.Group
                        maxCount={2}
                        size="large"
                        style={{ position: 'absolute', right: '0' }}
                    >
                        {filesAvatars(component)}
                    </Avatar.Group>
                </Col>
            </Row>
            <CourseComponentEditModal
                component={component}
                onCancel={handleEditModalCancel}
                onOk={handleEditModalOk}
                isOpen={isEditModalOpen}
            />
            <CourseComponentEditResources
                component={component}
                onCancel={handleResourcesModalCancel}
                isOpen={isResourcesModalOpen}
            />
        </Card>
    );
};

export default CourseComponentListItem;
