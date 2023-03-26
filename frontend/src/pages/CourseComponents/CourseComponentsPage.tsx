import React from 'react';
import {
    Button,
    Card,
    Col,
    Divider,
    Form,
    Input,
    Modal,
    notification,
    Row,
    Select,
    Space,
    Table,
    Tag,
    Typography,
} from 'antd';
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons/lib/icons';
import CardHeader from '../../components/common/CardHeader';
import {
    useCreateCourseComponentsMutation,
    useDeleteCourseComponentMutation,
    useGetCourseComponentsQuery,
    useUpdateCourseComponentMutation,
} from '../../features/courses/coursesApi';
import {
    TEXT_CREATE_COURSE_COMPONENT,
    TEXT_DESCRIPTION,
    TEXT_FORM_NO_DESCRIPTION_WARNING,
    TEXT_NAME,
    TEXT_NEW_COURSE_COMPONENT_MODAL_TITLE,
    TEXT_FORM_NO_TITLE_WARNING,
    TEXT_TITLE,
    TEXT_TYPE,
    TEXT_FORM_SELECT_COMPONENT_TYPE_PLACEHOLDER,
    TEXT_EDIT_COURSE_COMPONENT_MODAL_TITLE,
    TEXT_SAVE,
    TEXT_COURSE_COMPONENTS_PAGE_TITLE,
    TEXT_COURSE_COMPONENT_TYPE_FILE_EVALUATION,
    TEXT_COURSE_COMPONENT_TYPE_UNKNOWN,
    TEXT_COURSE_COMPONENT_TYPE_EXERCISE,
    TEXT_COURSE_COMPONENT_CREATED,
    TEXT_SOMETHING_WENT_WRONG,
    TEXT_COURSE_COMPONENT_UPDATED,
    TEXT_COURSE_COMPONENT_DELETED,
} from '../../texts';
import { Enums } from '../../shared';
import { CourseComponentType } from '../../types/course';

const courseComponentTypeToTextMap: { [key: string]: string } = {
    [Enums.COURSE_STEP_COMPONENT_TYPES.EXERCISE]:
        TEXT_COURSE_COMPONENT_TYPE_EXERCISE,
    [Enums.COURSE_STEP_COMPONENT_TYPES.FILE_EVALUATION]:
        TEXT_COURSE_COMPONENT_TYPE_FILE_EVALUATION,
    [Enums.COURSE_STEP_COMPONENT_TYPES.UNKNOWN]:
        TEXT_COURSE_COMPONENT_TYPE_UNKNOWN,
};

const { Text, Title } = Typography;

const getUniqueTypes = (components: Array<CourseComponentType>) => {
    const unique = [...new Set(components?.map((c) => c.type))];
    return unique.map((u: string) => ({
        text: courseComponentTypeToTextMap[u],
        value: u,
    }));
};

