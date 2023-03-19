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
import {
    CourseListItemType,
    CourseComponentItemType,
} from '../../types/course';

const { Paragraph } = Typography;

const CourseEditPage = () => {
    const { courseId } = useParams();
    const { data, isLoading, isSuccess } = useGetCourseQuery(courseId);
    const [issueCommand, {}] = useIssueCourseCommandMutation();
    const [dataSource, setDataSource] = useState([]);
    const [editedButNotSaved, setEditedButNotSaved] = useState(false);

    const [isDraft, setIsDraft] = useState(true);
    const [editableDescription, setEditableDescription] = useState('');

    useEffect(() => {
        if (data) {
            setEditableDescription(data.description);
            setDataSource(data.steps);
            setIsDraft(data.is_draft);
        }
    }, [data]);

    const handleDescriptionChange = (description: string) => {
        setEditedButNotSaved(true);
        setEditableDescription(description);
    };

    const mapToCourseSteps = (data) => {
        return data.map((item: CourseComponentItemType, index: number) => ({
            content_type: item.content_type,
            uuid: item.uuid,
            order: index + 1,
        }));
    };

    let actions: CardHeaderActionsType = [
        {
            text: isDraft ? 'Opublikuj' : 'Zamień w szkic',
            onClick: () => {
                const command = {
                    type: Enums.COMMAND_TYPES.UPDATE_COURSE,
                    is_draft: !data.is_draft,
                    description: editableDescription,
                    steps: mapToCourseSteps(dataSource),
                };

                issueCommand({ id: courseId, command })
                    .unwrap()
                    .then((res) => {
                        console.log('Success!', res);
                        setIsDraft(!isDraft);
                    })
                    .catch((err) => {
                        console.error('Err: ', err);
                    });
            },
            type: 'default',
        },
    ];

    if (isDraft) {
        actions = actions.concat([
            {
                text: 'Zapisz',
                type: editedButNotSaved ? 'primary' : 'default',
                onClick: () => {
                    const command = {
                        type: Enums.COMMAND_TYPES.UPDATE_COURSE,
                        description: editableDescription,
                        steps: mapToCourseSteps(dataSource),
                    };

                    issueCommand({ id: courseId, command })
                        .unwrap()
                        .then((res) => {
                            console.log('Success!: ', res);
                            setEditedButNotSaved(false);
                        })
                        .catch((err) => {
                            console.log('Err: ', err);
                        });
                },
            },
        ]);
    }

    if (!isLoading && isSuccess) {
        return (
            <Card
                title={
                    <CardHeader
                        title={
                            isDraft
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
                        onChange: handleDescriptionChange,
                    }}
                >
                    {editableDescription}
                </Paragraph>
                <CourseEditStepsList
                    editable={isDraft}
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
