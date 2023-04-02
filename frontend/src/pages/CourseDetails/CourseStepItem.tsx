import React from 'react';
import { Card, Space, Typography, Row, Col, Divider } from 'antd';
import {
    CourseStepSelfEvaluateButton,
    CourseStepUploadSubmissionButton,
} from './CourseStepActions';
import { Enums } from '../../shared';
const { Title, Text } = Typography;
import CourseStepSubmissionList from './CourseStepSubmissionList';
import CourseStepResourcesList from './CourseStepResourcesList';

const CourseStepItem = ({ step, course_uuid }) => {
    const getActions = (courseUUID, courseStep) => {
        let actions: React.ReactNode[] = [];
        if (
            courseStep.evaluation_type ==
                Enums.COURSE_STEP_EVALUATION_TYPE.SELF_EVALUATED &&
            !courseStep.user_progress.is_blocked &&
            !courseStep.user_progress.is_completed
        ) {
            actions.push(
                <CourseStepSelfEvaluateButton
                    key={'self-evaluate'}
                    course_uuid={courseUUID}
                    progress_tracking_uuid={
                        courseStep.user_progress.tracking_uuid
                    }
                />
            );
        }

        if (
            !courseStep.user_progress.is_blocked &&
            !courseStep.user_progress.is_completed
        ) {
            actions.push(
                <CourseStepUploadSubmissionButton
                    key={'upload-submission'}
                    courseUUID={courseUUID}
                    courseStep={courseStep}
                />
            );
        }
        return <Space direction="horizontal">{actions}</Space>;
    };
    return (
        <Card
            title={
                <Title level={4} disabled={step.user_progress.is_blocked}>
                    {step.component.title}
                </Title>
            }
            extra={getActions(course_uuid, step)}
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
                    <CourseStepResourcesList
                        resources={step.component.resources}
                        disabled={step.user_progress.is_blocked}
                    />
                </Col>
                <Col span={1}>
                    <Divider type="vertical" style={{ height: '100%' }} />
                </Col>
                <Col span={6}>
                    <CourseStepSubmissionList
                        submissions={step.user_progress.submissions}
                        disabled={step.user_progress.is_blocked}
                    />
                </Col>
            </Row>
        </Card>
    );
};

export default CourseStepItem;
