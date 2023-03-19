import React from 'react';
import { Card, List, Typography } from 'antd';
import LinkResourceListItem from '../common/LinkResourceListItem';
import { ExerciseItemType, ResourceItemType } from '../../types/course';

const { Paragraph } = Typography;

const ExerciseDetails = ({ exercise }: { exercise: ExerciseItemType }) => {
    return (
        <Card title={exercise.title} bordered={true}>
            <Paragraph>{exercise.description}</Paragraph>

            <List
                itemLayout="vertical"
                size="large"
                dataSource={exercise.resources}
                renderItem={(item: ResourceItemType) => (
                    <LinkResourceListItem item={item} />
                )}
            ></List>
        </Card>
    );
};

export default ExerciseDetails;
