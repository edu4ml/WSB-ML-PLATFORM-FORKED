import { Button, Space } from 'antd';
import React, { useState } from 'react';
import CourseList from './CourseList';
import {
    useCreateCourseMutation,
    useGetCourseCatalogQuery,
} from '../../features/courses/coursesApi';
import { useNavigate } from 'react-router-dom';
import { Enums } from '../../shared';
import { TEXT_NEW_COURSE, TEXT_COURSE_PAGE_TITLE } from '../../texts';
import CourseCreateModal from './CourseCreateModal';
import { isTeacher } from '../../helpers/permissions';
import { useGetUserProfileQuery } from '../../features/auth/authApi';
import PageHeader from '../../components/common/PageHeader';

const CoursesPage = () => {
    const { data: courses } = useGetCourseCatalogQuery('course-catalog');
    const { data: user } = useGetUserProfileQuery('userDetails');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [createCourseCommand, {}] = useCreateCourseMutation();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const navigate = useNavigate();

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

    const actions = isTeacher(user) && (
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
    );

    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <PageHeader title={TEXT_COURSE_PAGE_TITLE} actions={[actions]} />
            <CourseList courses={courses} user={user} />
            {/* // modal */}
            <CourseCreateModal
                isOpen={isModalOpen}
                onCancel={handleCancel}
                onOk={handleCourseCreate}
            />
        </Space>
    );
};

export default CoursesPage;
