import { Space, Tag, Typography } from 'antd';
import React from 'react';
import { Enums } from '../../shared';
import {
    TXT_EXERCISE,
    TXT_COURSE_COMPONENT_TYPE_FILE_EVALUATION,
    TXT_OTHER,
} from '../../texts';

const { Title } = Typography;

const courseComponentTypeToTextMap = {
    [Enums.COURSE_COMPONENT_TYPE.EXERCISE]: TXT_EXERCISE,
    [Enums.COURSE_COMPONENT_TYPE.EVALUATION]:
        TXT_COURSE_COMPONENT_TYPE_FILE_EVALUATION,
    [Enums.COURSE_COMPONENT_TYPE.OTHER]: TXT_OTHER,
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
