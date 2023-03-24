import {
    Collapse,
    Typography,
    Space,
    List,
    Steps,
    Progress,
    Col,
    Row,
} from 'antd';
import React from 'react';
import {
    ReportCourseStudentProgressType,
    ReportCourseType,
} from '../../types/reports';
import { UserOutlined } from '@ant-design/icons';
import { Enums } from '../../shared';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DownloadingIcon from '@mui/icons-material/Downloading';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import QuizIcon from '@mui/icons-material/Quiz';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';

const { Text } = Typography;

const stepEvaluationStatusToDescription = {
    [Enums.COURSE_STEP_EVALUATION_STATUS.PASSED]: {
        text: 'Ukończono',
        icon: <DoneAllIcon />,
    },
    [Enums.COURSE_STEP_EVALUATION_STATUS.SKIPPED]: {
        text: 'Pominięto',
        icon: <SkipNextIcon />,
    },
    [Enums.COURSE_STEP_EVALUATION_STATUS.SUBMITTED]: {
        text: 'Rozwiązanie przesłane',
        icon: <DownloadingIcon />,
    },
    [Enums.COURSE_STEP_EVALUATION_STATUS.WAITING]: {
        text: 'Oczekuje',
        icon: <HourglassEmptyIcon />,
    },
    [Enums.COURSE_STEP_EVALUATION_STATUS.UNKNOWN]: {
        text: 'Nieznany',
        icon: <QuizIcon />,
    },
};

const CoursesProgressList = ({
    courses,
}: {
    courses: Array<ReportCourseType>;
}) => {
    const studentsCounter = (course) => {
        return (
            <Space>
                <PeopleAltOutlinedIcon />
                {course.students.length}
            </Space>
        );
    };

    const getStudentCourseProgress = (
        courseProgress: ReportCourseStudentProgressType
    ) => {
        return courseProgress.steps.map((step) => {
            console.log(step);
            return {
                title: stepEvaluationStatusToDescription[
                    step.evaluation_status.status
                ].text,
                description: step.title,
            };
        });
    };

    return (
        <Collapse>
            {courses.map((course) => (
                <Collapse.Panel
                    key={course.title}
                    extra={studentsCounter(course)}
                    header={
                        <Text
                            strong
                            type={
                                course.students?.length
                                    ? undefined
                                    : 'secondary'
                            }
                        >
                            {course.title}
                        </Text>
                    }
                    collapsible={
                        course.students?.length ? undefined : 'disabled'
                    }
                >
                    <List
                        dataSource={course.students}
                        renderItem={(student) => (
                            <List.Item>
                                <Space
                                    style={{ width: '100%' }}
                                    direction="vertical"
                                >
                                    <Row>
                                        <Col span={16}>
                                            <Space direction="horizontal">
                                                <UserOutlined />
                                                {student.email}
                                            </Space>
                                        </Col>
                                        <Col span={8}>
                                            <Progress percent={36} />
                                        </Col>
                                    </Row>
                                </Space>
                            </List.Item>
                        )}
                    />
                </Collapse.Panel>
            ))}
        </Collapse>
    );
};

export default CoursesProgressList;
