import { Col, Progress, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { CourseType } from '../../types/course';

const CourseListItemHeader = ({ course, actions }: { course: CourseType }) => {
    if (course.is_enrolled && !course.is_draft) {
        return (
            <Row>
                <Col span={16}>
                    <Link
                        data-cy="course-catalog-list-item-link-title"
                        to={`/courses/${course.uuid}`}
                    >
                        {course.title}
                    </Link>
                </Col>
                <Col span={8}>
                    <Progress
                        data-cy="course-catalog-list-item-progress"
                        percent={course.progress}
                    />
                </Col>
            </Row>
        );
    } else {
        return (
            <Row>
                <Col span={20}>
                    <Link
                        data-cy="course-catalog-list-item-draft-title"
                        to={`/courses/${course.uuid}/edit`}
                    >
                        {course.title} {course.is_draft && '(Wersja robocza)'}
                    </Link>
                </Col>
                <Col span={4}>{actions}</Col>
            </Row>
        );
    }
};

export default CourseListItemHeader;
