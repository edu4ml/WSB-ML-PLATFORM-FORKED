import React from 'react';
import { Card, Space, Typography, Row, Col, Divider } from 'antd';
import {
    CourseStepSelfEvaluateButton,
    CourseStepUploadSubmissionButton,
} from './CourseStepActions';
import { Enums } from '../../shared';
import FilesAvatars from './FilesAvatars';
const { Title } = Typography;

const CourseStepItem = ({ step, course_uuid }) => {
    const getActions = (course_uuid, courseComponent) => {
        let actions: React.ReactNode[] = [];
        if (
            courseComponent.evaluation_type ==
                Enums.COURSE_STEP_EVALUATION_TYPE.SELF_EVALUATED &&
            !courseComponent.user_progress.is_blocked &&
            !courseComponent.user_progress.is_completed
        ) {
            actions.push(
                <CourseStepSelfEvaluateButton
                    key={'self-evaluate'}
                    course_uuid={course_uuid}
                    progress_tracking_uuid={
                        courseComponent.user_progress.tracking_uuid
                    }
                />
            );
        }

        if (
            !courseComponent.user_progress.is_blocked &&
            !courseComponent.user_progress.is_completed
        ) {
            actions.push(
                <CourseStepUploadSubmissionButton
                    key={'upload-submission'}
                    course_uuid={course_uuid}
                    progress_tracking_uuid={
                        courseComponent.user_progress.tracking_uuid
                    }
                />
            );
        }
        return <Space direction="horizontal">{actions}</Space>;
    };
    return (
        <Card
            title={<Title level={4}>{step.component.title}</Title>}
            extra={getActions(course_uuid, step)}
        >
            <Row>
                <Col span={12}>{step.component.description}</Col>
                <Col span={1}>
                    <Divider type="vertical" style={{ height: '100%' }} />
                </Col>
                <Col span={11}>
                    <FilesAvatars files={step.component.resources} />
                </Col>
            </Row>
        </Card>
    );
};

export default CourseStepItem;
