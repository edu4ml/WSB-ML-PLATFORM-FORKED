import React from 'react';
import { Layout as AntDLayout, Row, Col } from 'antd';
import Logos from '../../components/headerLogos/Logos';
import { Content, Footer } from 'antd/es/layout/layout';

const Layout = (props) => {
    return (
        <AntDLayout>
            <div className="content">
                <Row>
                    <Logos />
                </Row>
                <Row>
                    <Col span={3}>{/* sidebar goes here */}</Col>
                    <Col span={21}>
                        <Content style={{ padding: '0 50px' }}>
                            <div>{props.children}</div>
                        </Content>
                    </Col>
                </Row>
            </div>
            <Footer />
        </AntDLayout>
    );
};

export default Layout;
