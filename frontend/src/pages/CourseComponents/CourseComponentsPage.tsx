import React from 'react';
import { Button, List, notification, Space } from 'antd';
import {
    useCreateCourseComponentsMutation,
    useGetCourseComponentsQuery,
} from '../../features/courses/coursesApi';
import {
    TEXT_CREATE_COURSE_COMPONENT,
    TEXT_COURSE_COMPONENTS_PAGE_TITLE,
    TEXT_COURSE_COMPONENT_CREATED,
    TEXT_SOMETHING_WENT_WRONG,
} from '../../texts';
import CourseComponentCreateModal from './CourseComponentCreateModal';
import CourseComponentListItem from './CourseComponentListItem';
import PageHeader from '../../components/common/PageHeader';

const CourseComponentsPage = () => {
    const { data: courseComponents } =
        useGetCourseComponentsQuery('course-components');

    const [createCourseComponent, {}] = useCreateCourseComponentsMutation();

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
            key={TEXT_CREATE_COURSE_COMPONENT}
            onClick={showCreateModal}
            type="primary"
        >
            {TEXT_CREATE_COURSE_COMPONENT}
        </Button>,
    ];

    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <PageHeader
                title={TEXT_COURSE_COMPONENTS_PAGE_TITLE}
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
