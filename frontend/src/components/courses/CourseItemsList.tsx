import React from 'react';
import { Card, Collapse, List, Space, Tag, Typography } from 'antd';
import CourseStepSelfEvaluateButton from './CourseStepSelfEvaluateButton';
import LinkIcon from '@mui/icons-material/Link';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const { Text } = Typography;

enum ItemType {}

interface CourseStepItem {
    id: number;
    title: string;
    description: string;
    is_completed: boolean;
    is_blocked: boolean;
    is_self_evaluated: boolean;
    steps;
    current_active: number;
}

interface ResourceItem {
    title: string;
    url: string;
}

const getStatusTag = (row: CourseStepItem) => {
    const tagStyle: React.CSSProperties = {
        float: 'right',
    };

    if (row.is_completed && !row.is_blocked) {
        return (
            <span>
                <Tag style={tagStyle} color="green">
                    {'Ukończono'}
                </Tag>
            </span>
        );
    } else if (!row.is_completed && !row.is_blocked) {
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
                <List.Item>
                    <a href={item.url} target="_blank">
                        <LinkIcon style={{ verticalAlign: 'middle' }} />{' '}
                        {item.title}
                    </a>
                </List.Item>
            )}
        />
    );
};

const CourseItemsList = ({ data }) => {
    return (
        <Card title={data.title} bordered={false}>
            <Collapse defaultActiveKey={data.current_active}>
                {data.steps.map((item) => (
                    <Collapse.Panel
                        collapsible={item.is_blocked ? 'disabled' : undefined}
                        extra={getStatusTag(item)}
                        header={
                            <Text
                                strong
                                type={item.is_blocked ? 'secondary' : undefined}
                            >
                                {item.title}
                            </Text>
                        }
                        key={item.id}
                    >
                        {item.description}
                        {getResourcesList(item.resources)}
                        <Space />
                        {item.is_self_evaluated && (
                            <CourseStepSelfEvaluateButton
                                step_id={item.id}
                                course_id={data.id}
                            />
                        )}
                    </Collapse.Panel>
                ))}
            </Collapse>
        </Card>
    );
};

export default CourseItemsList;
