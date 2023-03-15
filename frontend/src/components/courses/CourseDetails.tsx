import React from 'react';
import { Card, Collapse, List, Space, Tag, Typography } from 'antd';
import CourseStepSelfEvaluateButton from './CourseStepSelfEvaluateButton';
import LinkResourceListItem from '../common/LinkResourceListItem';

const { Text, Paragraph } = Typography;

interface CourseStepItem {
    id: number;
    title: string;
    description: string;
    is_self_evaluated: boolean;
    is_draft: boolean;
    user_progress: {
        tracking_id: number;
        is_completed: boolean;
        is_blocked: boolean;
    };
}

interface ResourceItem {
    title: string;
    url: string;
}

const getStatusTag = (row: CourseStepItem) => {
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
            renderItem={(item: ResourceItem) => (
                <LinkResourceListItem item={item} />
            )}
        />
    );
};

const CourseDetails = ({ data }) => {
    return (
        <Card title={data.title} bordered={false}>
            <Paragraph>{data.description}</Paragraph>

            <Collapse defaultActiveKey={data.current_active}>
                {data.steps.map((item) => (
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
                                    progress_tracking_id={
                                        item.user_progress.tracking_id
                                    }
                                    course_id={data.id}
                                />
                            )}
                    </Collapse.Panel>
                ))}
            </Collapse>
        </Card>
    );
};

export default CourseDetails;
