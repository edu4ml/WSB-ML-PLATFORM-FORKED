import { Button } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { isTeacher } from '../../../helpers/permissions';

const CreateNewCourseButton = ({ onClick }) => {
    const { t } = useTranslation();

    return (
        <Button
            data-cy="course-catalog-create-new"
            key="New Course"
            onClick={onClick}
            type="primary"
        >
            {t('New Course')}
        </Button>
    );
};

const getActions = (user) => {
    if (isTeacher(user)) {
        return [<CreateNewCourseButton onClick={undefined} />];
    }
    return [];
};

export { getActions, CreateNewCourseButton };
