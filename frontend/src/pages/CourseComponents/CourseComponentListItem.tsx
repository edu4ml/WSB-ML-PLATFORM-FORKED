import { Button, Card, Col, Divider, notification, Row, Space } from 'antd';
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
import CourseComponentEditModal from '../../components/courses/CourseComponentEditModal';
import CourseComponentEditResources from '../../components/courses/CourseComponentEditResources';
import FilesAvatars from '../../components/courses/FilesAvatars';
import CourseComponentTitle from '../../components/courses/CourseComponentTitle';

const CourseComponentListItem = ({ component }) => {
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
        <Card
            key={component.uuid}
            hoverable
            data-cy={'course-component-list-item'}
            style={{ marginTop: '20px' }}
            title={<CourseComponentTitle component={component} />}
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
                                        message: NOTIF_COURSE_COMPONENT_DELETED,
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
                    <FilesAvatars files={component.resources} />
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
