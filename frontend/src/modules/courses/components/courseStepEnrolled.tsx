import { Card, Col, Divider, Row, Space, Typography } from 'antd';
import React from 'react';
import getActions from '../actions/courseStepEnrolledActions';
import SubmissionsList from './submissionsList';
import ResourcesList from './resourcesList';

const { Title, Text } = Typography;

const CourseStepEnrolled = ({ step, courseUUID, userUUID }) => {
    return (
        <Card
            title={
                <Title level={4} disabled={step.user_progress.is_blocked}>
                    {step.component.title}
                </Title>
            }
            extra={getActions(courseUUID, userUUID, step)}
        >
            <Row>
                <Col span={8}>
                    <Text disabled={step.user_progress.is_blocked}>
                        {step.component.description}
                    </Text>
                </Col>
                <Col span={1}>
                    <Divider type="vertical" style={{ height: '100%' }} />
                </Col>
                <Col span={8}>
                    <ResourcesList
                        resources={step.component.resources}
                        disabled={step.user_progress.is_blocked}
                    />
                </Col>
                <Col span={1}>
                    <Divider type="vertical" style={{ height: '100%' }} />
                </Col>
                <Col span={6}>
                    <SubmissionsList
                        submissions={step.user_progress.submissions}
                        disabled={step.user_progress.is_blocked}
                    />
                </Col>
            </Row>
        </Card>
    );
};

export default CourseStepEnrolled;
