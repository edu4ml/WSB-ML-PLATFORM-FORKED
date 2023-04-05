import React from 'react';
import { Button, List, notification, Space } from 'antd';
import {
    useCreateCourseComponentsMutation,
    useGetCourseComponentsQuery,
} from '../../features/courses/coursesApi';
import {
    BTN_CREATE_COURSE_COMPONENT,
    TITLE_COURSE_COMPONENTS_PAGE,
    NOTIF_COURSE_COMPONENT_CREATED,
    NOTIF_SOMETHING_WENT_WRONG,
} from '../../texts';
import CourseComponentCreateModal from './CourseComponentCreateModal';
import CourseComponentListItem from './CourseComponentListItem';
import PageHeader from '../../components/common/PageHeader';
import { Enums } from '../../shared';

const CourseComponentsPage = () => {
    const { data: courseComponents } =
        useGetCourseComponentsQuery('course-components');

    const [createCourseComponent, {}] = useCreateCourseComponentsMutation();

    const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
    const handleCreateModalOk = (payload) => {
        const command = {
            type: Enums.COMMAND_TYPES.CREATE_COURSE_COMPONENT,
            ...payload,
        };
        createCourseComponent(command)
            .unwrap()
            .then((res) => {
                notification.info({
                    message: NOTIF_COURSE_COMPONENT_CREATED,
                    duration: 2,
                });
            })
            .catch((err) => {
                notification.error({
                    message: NOTIF_SOMETHING_WENT_WRONG,
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

    const sortComponents = (components) => {
        if (!Array.isArray(components)) return [];
        const mutableComponents = [...components];
        return mutableComponents.sort((a, b) => {
            return (
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            );
        });
    };

    const actions = [
        <Button
            data-cy="course-component-create-new"
            key={BTN_CREATE_COURSE_COMPONENT}
            onClick={showCreateModal}
            type="primary"
        >
            {BTN_CREATE_COURSE_COMPONENT}
        </Button>,
    ];

    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <PageHeader
                title={TITLE_COURSE_COMPONENTS_PAGE}
                actions={actions}
            />
            <List
                bordered={false}
                dataSource={sortComponents(courseComponents)}
                data-cy="course-components-list"
                size="large"
                renderItem={(item) => (
                    <CourseComponentListItem component={item} />
                )}
                pagination={{ pageSize: 10 }}
            />
            {/* modal */}
            <CourseComponentCreateModal
                isOpen={isCreateModalOpen}
                onCreate={handleCreateModalOk}
                onClose={handleCreateModalCancel}
            />
        </Space>
    );
};

export default CourseComponentsPage;
