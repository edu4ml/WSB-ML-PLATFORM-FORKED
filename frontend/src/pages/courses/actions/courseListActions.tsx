import { Button } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isTeacher } from '../../../helpers/permissions';
import { UserType } from '../../../types/user';
import CourseCreateModal from '../modals/courseCreate';

const CreateNewCourseButton = () => {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onClick = () => {
        setIsModalOpen(true);
    };
    const onCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button
                data-cy="course-catalog-create-new"
                key="New Course"
                onClick={onClick}
                type="primary"
            >
                {t('New Course')}
            </Button>
            {/* ----Modal------- */}
            <CourseCreateModal onCancel={onCancel} isOpen={isModalOpen} />
        </>
    );
};

const getActions = (user: UserType): Array<React.ReactNode> => {
    if (isTeacher(user)) {
        return [<CreateNewCourseButton />];
    }
    return [];
};

export { getActions, CreateNewCourseButton };
