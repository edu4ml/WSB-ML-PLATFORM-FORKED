import React from 'react';
import { Button, Col, List, Progress, Row } from 'antd';
import { useIssueCourseCommandMutation } from '../../features/courses/coursesApi';
import { useGetUserProfileQuery } from '../../features/auth/authApi';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

interface CourseItem {
    id: number;
    title: string;
    logo: string;
    description: string;
    progress: number;
    is_enrolled: boolean;
    is_draft: boolean;
}

const CourseList = ({ courses }) => {
    const [issueCourseCommand, {}] = useIssueCourseCommandMutation();
    const { data: userData } = useGetUserProfileQuery('userDetails');
    const navigate = useNavigate();

    const command = {
        type: 'ENROLL_FOR_COURSE',
        user_id: userData.pk,
    };

    return (
        <List
            itemLayout="vertical"
            size={'large'}
            pagination={{ pageSize: 10 }}
            dataSource={courses}
            renderItem={(item: CourseItem) => {
                const titleWithProgress = (item: CourseItem) => {
                    if (item.is_enrolled && !item.is_draft) {
                        return (
                            <Row>
                                <Col span={16}>
                                    <Link to={`/courses/${item.id}`}>
                                        {item.title}
                                    </Link>
                                </Col>
                                <Col span={8}>
                                    <Progress percent={item.progress} />
                                </Col>
                            </Row>
                        );
                    } else {
                        return (
                            <span>
                                {item.title}{' '}
                                {item.is_draft && '(Wersja robocza)'}
                            </span>
                        );
                    }
                };

                const enrollButton = (item: CourseItem) => {
                    if (item.is_enrolled) {
                        return [];
                    } else {
                        return [
                            <Button
                                onClick={() => {
                                    issueCourseCommand({
                                        id: item.id,
                                        command: command,
                                    });
                                }}
                                style={{ width: '100%' }}
                            >
                                Dołącz do kursu
                            </Button>,
                            <Button
                                onClick={() => {
                                    navigate(`/courses/${item.id}/edit`);
                                }}
                                style={{ width: '100%' }}
                            >
                                {item.is_draft ? 'Edytuj' : 'Szczegóły'}
                            </Button>,
                        ];
                    }
                };

                return (
                    <List.Item key={item.title} actions={enrollButton(item)}>
                        <List.Item.Meta
                            title={titleWithProgress(item)}
                            description={item.description}
                        />
                    </List.Item>
                );
            }}
        />
    );
};

export default CourseList;
