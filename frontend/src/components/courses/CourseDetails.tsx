import React from 'react';
import { Card, Space, Typography, Timeline, Row, Col, Divider } from 'antd';
import { CourseStepSelfEvaluateButton } from './CourseStepActions';
import { CourseType } from '../../types/course';
import { Enums } from '../../shared';
import FilesAvatars from './FilesAvatars';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
const { Title } = Typography;

const getStatusColor = (step) => {
    if (step.user_progress.is_completed && !step.user_progress.is_blocked) {
        return 'green';
    } else if (
        !step.user_progress.is_completed &&
        !step.user_progress.is_blocked
    ) {
        return 'blue';
    } else {
        return 'grey';
    }
};

const CourseDetails = ({ course }: { course: CourseType }) => {
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
        return actions;
    };

    const getDot = (step) => {
        if (step.user_progress.is_completed) {
            return <TaskAltIcon />;
        } else if (
            !step.user_progress.is_blocked &&
            !step.user_progress.is_completed
        ) {
            return <ArrowForwardOutlinedIcon />;
        } else if (step.user_progress.is_blocked) {
            return <BlockOutlinedIcon />;
        }
    };

    const timelineItems = course.steps.map((step) => ({
        color: getStatusColor(step),
        children: (
            <Card
                title={<Title level={4}>{step.component.title}</Title>}
                extra={getActions(course.uuid, step)}
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
        ),
        dot: getDot(step),
    }));

    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <Title level={1}>{course.title}</Title>
            <Timeline items={timelineItems} />
        </Space>
    );
};

export default CourseDetails;
