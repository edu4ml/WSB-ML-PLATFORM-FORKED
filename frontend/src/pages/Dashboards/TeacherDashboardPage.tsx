import { Card, Space } from 'antd';
import React from 'react';
import CoursesProgressList from '../../components/reports/CoursesProgressList';
import EvaluationsInboxList from '../../components/reports/EvaluationsInboxList';
import { useGetTeacherReportQuery } from '../../features/reports/reportsApi';

const evaluations = [
    {
        title: 'Machine Learning Fundamentals',
        students: [
            {
                email: 'student01@example.com',
                evaluations: [
                    {
                        title: 'Midterm Exam',
                        type: 'Exam',
                        link: 'http://example.com/midterm.pdf',
                    },
                    {
                        title: 'Homework 1',
                        type: 'Assignment',
                        link: 'http://example.com/homework1.pdf',
                    },
                    {
                        title: 'Homework 2',
                        type: 'Assignment',
                        link: 'http://example.com/homework2.pdf',
                    },
                ],
            },
            {
                email: 'student02@example.com',
                evaluations: [
                    {
                        title: 'Final Exam',
                        type: 'Exam',
                        link: 'http://example.com/final.pdf',
                    },
                    {
                        title: 'Project Presentation',
                        type: 'Presentation',
                        link: 'http://example.com/presentation.pdf',
                    },
                ],
            },
        ],
    },
    {
        title: 'Data Science Essentials',
        students: [
            {
                email: 'student03@example.com',
                evaluations: [
                    {
                        title: 'Quiz 1',
                        type: 'Quiz',
                        link: 'http://example.com/quiz1.pdf',
                    },
                    {
                        title: 'Homework 1',
                        type: 'Assignment',
                        link: 'http://example.com/homework1.pdf',
                    },
                ],
            },
            {
                email: 'student04@example.com',
                evaluations: [
                    {
                        title: 'Quiz 2',
                        type: 'Quiz',
                        link: 'http://example.com/quiz2.pdf',
                    },
                    {
                        title: 'Project Report',
                        type: 'Report',
                        link: 'http://example.com/report.pdf',
                    },
                    {
                        title: 'Final Exam',
                        type: 'Exam',
                        link: 'http://example.com/final.pdf',
                    },
                ],
            },
        ],
    },
    {
        title: 'Web Development Bootcamp',
        students: [
            {
                email: 'student05@example.com',
                evaluations: [
                    {
                        title: 'Assignment 1',
                        type: 'Assignment',
                        link: 'http://example.com/assignment1.pdf',
                    },
                    {
                        title: 'Assignment 2',
                        type: 'Assignment',
                        link: 'http://example.com/assignment2.pdf',
                    },
                    {
                        title: 'Midterm Exam',
                        type: 'Exam',
                        link: 'http://example.com/midterm.pdf',
                    },
                ],
            },
            {
                email: 'student06@example.com',
                evaluations: [
                    {
                        title: 'Assignment 3',
                        type: 'Assignment',
                        link: 'http://example.com/assignment3.pdf',
                    },
                    {
                        title: 'Project Presentation',
                        type: 'Presentation',
                        link: 'http://example.com/presentation.pdf',
                    },
                    {
                        title: 'Final Exam',
                        type: 'Exam',
                        link: 'http://example.com/final.pdf',
                    },
                ],
            },
        ],
    },
];

const TeacherDashboardPage = () => {
    const { data: report, isSuccess } =
        useGetTeacherReportQuery('teacher-report');

    return isSuccess ? (
        <Space direction="vertical" style={{ width: '100%' }} size={16}>
            <Card title={'Prace oczekujące na sprawdzenie'} bordered>
                <EvaluationsInboxList evaluations={evaluations} />
            </Card>
            <Card title={'Progress studentów w kursach'} bordered>
                <CoursesProgressList courses={report.courses} />
            </Card>
            <Card title={'Kursy w edycji'} bordered>
                Jakie kursy edytujesz
            </Card>
        </Space>
    ) : (
        <div></div>
    );
};

export default TeacherDashboardPage;
