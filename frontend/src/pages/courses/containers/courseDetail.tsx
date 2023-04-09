import { Space, Timeline, Typography } from 'antd';
import React from 'react';
import { useParams } from 'react-router';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import { useUserProfileQuery } from '../../../features/auth/authApi';
import CourseStepEnrolled from '../components/courseStepEnrolled';
import { useGetCourseDetailQuery } from '../../../features/courses/coursesApi';

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

const CourseDetail = () => {
    const { courseId } = useParams();
    const { data: user } = useUserProfileQuery('userDetails');
    const { data: course } = useGetCourseDetailQuery(courseId);

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
            <CourseStepEnrolled
                step={step}
                courseUUID={course.uuid}
                userUUID={user.pk}
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

export default CourseDetail;
