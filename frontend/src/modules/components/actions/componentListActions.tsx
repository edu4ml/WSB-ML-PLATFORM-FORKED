import { Button } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ComponentCreateModal from '../modals/componentCreate';

const CreateNewComponent = () => {
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
                data-cy="component-create-new"
                key={'Create new component'}
                onClick={onClick}
                type="primary"
            >
                {t('Create new component')}
            </Button>
            {/* ----- Modal ----- */}
            <ComponentCreateModal isOpen={isModalOpen} onCancel={onCancel} />
        </>
    );
};

const getActions = (): Array<React.ReactNode> => {
    return [<CreateNewComponent />];
};

export default getActions;
