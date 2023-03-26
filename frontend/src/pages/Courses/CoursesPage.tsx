import {
    Button,
    Card,
    Col,
    Form,
    Input,
    Modal,
    Row,
    Space,
    Typography,
} from 'antd';
import React, { useState } from 'react';
import CardHeader from '../../components/common/CardHeader';
import CourseList from '../../components/courses/CourseList';
import {
    useCreateCourseMutation,
    useGetCourseCatalogQuery,
} from '../../features/courses/coursesApi';
import { useNavigate } from 'react-router-dom';
import { Enums } from '../../shared';
import { CardHeaderRightButtonActionType } from '../../types/course';
import { useGetUserProfileQuery } from '../../features/auth/authApi';
import { isTeacher } from '../../helpers/permissions';
import {
    TEXT_COURSES_ALL,
    TEXT_COURSE_TITLE,
    TEXT_CREATE_COURSE,
    TEXT_NEW_COURSE,
    TEXT_NEW_COURSE_TITLE,
    TEXT_FORM_NO_TITLE_WARNING,
    TEXT_COURSE_PAGE_TITLE,
} from '../../texts';

const { Title } = Typography;

const CoursesPage = () => {
    const [createCourseCommand, {}] = useCreateCourseMutation();
    const { data: courses } = useGetCourseCatalogQuery('course-catalog');

    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleCourseCreate = (values) => {
        createCourseCommand({
            type: Enums.COMMAND_TYPES.CREATE_COURSE,
            ...values,
        })
            .unwrap()
            .then((response) => {
                setIsModalOpen(false);
                navigate(`/app/courses/${response.uuid}/edit`);
            })
            .catch((err) => {
                console.error('Error: ', err);
                setIsModalOpen(false);
            });
    };

    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <Row>
                <Col span={12}>
                    <Title level={1}>{TEXT_COURSE_PAGE_TITLE}</Title>
                </Col>
                <Col span={12}>
                    <Button
                        data-cy="course-catalog-create-new"
                        key={TEXT_NEW_COURSE}
                        onClick={showModal}
                        style={{
                            float: 'right',
                            position: 'absolute',
                            right: '0',
                            bottom: '0',
                            marginBottom: '10px',
                        }}
                        type="primary"
                    >
                        {TEXT_NEW_COURSE}
                    </Button>
                </Col>
            </Row>
            {/* <Card bordered={false}>
            </Card> */}
            <CourseList courses={courses} />
            <Modal
                title={TEXT_NEW_COURSE_TITLE}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    name="create-new-course"
                    initialValues={{ remember: true }}
                    onFinish={handleCourseCreate}
                    autoComplete="off"
                    layout="vertical"
                >
                    <Form.Item
                        label={TEXT_COURSE_TITLE}
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: TEXT_FORM_NO_TITLE_WARNING,
                            },
                        ]}
                    >
                        <Input data-cy="course-catalog-create-new-name" />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            data-cy="course-catalog-create-new-submit-button"
                            type="primary"
                            htmlType="submit"
                            style={{ float: 'right' }}
                        >
                            {TEXT_CREATE_COURSE}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </Space>
    );
};

export default CoursesPage;
