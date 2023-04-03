import { Card, Table, Dropdown, Menu, Typography } from 'antd';
import React from 'react';
import { DownOutlined } from '@ant-design/icons';

const { Text } = Typography;

const SubmissionsInbox = ({ submissions }) => {
    const handleMenuClick = (record, e) => {
        if (e.key === 'download') {
            window.open(record.file_link, '_blank', 'noopener noreferrer');
        } else if (e.key === 'approve') {
            console.log('Approve', record);
            // Implement approve action here
        } else if (e.key === 'reject') {
            console.log('Reject', record);
            // Implement reject action here
        }
    };

    const menu = (record) => (
        <Menu onClick={(e) => handleMenuClick(record, e)}>
            <Menu.Item key="download">Download</Menu.Item>
            <Menu.Item key="approve">Approve</Menu.Item>
            <Menu.Item key="reject">Reject</Menu.Item>
        </Menu>
    );

    const columns = [
        {
            title: 'Student',
            dataIndex: 'user',
            key: 'user',
            render: (user) => <Text>{user.email}</Text>,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Course Component',
            dataIndex: 'course_component',
            key: 'course_component',
            render: (course_component) => <Text>{course_component.title}</Text>,
        },
        {
            title: 'Course',
            dataIndex: 'course',
            key: 'course',
            render: (course) => <Text>{course.title}</Text>,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'File',
            dataIndex: 'file_link',
            key: 'file_link',
            render: (text) => (
                <a href={text} target="_blank" rel="noopener noreferrer">
                    Download
                </a>
            ),
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'action',
            render: (_, record) => (
                <Dropdown overlay={menu(record)} trigger={['click']}>
                    <a
                        className="ant-dropdown-link"
                        onClick={(e) => e.preventDefault()}
                    >
                        Actions <DownOutlined />
                    </a>
                </Dropdown>
            ),
        },
    ];

    console.log(submissions);

    return (
        <Card title={'Prace do sprawdzenia'}>
            <Table columns={columns} dataSource={submissions} rowKey={'uuid'} />
        </Card>
    );
};

export default SubmissionsInbox;
