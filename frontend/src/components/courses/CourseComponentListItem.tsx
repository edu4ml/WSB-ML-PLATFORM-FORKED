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
    Upload,
} from 'antd';
import React from 'react';
import {
    useAddFileToCourseComponentMutation,
    useUpdateCourseComponentMutation,
} from '../../features/courses/coursesApi';
import { Enums } from '../../shared';
import {
    TEXT_COURSE_COMPONENT_TYPE_EXERCISE,
    TEXT_COURSE_COMPONENT_TYPE_FILE_EVALUATION,
    TEXT_COURSE_COMPONENT_TYPE_UNKNOWN,
    TEXT_COURSE_COMPONENT_UPDATED,
    TEXT_DESCRIPTION,
    TEXT_EDIT_COURSE_COMPONENT_MODAL_TITLE,
    TEXT_FORM_NO_DESCRIPTION_WARNING,
    TEXT_FORM_NO_TITLE_WARNING,
    TEXT_FORM_SELECT_COMPONENT_TYPE_PLACEHOLDER,
    TEXT_SAVE,
    TEXT_SOMETHING_WENT_WRONG,
    TEXT_TITLE,
    TEXT_TYPE,
} from '../../texts';
import { CourseComponentType } from '../../types/course';

import {
    EditOutlined,
    DeleteOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import Cookies from 'js-cookie';

const courseComponentTypeToTextMap: { [key: string]: string } = {
    [Enums.COURSE_STEP_COMPONENT_TYPES.EXERCISE]:
        TEXT_COURSE_COMPONENT_TYPE_EXERCISE,
    [Enums.COURSE_STEP_COMPONENT_TYPES.FILE_EVALUATION]:
        TEXT_COURSE_COMPONENT_TYPE_FILE_EVALUATION,
    [Enums.COURSE_STEP_COMPONENT_TYPES.UNKNOWN]:
        TEXT_COURSE_COMPONENT_TYPE_UNKNOWN,
};

const CourseComponentListItem = ({ component }) => {
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

    return (
        <Card
            hoverable
            data-cy={'course-component-list-item'}
            style={{ marginTop: '20px' }}
            title={component.title}
            extra={
                <Space direction="horizontal">
                    <Button
                        icon={<EditOutlined />}
                        // type="primary"
                        onClick={() => showEditModal(component)}
                    >
                        {TEXT_EDIT_COURSE_COMPONENT_MODAL_TITLE}
                    </Button>
                    <Button
                        icon={<DeleteOutlined />}
                        // type="primary"
                        onClick={() => console.log('delete not implemented')}
                    >
                        Usuń
                    </Button>
                </Space>
            }
        >
            {component.description}

            {/* edit modal  */}

            <Modal
                title={TEXT_EDIT_COURSE_COMPONENT_MODAL_TITLE}
                open={isEditModalOpen}
                onCancel={handleEditModalCancel}
                footer={null}
                width={800}
            >
                <Row>
                    <Col span={12}>
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
                                        <Select.Option value={key} key={key}>
                                            {
                                                courseComponentTypeToTextMap[
                                                    value
                                                ]
                                            }
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
                    </Col>
                    <Col span={1}>
                        <Divider type="vertical" style={{ height: '100%' }} />
                    </Col>
                    <Col span={11}>
                        <Upload
                            listType="picture"
                            withCredentials={true}
                            headers={{
                                'X-CSRFToken': Cookies.get('csrftoken'),
                            }}
                            action={`/api/v1/course-components/${component.uuid}/files-upload`}
                        >
                            <Button icon={<UploadOutlined />}>
                                Upload File
                            </Button>
                        </Upload>
                    </Col>
                </Row>
            </Modal>
        </Card>
    );
};

export default CourseComponentListItem;
