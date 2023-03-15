import { Card, Typography } from 'antd';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import CardHeader, {
    CardHeaderActionsType,
} from '../../components/common/CardHeader';
import { useGetCourseQuery } from '../../features/courses/coursesApi';

const { Paragraph } = Typography;

const CourseEditPage = () => {
    const { courseId } = useParams();
    const { data, isLoading, isSuccess } = useGetCourseQuery(courseId);

    const [editableDescription, setEditableDescription] = useState(
        data?.description
    );

    const actions: CardHeaderActionsType = [
        {
            text: 'Opublikuj',
            onClick: () => {
                console.log('Publikuje!');
            },
        },
        {
            text: 'Edytuj',
            onClick: () => {
                console.log('Edytuje!');
            },
        },
        {
            text: 'Zapisz',
            onClick: () => {
                console.log('Zapisuje!');
            },
        },
    ];

    if (!isLoading && isSuccess) {
        return (
            <Card
                title={<CardHeader title={data.title} actions={actions} />}
                bordered={false}
            >
                <Paragraph
                    editable={{
                        onChange: setEditableDescription,
                    }}
                >
                    {editableDescription}
                </Paragraph>
            </Card>
        );
    }
    return <div></div>;
};
export default CourseEditPage;
