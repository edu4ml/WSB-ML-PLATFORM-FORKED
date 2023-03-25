import { Button, Card, Form, Input, Modal } from 'antd';
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
    TEXT_NEW_COURSE_TITLE_WARNING,
} from '../../texts';

const tabList = [
    {
        key: 'coursesAll',
        tab: TEXT_COURSES_ALL,
    },
];

const CoursesPage = () => {
    const [createCourseCommand, {}] = useCreateCourseMutation();
    const { data: courses } = useGetCourseCatalogQuery('course-catalog');
    const { data: userData } = useGetUserProfileQuery('userDetails');

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [activeTabKey, setActiveTabKey] = useState<string>('coursesAll');

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

    const actions: Array<CardHeaderRightButtonActionType> = [
        {
            text: TEXT_NEW_COURSE,
            onClick: showModal,
            type: 'primary',
            dataCy: 'course-catalog-create-new',
        },
    ];

    const handleCourseCreate = (values) => {
        createCourseCommand({
            type: Enums.COMMAND_TYPES.CREATE_COURSE,
            ...values,
        })
            .unwrap()
            .then((response) => {
                setIsModalOpen(false);
                navigate(`/courses/${response.uuid}/edit`);
            })
            .catch((err) => {
                console.error('Error: ', err);
                setIsModalOpen(false);
            });
    };

    const cardContentList: Record<string, React.ReactNode> = {
        coursesAll: <CourseList courses={courses} />,
    };

    return (
        <>
            <Card
                title={
                    <CardHeader
                        title={''}
                        actions={isTeacher(userData) ? actions : []}
                    />
                }
                bordered={false}
                tabList={tabList}
                activeTabKey={activeTabKey}
                onTabChange={setActiveTabKey}
            >
                {cardContentList[activeTabKey]}
            </Card>
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
                                message: TEXT_NEW_COURSE_TITLE_WARNING,
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
        </>
    );
};

export default CoursesPage;
