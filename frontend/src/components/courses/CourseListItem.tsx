import React from 'react';
import { List, Typography, Row, Col, Divider } from 'antd';

const { Title } = Typography;

const courseItemRowStyle: React.CSSProperties = {
    width: '100%',
};

const CourseListItem = ({ course }) => {
    return (
        <Row style={courseItemRowStyle}>
            <Col span={21}>
                <Title level={3}>{course.title}</Title>
                {course.content}
            </Col>
            <Col span={3}>
                tutaj mozna dodac jakis status kursu. czy zaliczone itd
            </Col>
        </Row>
    );
};

export default CourseListItem;
