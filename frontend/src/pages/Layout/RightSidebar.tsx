import { Card, Space } from 'antd';
import React from 'react';
import EvaluationsInboxList from '../../components/reports/EvaluationsInboxList';

interface Message {
    id: string;
    sender: string;
    recipient: string;
    subject: string;
    body: string;
    date: Date;
    isRead: boolean;
}

interface Resource {
    title: string;
    description: string;
    url: string;
    author: string;
}

const resources: Resource[] = [
    {
        title: 'Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow',
        description:
            'A practical guide to machine learning with Python, covering the fundamentals of Scikit-Learn, Keras, and TensorFlow.',
        url: 'https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/',
        author: 'Aurélien Géron',
    },
    {
        title: 'Deep Learning',
        description:
            'An introduction to deep learning, covering neural networks, convolutional neural networks, and recurrent neural networks.',
        url: 'https://www.deeplearningbook.org/',
        author: 'Ian Goodfellow, Yoshua Bengio, and Aaron Courville',
    },
    {
        title: 'The Hundred-Page Machine Learning Book',
        description:
            'A concise guide to machine learning, covering the fundamentals of supervised and unsupervised learning, deep learning, and reinforcement learning.',
        url: 'https://www.amazon.com/Hundred-Page-Machine-Learning-Book/dp/199957950X',
        author: 'Andriy Burkov',
    },
    {
        title: 'Fast.ai',
        description:
            'A practical course on deep learning, covering computer vision, natural language processing, and tabular data.',
        url: 'https://www.fast.ai/',
        author: 'Jeremy Howard and Rachel Thomas',
    },
    {
        title: 'CS231n: Convolutional Neural Networks for Visual Recognition',
        description:
            'A course on deep learning for computer vision, covering convolutional neural networks, recurrent neural networks, and generative models.',
        url: 'http://cs231n.stanford.edu/',
        author: 'Fei-Fei Li, Justin Johnson, and Serena Yeung',
    },
    {
        title: 'Kaggle',
        description:
            'A platform for data science competitions and machine learning projects, featuring a community of data scientists and machine learning practitioners.',
        url: 'https://www.kaggle.com/',
        author: 'Kaggle',
    },
];
const renderMessages = () => {
    return resources.map((resource) => (
        <Card>
            <Card.Meta
                title={resource.title}
                description={resource.description}
            />
        </Card>
    ));
};

const RightSidebar = () => {
    // return <EvaluationsInboxList />;
    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            {renderMessages()}
        </Space>
    );
};

export default RightSidebar;
