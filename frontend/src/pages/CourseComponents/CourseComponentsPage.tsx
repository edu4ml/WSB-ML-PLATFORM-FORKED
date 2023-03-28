import React from 'react';
import { Button, Col, List, notification, Row, Space, Typography } from 'antd';
import {
    useCreateCourseComponentsMutation,
    useGetCourseComponentsQuery,
} from '../../features/courses/coursesApi';
import {
    TEXT_CREATE_COURSE_COMPONENT,
    TEXT_COURSE_COMPONENTS_PAGE_TITLE,
    TEXT_COURSE_COMPONENT_TYPE_FILE_EVALUATION,
    TEXT_COURSE_COMPONENT_TYPE_UNKNOWN,
    TEXT_COURSE_COMPONENT_TYPE_EXERCISE,
    TEXT_COURSE_COMPONENT_CREATED,
    TEXT_SOMETHING_WENT_WRONG,
} from '../../texts';
import { Enums } from '../../shared';
import { CourseComponentType } from '../../types/course';
import CourseComponentCreateModal from '../../components/courses/CourseComponentCreateModal';
import CourseComponentListItem from '../../components/courses/CourseComponentListItem';

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

    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <Row>
                <Col span={12}>
                    <Title level={1}>{TEXT_COURSE_COMPONENTS_PAGE_TITLE}</Title>
                </Col>
                <Col span={12}>
                    <Button
                        data-cy="course-component-create-new"
                        key={TEXT_CREATE_COURSE_COMPONENT}
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
                        {TEXT_CREATE_COURSE_COMPONENT}
                    </Button>
                </Col>
            </Row>

            <List
                bordered={false}
                dataSource={courseComponents}
                data-cy="course-components-list"
                size="large"
                renderItem={(item) => (
                    <CourseComponentListItem component={item} />
                )}
                pagination={{ pageSize: 10 }}
            />

            <CourseComponentCreateModal
                isOpen={isCreateModalOpen}
                onCreate={handleCreateModalOk}
                onClose={handleCreateModalCancel}
            />
        </Space>
    );
};

export default CourseComponentsPage;
