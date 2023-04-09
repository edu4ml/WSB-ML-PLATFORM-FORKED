import { Card, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import PageTitle from '../../common/PageTitle';
import { useTranslation } from 'react-i18next';
import { useGetCourseDetailQuery } from '../../../features/courses/coursesApi';
import { useNavigate, useParams } from 'react-router';
import CourseDescription from '../components/courseDescription';
import getActions, { AddComponentButton } from '../actions/courseEditActions';
import CourseEditableSteps from '../components/courseEditableSteps';

const CourseEdit = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { courseId } = useParams();
    const { data: course } = useGetCourseDetailQuery(courseId);
    const [courseSteps, setCourseSteps] = useState([]);
    const [courseDescription, setCourseDescription] = useState('');

    const courseSubtitle = course?.is_draft && t('Draft');

    useEffect(() => {
        if (course) {
            setCourseDescription(course.description);
            setCourseSteps(course.steps);

            if (!course.is_draft) {
                navigate(`/app/courses/`);
            }
        }
    }, [course]);

    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <PageTitle
                title={`${t('Edit Course ')}: ${course?.title}`}
                actions={getActions({
                    uuid: courseId as string,
                    steps: courseSteps,
                    description: courseDescription,
                })}
                subtitle={courseSubtitle}
            />
            <CourseDescription
                description={courseDescription}
                editable={{
                    onChange: setCourseDescription,
                }}
            />
            <Card>
                <CourseEditableSteps
                    onStepsUpdate={setCourseSteps}
                    steps={courseSteps}
                />
                <AddComponentButton
                    steps={courseSteps}
                    onStepsUpdate={setCourseSteps}
                />
            </Card>
        </Space>
    );
};

export default CourseEdit;
