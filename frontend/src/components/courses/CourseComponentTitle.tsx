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
    [Enums.COURSE_COMPONENT_TYPE.EXERCISE]: TEXT_COURSE_COMPONENT_TYPE_EXERCISE,
    [Enums.COURSE_COMPONENT_TYPE.EVALUATION]:
        TEXT_COURSE_COMPONENT_TYPE_FILE_EVALUATION,
    [Enums.COURSE_COMPONENT_TYPE.OTHER]: TEXT_COURSE_COMPONENT_TYPE_UNKNOWN,
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
