import React, { useEffect, useState } from 'react';
import { Button, Card, List, notification, Space } from 'antd';
import {
    useCreateCourseComponentsMutation,
    useGetComponentListQuery,
} from '../../features/courses/coursesApi';
import {
    BTN_CREATE_COURSE_COMPONENT,
    TITLE_COURSE_COMPONENTS_PAGE,
    NOTIF_COURSE_COMPONENT_CREATED,
    NOTIF_SOMETHING_WENT_WRONG,
} from '../../texts';
import ComponentCreateModal from './ComponentCreateModal';
import ComponentListItem from './ComponentListItem';
import PageHeader from '../../components/common/PageHeader';
import { Enums } from '../../shared';
import { ComponentType } from '../../types/course';

const ComponentsPage = () => {
    const { data: components } = useGetComponentListQuery('course-components');
    const [createCourseComponent, {}] = useCreateCourseComponentsMutation();

    const [activeTabKey, setActiveTabKey] = useState<string>('EXERCISE');
    const [filteredResource, setFilteredResource] = useState<
        Array<ComponentType>
    >([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);

    const handleCreateModalOk = (payload) => {
        const command = {
            type: Enums.COMMAND_TYPES.CREATE_COMPONENT,
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
    const tabList = [
        {
            key: 'EXERCISE',
            tab: 'Ćwiczenia',
        },
        {
            key: 'EVALUATION',
            tab: 'Zadania sprawdzające',
        },
    ];

    useEffect(() => {
        setFilteredResource(
            sortComponents(components).filter((c) => c.type === activeTabKey)
        );
    }, [activeTabKey, components]);

    const onTabChange = (key: string) => {
        setActiveTabKey(key);
    };

    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <PageHeader
                title={TITLE_COURSE_COMPONENTS_PAGE}
                actions={actions}
            />
            <Card
                style={{
                    backgroundColor: 'rgb(0,0,0,0)',
                    boxShadow: '0px 0px',
                }}
                bordered={false}
                bodyStyle={{ paddingLeft: 0, paddingRight: 0 }}
                tabList={tabList}
                onTabChange={onTabChange}
                activeTabKey={activeTabKey}
            >
                <List
                    bordered={false}
                    dataSource={filteredResource}
                    data-cy="course-components-list"
                    size="large"
                    renderItem={(item) => (
                        <ComponentListItem component={item} />
                    )}
                    pagination={{ pageSize: 10 }}
                />
                {/* modal */}
                <ComponentCreateModal
                    isOpen={isCreateModalOpen}
                    onCreate={handleCreateModalOk}
                    onClose={handleCreateModalCancel}
                />
            </Card>
        </Space>
    );
};

export default ComponentsPage;
