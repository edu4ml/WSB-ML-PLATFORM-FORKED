import React from 'react';
import { useParams } from 'react-router';
import { useGetCourseQuery } from '../../features/courses/coursesApi';
import { Space, Typography, Timeline } from 'antd';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import CourseStepItem from './CourseStepItem';
import { useGetUserProfileQuery } from '../../features/auth/authApi';

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

const CourseDetailPage = () => {
    const { data: userData } = useGetUserProfileQuery('userDetails');
    const { courseId } = useParams();
    const { data: course } = useGetCourseQuery(courseId);

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

    const timelineItems = course?.steps.map((step) => ({
        color: getStatusColor(step),
        children: (
            <CourseStepItem
                step={step}
                courseUUID={course.uuid}
                userUUID={userData.pk}
            />
        ),
        dot: getDot(step),
    }));

    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <Title level={1}>{course?.title}</Title>
            <Timeline items={timelineItems} />
        </Space>
    );
};

export default CourseDetailPage;
