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
import CourseList from '../../components/courses/CourseList';
import {
    useCreateCourseMutation,
    useGetCourseCatalogQuery,
} from '../../features/courses/coursesApi';
import { useNavigate } from 'react-router-dom';
import { Enums } from '../../shared';
import { TEXT_NEW_COURSE, TEXT_COURSE_PAGE_TITLE } from '../../texts';
import CourseCreateModal from '../../components/courses/CourseCreateModal';

const { Title } = Typography;

const CoursesPage = () => {
    const [createCourseCommand, {}] = useCreateCourseMutation();
    const { data: courses } = useGetCourseCatalogQuery('course-catalog');

    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    const showModal = () => {
        setIsModalOpen(true);
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

            <CourseList courses={courses} />
            <CourseCreateModal
                isOpen={isModalOpen}
                onCancel={handleCancel}
                onOk={handleCourseCreate}
            />
        </Space>
    );
};

export default CoursesPage;
