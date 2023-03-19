import React from 'react';
import { Card, Collapse, List, Space, Tag, Typography } from 'antd';
import CourseStepSelfEvaluateButton from './CourseStepSelfEvaluateButton';
import LinkResourceListItem from '../common/LinkResourceListItem';
import {
    CourseItemDetailsType,
    CourseStepItemType,
    ResourceItemType,
} from '../../types/course';

const { Text, Paragraph } = Typography;

const getStatusTag = (row: CourseStepItemType) => {
    const tagStyle: React.CSSProperties = {
        float: 'right',
    };

    if (row.user_progress.is_completed && !row.user_progress.is_blocked) {
        return (
            <span>
                <Tag style={tagStyle} color="green">
                    {'Ukończono'}
                </Tag>
            </span>
        );
    } else if (
        !row.user_progress.is_completed &&
        !row.user_progress.is_blocked
    ) {
        return (
            <span>
                <Tag style={tagStyle} color="geekblue">
                    {'W trakcie'}
                </Tag>
            </span>
        );
    } else {
        return (
            <span>
                <Tag style={tagStyle} color="volcano">
                    {'Zablokowany'}
                </Tag>
            </span>
        );
    }
};

const getResourcesList = (resources) => {
    return (
        <List
            size="large"
            dataSource={resources}
            renderItem={(item: ResourceItemType) => (
                <LinkResourceListItem item={item} />
            )}
        />
    );
};

const CourseDetails = ({ course }: { course: CourseItemDetailsType }) => {
    return (
        <Card title={course.title} bordered={false}>
            <Paragraph>{course.description}</Paragraph>

            <Collapse defaultActiveKey={course.current_active}>
                {course.steps.map((item) => (
                    <Collapse.Panel
                        collapsible={
                            item.user_progress.is_blocked
                                ? 'disabled'
                                : undefined
                        }
                        extra={getStatusTag(item)}
                        header={
                            <Text
                                strong
                                type={
                                    item.user_progress.is_blocked
                                        ? 'secondary'
                                        : undefined
                                }
                            >
                                {item.title}
                            </Text>
                        }
                        key={item.order}
                    >
                        {item.description}
                        {getResourcesList(item.resources)}
                        <Space />
                        {item.is_self_evaluated &&
                            !item.user_progress.is_completed && (
                                <CourseStepSelfEvaluateButton
                                    progress_tracking_uuid={
                                        item.user_progress.tracking_uuid
                                    }
                                    course_uuid={course.uuid}
                                />
                            )}
                    </Collapse.Panel>
                ))}
            </Collapse>
        </Card>
    );
};

export default CourseDetails;
