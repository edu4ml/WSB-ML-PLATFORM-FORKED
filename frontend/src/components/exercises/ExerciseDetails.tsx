import React from 'react';
import { Card, List, Typography } from 'antd';
import LinkResourceListItem from '../common/LinkResourceListItem';

const { Paragraph } = Typography;

interface ResourceItem {
    title: string;
    url: string;
}

const ExerciseDetails = ({ exercise }) => {
    return (
        <Card title={exercise.title} bordered={true}>
            <Paragraph>{exercise.description}</Paragraph>

            <List
                itemLayout="vertical"
                size="large"
                dataSource={exercise.resources}
                renderItem={(item: ResourceItem) => (
                    <LinkResourceListItem item={item} />
                )}
            ></List>
        </Card>
    );
};

export default ExerciseDetails;
