import { Col, Progress, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { CourseType } from '../../types/course';

const CourseListItemHeader = ({ course }: { course: CourseType }) => {
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
            <span data-cy="course-catalog-list-item-draft-title">
                {course.title} {course.is_draft && '(Wersja robocza)'}
            </span>
        );
    }
};

export default CourseListItemHeader;