const CourseComponentsPage = () => {
    const { data: courseComponents } =
        useGetCourseComponentsQuery('course-components');

    const [createCourseComponent, {}] = useCreateCourseComponentsMutation();
    const [deleteCourseComponent, {}] = useDeleteCourseComponentMutation();

    const columns = [
        {
            title: TEXT_NAME,
            key: 'title',
            dataIndex: 'title',
            render: (title) => <Text strong>{title}</Text>,
        },
        {
            title: TEXT_TYPE,
            key: 'type',
            dataIndex: 'type',
            filters: getUniqueTypes(courseComponents),
            onFilter: (value, record) => record.type === value,
            render: (type) => (
                <Tag
                    color={'geekblue'}
                    style={{ width: '100%', textAlign: 'center' }}
                >
                    {courseComponentTypeToTextMap[type]}
                </Tag>
            ),
        },
        {
            title: TEXT_DESCRIPTION,
            key: 'description',
            dataIndex: 'description',
        },
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
                            deleteCourseComponent(component.uuid)
                                .unwrap()
                                .then((res) => {
                                    notification.info({
                                        message: TEXT_COURSE_COMPONENT_DELETED,
                                        duration: 2,
                                    });
                                })
                                .catch((err) => {
                                    notification.error({
                                        message: TEXT_SOMETHING_WENT_WRONG,
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

    // ----------------------------------------
    // Modal Create New

    const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
    const handleCreateModalOk = (payload) => {
        createCourseComponent(payload)
            .unwrap()
            .then((res) => {
                notification.info({
                    message: TEXT_COURSE_COMPONENT_CREATED,
                    duration: 2,
                });
            })
            .catch((err) => {
                notification.error({
                    message: TEXT_SOMETHING_WENT_WRONG,
                    duration: 2,
                });
            });
        setIsCreateModalOpen(false);
    };
    const handleCreateModalCancel = () => {
        setIsCreateModalOpen(false);
    };

    const showCreateModal = () => {
        setIsCreateModalOpen(true);
    };

    // ----------------------------------------
    // Modal Edit
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [courseComponentTitle, setCourseComponentTitle] = React.useState('');
    const [courseComponentDescription, setCourseComponentDescription] =
        React.useState('');
    const [courseComponentType, setCourseComponentType] = React.useState('');
    const [courseComponentUUID, setCourseComponentUUID] = React.useState('');
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

    const handleEditModalCancel = () => {
        setIsEditModalOpen(false);
    };
    const showEditModal = (component: CourseComponentType) => {
        setCourseComponentTitle(component.title);
        setCourseComponentDescription(component.description);
        setCourseComponentType(component.type);
        setCourseComponentUUID(component.uuid);
        setIsEditModalOpen(true);
    };

    // ----------------------------------------

    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <Title level={1}>{TEXT_COURSE_COMPONENTS_PAGE_TITLE}</Title>
            <Card
                title={
                    <CardHeader
                        title={''}
                        actions={[
                            {
                                text: TEXT_CREATE_COURSE_COMPONENT,
                                onClick: showCreateModal,
                                type: 'primary',
                                dataCy: 'course-component-create-new',
                            },
                        ]}
                    />
                }
                bordered={false}
            >
                <Table
                    columns={columns}
                    dataSource={courseComponents}
                    rowKey="uuid"
                    pagination={{ pageSize: 20 }}
                />
                <Modal
                    title={TEXT_NEW_COURSE_COMPONENT_MODAL_TITLE}
                    open={isCreateModalOpen}
                    onOk={handleCreateModalOk}
                    onCancel={handleCreateModalCancel}
                    footer={null}
                    width={1000}
                >
                    <Form
                        name="create-new-course-component"
                        initialValues={{ remember: true }}
                        onFinish={handleCreateModalOk}
                        autoComplete="off"
                        layout="vertical"
                    >
                        <Row>
                            <Col span={12}>
                                <Form.Item
                                    label={TEXT_TITLE}
                                    name="title"
                                    rules={[
                                        {
                                            required: true,
                                            message: TEXT_FORM_NO_TITLE_WARNING,
                                        },
                                    ]}
                                >
                                    <Input data-cy="course-component-create-new-title" />
                                </Form.Item>
                                <Form.Item
                                    label={TEXT_DESCRIPTION}
                                    name="description"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                TEXT_FORM_NO_DESCRIPTION_WARNING,
                                        },
                                    ]}
                                >
                                    <Input.TextArea data-cy="course-component-create-new-description" />
                                </Form.Item>
                                <Form.Item label={TEXT_TYPE} name="type">
                                    <Select
                                        placeholder={
                                            TEXT_FORM_SELECT_COMPONENT_TYPE_PLACEHOLDER
                                        }
                                    >
                                        {Object.entries(
                                            Enums.COURSE_STEP_COMPONENT_TYPES
                                        ).map(([key, value]) => (
                                            <Select.Option
                                                value={key}
                                                key={key}
                                            >
                                                {
                                                    courseComponentTypeToTextMap[
                                                        value
                                                    ]
                                                }
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                Tutaj jeszcze trzeba dodac resource i inne linki
                                do cwiczen testow itd.
                            </Col>
                        </Row>
                        <Form.Item>
                            <Button
                                data-cy="course-component-create-new-submit-button"
                                type="primary"
                                htmlType="submit"
                                style={{ float: 'right' }}
                            >
                                {TEXT_CREATE_COURSE_COMPONENT}
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
                {/* EDIT MODAL  */}
                <Modal
                    title={TEXT_EDIT_COURSE_COMPONENT_MODAL_TITLE}
                    open={isEditModalOpen}
                    onCancel={handleEditModalCancel}
                    footer={null}
                >
                    <Form
                        name="edit-course-component"
                        initialValues={{
                            remember: true,
                            title: courseComponentTitle,
                            description: courseComponentDescription,
                            type: courseComponentType,
                            uuid: courseComponentUUID,
                        }}
                        onFinish={handleEditModalOk}
                        autoComplete="off"
                        layout="vertical"
                    >
                        <Form.Item hidden={true} name="uuid">
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label={TEXT_TITLE}
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: TEXT_FORM_NO_TITLE_WARNING,
                                },
                            ]}
                        >
                            <Input data-cy="course-component-create-new-title" />
                        </Form.Item>
                        <Form.Item
                            label={TEXT_DESCRIPTION}
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: TEXT_FORM_NO_DESCRIPTION_WARNING,
                                },
                            ]}
                        >
                            <Input.TextArea data-cy="course-component-create-new-description" />
                        </Form.Item>
                        <Form.Item label={TEXT_TYPE} name="type">
                            <Select
                                placeholder={
                                    TEXT_FORM_SELECT_COMPONENT_TYPE_PLACEHOLDER
                                }
                            >
                                {Object.entries(
                                    Enums.COURSE_STEP_COMPONENT_TYPES
                                ).map(([key, value]) => (
                                    <Select.Option value={key} key={key}>
                                        {courseComponentTypeToTextMap[value]}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                data-cy="course-component-edit-submit-button"
                                type="primary"
                                htmlType="submit"
                                style={{ float: 'right' }}
                            >
                                {TEXT_SAVE}
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </Card>{' '}
        </Space>
    );
};

export default CourseComponentsPage;
