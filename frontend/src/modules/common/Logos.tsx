import React from 'react';
import logoRP from '../../../public/RP.png';
import logoFE from '../../../public/FE_WEDU.png';
import logoUE from '../../../public/UE_EFS2.png';
import logoWSB from '../../../public/WSB2.png';
import { Row, Col } from 'antd';

const logoHeaderStyle: React.CSSProperties = {
    backgroundColor: '#f4f7fc',
};

const logoStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '300px' /* Adjust this to your preferred logo size */,
    height: 'auto',
    marginTop: '50px',
    marginBottom: '150px',
};

const Logos = () => {
    return (
        <Row align={'middle'} justify={'center'} style={logoHeaderStyle}>
            <Col span={6}>
                <img src={logoFE} alt="logo" style={logoStyle} />
            </Col>
            <Col span={6}>
                <img src={logoRP} alt="logo" style={logoStyle} />
            </Col>
            <Col span={6}>
                <img src={logoWSB} alt="logo" style={logoStyle} />
            </Col>
            <Col span={6}>
                <img src={logoUE} alt="logo" style={logoStyle} />
            </Col>
        </Row>
    );
};

export default Logos;
