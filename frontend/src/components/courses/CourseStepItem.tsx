import React from 'react';
import { Card, Space, Typography, Row, Col, Divider, Avatar, Tag } from 'antd';
import {
    CourseStepSelfEvaluateButton,
    CourseStepUploadSubmissionButton,
} from './CourseStepActions';
import { Enums } from '../../shared';
const { Title, Text } = Typography;
import { FileOutlined, LinkOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const submissionStatusTagColor = {
    [Enums.COURSE_STEP_EVALUATION_STATUS.WAITING]: 'warning',
    [Enums.COURSE_STEP_EVALUATION_STATUS.PASSED]: 'success',
    [Enums.COURSE_STEP_EVALUATION_STATUS.FAILED]: 'error',
    [Enums.COURSE_STEP_EVALUATION_STATUS.SUBMITTED]: 'processing',
};

const ResourceLink = ({ resource, disabled }) => {
    const isFIleResourceType = resource.type === 'FILE';

    const avatar = (
        <Space>
            <Avatar
                size={'small'}
                icon={isFIleResourceType ? <FileOutlined /> : <LinkOutlined />}
                src={resource.file_link}
            />
            <Text disabled={disabled}>{resource.title}</Text>
        </Space>
    );

    if (disabled) {
        return avatar;
    }
    return (
        <Link
            target={'_blank'}
            to={isFIleResourceType ? resource.file_link : resource.url}
        >
            {avatar}
        </Link>
    );
};
const CourseStepExtraResources = ({ resources, disabled = true }) => {
    return (
        <Space direction="vertical">
            <Text disabled={disabled} strong>
                Meteriały dodatkowe
            </Text>

            {resources.map((resource) => (
                <ResourceLink
                    key={resource.uuid}
                    resource={resource}
                    disabled={disabled}
                />
            ))}
        </Space>
    );
};

const CourseSubmissions = ({ submissions, disabled }) => {
    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <Text disabled={disabled} strong>
                Przesłane zadania
            </Text>
            {submissions.map((submission) => (
                <Space style={{ width: '100%' }}>
                    <ResourceLink
                        key={submission.uuid}
                        resource={submission}
                        disabled={disabled}
                    />
                    <Tag color={submissionStatusTagColor[submission.status]}>
                        {submission.status}
                    </Tag>
                </Space>
            ))}
        </Space>
    );
};

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
                    <CourseStepExtraResources
                        resources={step.component.resources}
                        disabled={step.user_progress.is_blocked}
                    />
                </Col>
                <Col span={1}>
                    <Divider type="vertical" style={{ height: '100%' }} />
                </Col>
                <Col span={6}>
                    <CourseSubmissions
                        submissions={step.user_progress.submissions}
                        disabled={step.user_progress.is_blocked}
                    />
                </Col>
            </Row>
        </Card>
    );
};

export default CourseStepItem;
