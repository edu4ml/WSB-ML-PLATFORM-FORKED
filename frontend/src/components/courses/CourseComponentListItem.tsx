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
    TEXT_REMOVE,
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
import CourseComponentEditModal from './CourseComponentEditModal';

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

    const showEditModal = (component: CourseComponentType) => {
        setIsEditModalOpen(true);
    };
    const handleEditModalCancel = () => {
        setIsEditModalOpen(false);
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
                        onClick={() => showEditModal(component)}
                    >
                        {TEXT_EDIT_COURSE_COMPONENT_MODAL_TITLE}
                    </Button>
                    <Button
                        icon={<DeleteOutlined />}
                        onClick={() => console.log('delete not implemented')}
                    >
                        {TEXT_REMOVE}
                    </Button>
                </Space>
            }
        >
            {component.description}
            <CourseComponentEditModal
                component={component}
                onCancel={handleEditModalCancel}
                onOk={handleEditModalOk}
                isOpen={isEditModalOpen}
            />
        </Card>
    );
};

export default CourseComponentListItem;
