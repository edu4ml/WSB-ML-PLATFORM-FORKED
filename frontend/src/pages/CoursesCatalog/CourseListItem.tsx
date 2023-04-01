import { Card, Col, Progress, Row, Space, Typography } from 'antd';
import React from 'react';
import { CourseType } from '../../types/course';
import { UserType } from '../../types/user';
import CourseDetailsButton from '../../components/common/CourseDetailsButton';
import CourseEnrollButton from '../../components/common/CourseEnrollButton';
import { Link } from 'react-router-dom';
import { getCourseTitle } from '../../helpers/namesFactory';

const { Title } = Typography;

const PublishedEnrolledHeader = ({ course }) => {
    return (
        <Row>
            <Col span={16}>
                <Title level={4}>
                    <Link
                        data-cy="course-catalog-list-item-link-title"
                        to={`/app/courses/${course.uuid}`}
                    >
                        {getCourseTitle(course)}
                    </Link>
                </Title>
            </Col>
            <Col span={8}>
                <Progress
                    data-cy="course-catalog-list-item-progress"
                    percent={course.progress}
                />
            </Col>
        </Row>
    );
};

const PublishedNotEnrolledHeader = ({ course, user }) => {
    return (
        <Row>
            <Col span={20}>
                <Title level={4}>
                    <div data-cy="course-catalog-list-item-no-link-title">
                        {getCourseTitle(course)}
                    </div>
                </Title>
            </Col>
            <Col span={4}>
                <CourseEnrollButton
                    key={'enroll'}
                    course={course}
                    user={user}
                />
            </Col>
        </Row>
    );
};

const NotPublishedHeader = ({ course, user }) => {
    return (
        <Row>
            <Col span={20}>
                <Title level={4}>
                    <Link
                        data-cy="course-catalog-list-item-draft-title"
                        to={`/app/courses/${course.uuid}/edit`}
                    >
                        {getCourseTitle(course)}
                    </Link>
                </Title>
            </Col>
            <Col span={4}>
                <CourseDetailsButton key={'details'} course={course} />
            </Col>
        </Row>
    );
};

const CourseListItemTitle = ({
    course,
    user,
}: {
    course: CourseType;
    user: UserType;
}) => {
    if (course.is_enrolled && !course.is_draft) {
        return <PublishedEnrolledHeader course={course} />;
    } else if (!course.is_enrolled && !course.is_draft) {
        return <PublishedNotEnrolledHeader course={course} user={user} />;
    } else {
        return <NotPublishedHeader course={course} user={user} />;
    }
};

const CourseListItem = ({
    course,
    user,
}: {
    course: CourseType;
    user: UserType;
}) => {
    return (
        <Card
            data-cy={'course-catalog-list-item'}
            style={{ marginTop: '20px' }}
            title={<CourseListItemTitle course={course} user={user} />}
        >
            description={course.description}
        </Card>
    );
};

export default CourseListItem;
