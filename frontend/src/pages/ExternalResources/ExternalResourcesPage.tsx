import {
    Button,
    Card,
    Col,
    Divider,
    notification,
    Row,
    Space,
    Table,
    Tag,
    Typography,
} from 'antd';
import React from 'react';
import {
    EditTwoTone,
    UploadOutlined,
    DeleteTwoTone,
    InboxOutlined,
} from '@ant-design/icons/lib/icons';
import {
    CATEGORY_BUTTON_TEXTS,
    CATEGORY_COLUMN_NAMES,
    CATEGORY_NOTIFICATIONS,
    CATEGORY_TITLES,
} from '../../texts';
import {
    useCreateResourceMutation,
    useDeleteResourceMutation,
    useGetResourcesCatalogQuery,
} from '../../features/externalResources/resourcesApi';
import AddNewResourceModal from '../../components/externalResources/addNewResourceModal';
import CardHeader from '../../components/common/CardHeader';

const { Text, Title } = Typography;

const ExternalResourcesPage = () => {
    const { data: externalResources } =
        useGetResourcesCatalogQuery('course-components');

    const [deleteResource, {}] = useDeleteResourceMutation();
    const [createResource, {}] = useCreateResourceMutation();

    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);

    const showEditModal = (component) => {
        console.log(component);
        setIsEditModalOpen(true);
    };

    const showCreateModal = () => {
        console.log('showCreateModal');
        setIsCreateModalOpen(true);
    };

    const handleEditModalCancel = () => {
        setIsEditModalOpen(false);
    };

    const handleCreateModalCancel = () => {
        setIsCreateModalOpen(false);
    };

    const handleCreateModalOk = (payload) => {
        console.log(payload);
        setIsCreateModalOpen(false);
    };

    const columns = [
        {
            title: CATEGORY_COLUMN_NAMES.name,
            key: 'title',
            dataIndex: 'title',
            render: (title) => <Text strong>{title}</Text>,
        },
        // {
        //     title: TEXT_TYPE,
        //     key: 'type',
        //     dataIndex: 'type',
        //     render: (type) => (
        //         <Tag
        //             color={'geekblue'}
        //             style={{ width: '100%', textAlign: 'center' }}
        //         >
        //             {courseComponentTypeToTextMap[type]}
        //         </Tag>
        //     ),
        // },
        {
            key: 'actions',
            render: (component) => (
                <Space direction="horizontal">
                    <Divider type="vertical" />
                    <Button
                        type="text"
                        onClick={() => showEditModal(component)}
                    >
                        <EditTwoTone />
                    </Button>
                    <Button
                        type="text"
                        onClick={() => {
                            deleteResource(component.uuid)
                                .unwrap()
                                .then((res) => {
                                    notification.info({
                                        message:
                                            CATEGORY_NOTIFICATIONS.courseComponentDeleted,
                                        duration: 2,
                                    });
                                })
                                .catch((err) => {
                                    notification.error({
                                        message:
                                            CATEGORY_NOTIFICATIONS.somethingWentWrong,
                                        duration: 2,
                                    });
                                });
                        }}
                    >
                        <DeleteTwoTone />
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <Row>
                <Col span={12}>
                    <Title level={1}>
                        {CATEGORY_TITLES.courseComponentsPage}
                    </Title>
                </Col>
                <Col span={12}>
                    <Button
                        data-cy={'external-resource-create-new'}
                        key="new-external-resource"
                        onClick={showCreateModal}
                        style={{
                            float: 'right',
                            position: 'absolute',
                            right: '0',
                            bottom: '0',
                            marginBottom: '10px',
                        }}
                        type="primary"
                    >
                        {CATEGORY_BUTTON_TEXTS.createCourseComponent}
                    </Button>
                </Col>
            </Row>

            <Table
                columns={columns}
                dataSource={externalResources}
                rowKey="uuid"
                pagination={{ pageSize: 20 }}
            ></Table>

            <AddNewResourceModal
                isOpen={isCreateModalOpen}
                onCancel={handleCreateModalCancel}
                onOk={handleCreateModalOk}
            />
        </Space>
    );
};

export default ExternalResourcesPage;
