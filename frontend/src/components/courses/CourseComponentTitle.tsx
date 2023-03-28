import { Space, Tag, Typography } from 'antd';
import React from 'react';
import { Enums } from '../../shared';
import {
    TEXT_COURSE_COMPONENT_TYPE_EXERCISE,
    TEXT_COURSE_COMPONENT_TYPE_FILE_EVALUATION,
    TEXT_COURSE_COMPONENT_TYPE_UNKNOWN,
} from '../../texts';

const { Title } = Typography;

const courseComponentTypeToTextMap = {
    [Enums.COURSE_STEP_COMPONENT_TYPES.EXERCISE]:
        TEXT_COURSE_COMPONENT_TYPE_EXERCISE,
    [Enums.COURSE_STEP_COMPONENT_TYPES.FILE_EVALUATION]:
        TEXT_COURSE_COMPONENT_TYPE_FILE_EVALUATION,
    [Enums.COURSE_STEP_COMPONENT_TYPES.UNKNOWN]:
        TEXT_COURSE_COMPONENT_TYPE_UNKNOWN,
};

const CourseComponentTitle = ({ component }) => {
    return (
        <Space direction="horizontal">
            <Title level={4}>{component.title}</Title>
            <Tag color={'geekblue'}>
                {' '}
                {courseComponentTypeToTextMap[component.type]}
            </Tag>
        </Space>
    );
};

export default CourseComponentTitle;
