import React from 'react';
import { Card, Space, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FolderTwoTone } from '@ant-design/icons';
import logoWSB from '../../../public/WSB2.png';

const SideBarMenu = () => {
    const navigate = useNavigate();

    const logoStyle: React.CSSProperties = {
        width: '100%',
        // maxWidth: '300px' /* Adjust this to your preferred logo size */,
        height: 'auto',
        padding: '20px',
        marginTop: '100px',
        marginBottom: '20px',
    };

    return (
        <Space
            direction="vertical"
            style={{
                width: '100%',
                backgroundColor: '#ffffff',
                height: '100%',
                padding: '20px',
            }}
        >
            <img src={logoWSB} alt="logo" style={logoStyle} />

            <Card hoverable onClick={() => navigate('/app/dashboard')}>
                <Card.Meta
                    avatar={<FolderTwoTone />}
                    title="Panel"
                    description="Przeglądaj statystyki"
                />
            </Card>
            <Card
                hoverable
                onClick={() => navigate('/app/courses')}
                data-cy="courses-menu-tab"
            >
                <Card.Meta
                    avatar={<FolderTwoTone />}
                    title="Kursy"
                    description="Zarządzaj kursami"
                />
            </Card>
            <Card hoverable onClick={() => navigate('/app/course-components')}>
                <Card.Meta
                    avatar={<FolderTwoTone />}
                    title="Ćwiczenia"
                    description="Zarządzaj ćwiczeniami i testami"
                />
            </Card>
        </Space>
    );
};

export default SideBarMenu;
