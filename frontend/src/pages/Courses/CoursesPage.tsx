import { List, Typography } from 'antd';
import React from 'react';
import CourseList from '../../components/courses/CourseList';

interface CourseList {
    title: string;
    logo: string;
    content: string;
}

const courses = [
    {
        title: 'Introduction to Machine Learning',
        logo: 'https://picsum.photos/200/200',
        content:
            'This course provides an introduction to machine learning, which is the study of computer algorithms that can improve automatically through experience.',
    },
    {
        title: 'Deep Learning Fundamentals',
        logo: 'https://picsum.photos/200/200',
        content:
            'This course covers the fundamentals of deep learning, which is a subfield of machine learning that uses neural networks with multiple layers to learn representations of data.',
    },
    {
        title: 'Machine Learning with Python',
        logo: 'https://picsum.photos/200/200',
        content:
            'This course provides an overview of machine learning with Python, which is a popular programming language used in data science and machine learning.',
    },
    {
        title: 'Advanced Machine Learning',
        logo: 'https://picsum.photos/200/200',
        content:
            'This course covers advanced topics in machine learning, including deep reinforcement learning, generative models, and transfer learning.',
    },
    {
        title: 'Natural Language Processing',
        logo: 'https://picsum.photos/200/200',
        content:
            'This course teaches you how to use machine learning techniques to process and analyze natural language data, such as text and speech.',
    },
    {
        title: 'Computer Vision',
        logo: 'https://picsum.photos/200/200',
        content:
            'This course teaches you how to use machine learning techniques to analyze and interpret visual data, such as images and videos.',
    },
    {
        title: 'Reinforcement Learning',
        logo: 'https://picsum.photos/200/200',
        content:
            'This course teaches you how to use machine learning techniques to build intelligent agents that can learn from their environment through trial and error.',
    },
    {
        title: 'Time Series Analysis',
        logo: 'https://picsum.photos/200/200',
        content:
            'This course teaches you how to use machine learning techniques to analyze and predict time series data, such as stock prices and weather patterns.',
    },
    {
        title: 'Bayesian Machine Learning',
        logo: 'https://picsum.photos/200/200',
        content:
            'This course teaches you how to use Bayesian statistical methods to build machine learning models that can make more accurate predictions and estimations.',
    },
    {
        title: 'Unsupervised Learning',
        logo: 'https://picsum.photos/200/200',
        content:
            'This course teaches you how to use machine learning techniques to learn from data without explicit supervision or labels, and how to apply these techniques to clustering and dimensionality reduction problems.',
    },
    {
        title: 'Big Data Analytics',
        logo: 'https://picsum.photos/200/200',
        content:
            'This course teaches you how to use machine learning techniques to analyze and extract insights from large-scale datasets, and how to use distributed computing tools such as Apache Hadoop and Spark to handle big data challenges.',
    },
    {
        title: 'Model Interpretability and Explainability',
        logo: 'https://picsum.photos/200/200',
        content:
            "This course teaches you how to build machine learning models that are interpretable and explainable, and how to use techniques such as feature importance analysis and counterfactual explanations to better understand and communicate your model's behavior.",
    },
];

const CoursesPage = () => {
    return <CourseList courses={courses} />;
};

export default CoursesPage;
