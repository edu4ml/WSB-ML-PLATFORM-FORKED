import { Button, Card, Form, Input, Modal } from 'antd';
import React, { useState } from 'react';
import CardHeader, {
    CardHeaderActionsType,
} from '../../components/common/CardHeader';
import CourseList from '../../components/courses/CourseList';
import {
    useCreateCourseMutation,
    useGetCourseCatalogQuery,
} from '../../features/courses/coursesApi';
import { useNavigate } from 'react-router-dom';

const CoursesPage = () => {
    const [createCourseCommand, {}] = useCreateCourseMutation();
    const { data } = useGetCourseCatalogQuery('course-catalog');
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

    const actions: CardHeaderActionsType = [
        {
            text: 'Nowy kurs',
            onClick: showModal,
        },
    ];

    const handleCourseCreate = (values) => {
        createCourseCommand({ type: 'CREATE_COURSE', ...values })
            .unwrap()
            .then((response) => {
                console.log('Response: ', response);
                setIsModalOpen(false);
                navigate(`/courses/${response.id}/edit`);
            })
            .catch((err) => {
                console.error('Error: ', err);
                setIsModalOpen(false);
            });
    };

    return (
        <>
            <Card
                title={<CardHeader title={'Twoje kursy'} actions={actions} />}
                bordered={false}
            >
                <CourseList courses={data} />
            </Card>
            <Modal
                title={'Podaj nazwę nowego kursu'}
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
                        label="Tytuł kursu"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: 'Podaj nazwę nowego kursu!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ float: 'right' }}
                        >
                            Utwórz
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default CoursesPage;
