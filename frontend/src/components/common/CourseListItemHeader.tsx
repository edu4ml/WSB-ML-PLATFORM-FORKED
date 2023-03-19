import { Col, Progress, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { CourseListItemType } from '../../types/course';

const CourseListItemHeader = ({ course }: { course: CourseListItemType }) => {
    if (course.is_enrolled && !course.is_draft) {
        return (
            <Row>
                <Col span={16}>
                    <Link to={`/courses/${course.uuid}`}>{course.title}</Link>
                </Col>
                <Col span={8}>
                    <Progress percent={course.progress} />
                </Col>
            </Row>
        );
    } else {
        return (
            <span>
                {course.title} {course.is_draft && '(Wersja robocza)'}
            </span>
        );
    }
};

export default CourseListItemHeader;
