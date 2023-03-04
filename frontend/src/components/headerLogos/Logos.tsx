import React from 'react';
import logoRP from '../../../public/RP.png';
import logoFE from '../../../public/FE_WEDU.jpg';
import logoUE from '../../../public/UE_EFS.jpg';
import logoWSB from '../../../public/WSB.jpg';
import { Row, Col, Divider } from 'antd';

const Logos = () => {
    return (
        <Row>
            <Col span={4} />
            <Col span={4}>
                <img src={logoFE} alt="logo" />
            </Col>
            <Col span={4}>
                <img src={logoRP} alt="logo" />
            </Col>
            <Col span={4}>
                <img src={logoWSB} alt="logo" />
            </Col>
            <Col span={4}>
                <img src={logoUE} alt="logo" />
            </Col>
            <Col span={4} />
            <Divider />
        </Row>
    );
};

export default Logos;
