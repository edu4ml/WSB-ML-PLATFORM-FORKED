import { Card, Typography } from 'antd';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import CardHeader, {
    CardHeaderActionsType,
} from '../../components/common/CardHeader';

import {
    useIssueCourseCommandMutation,
    useGetCourseQuery,
} from '../../features/courses/coursesApi';
import { Enums } from '../../shared';
import CourseEditStepsList from '../../components/courses/CourseEditStepsList';

const { Paragraph } = Typography;

const CourseEditPage = () => {
    const { courseId } = useParams();
    const { data, isLoading, isSuccess } = useGetCourseQuery(courseId);
    const [issueCommand, {}] = useIssueCourseCommandMutation();
    const [dataSource, setDataSource] = useState([]);
    const [editedButNotSaved, setEditedButNotSaved] = useState(false);

    const [editableDescription, setEditableDescription] = useState('');

    useEffect(() => {
        if (data) {
            setEditableDescription(data.description);
            setDataSource(data.steps);
        }
    }, [data]);

    const actions: CardHeaderActionsType = [
        {
            text: 'Opublikuj',
            onClick: () => {
                console.log('Publikuje!');
            },
            type: 'default',
        },
        {
            text: 'Edytuj',
            onClick: () => {
                console.log('Edytuje!');
            },
            type: 'default',
        },
        {
            text: 'Zapisz',
            type: editedButNotSaved ? 'primary' : 'default',
            onClick: () => {
                const command = {
                    type: Enums.COMMAND_TYPES__UPDATE_COURSE,
                    description: editableDescription,
                };
                console.log('Datasource', dataSource);

                issueCommand({ id: courseId, command })
                    .unwrap()
                    .then((res) => {
                        console.log('Success!: ', res);
                    })
                    .catch((err) => {
                        console.log('Err: ', err);
                    });
            },
        },
    ];

    if (!isLoading && isSuccess) {
        return (
            <Card
                title={
                    <CardHeader
                        title={
                            data.is_draft
                                ? `${data.title} (Wersja robocza)`
                                : data.title
                        }
                        actions={actions}
                    />
                }
                bordered={false}
            >
                <Paragraph
                    editable={{
                        onChange: setEditableDescription,
                    }}
                >
                    {editableDescription}
                </Paragraph>
                <CourseEditStepsList
                    dataSource={dataSource}
                    setDataSource={setDataSource}
                    setEditedButNotSaved={setEditedButNotSaved}
                />
            </Card>
        );
    }
    return <div></div>;
};
export default CourseEditPage;
