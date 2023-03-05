import React from 'react';
import { Divider, Dropdown, List, Space, Table, Tag } from 'antd';
import { CheckCircleTwoTone, ClockCircleTwoTone } from '@ant-design/icons';

interface ExerciseItem {
    id: number;
    title: string;
    description: string;
    is_completed: boolean;
}
const items = [
    { key: '1', label: 'Action 1' },
    { key: '2', label: 'Action 2' },
];

const getStatusTag = (row: ExerciseItem) => {
    console.log(row);
    if (row.is_completed) {
        return (
            <span>
                <Tag color="green">{'Ukończono'}</Tag>
            </span>
        );
    } else {
        return (
            <span>
                <Tag color="geekblue">{'W trakcie'}</Tag>
            </span>
        );
    }
};

const columns = [
    { title: 'Nazwa ćwiczenia', dataIndex: 'title', key: 'title' },
    { title: 'Opis', dataIndex: 'description', key: 'description' },
    {
        title: 'Status',
        key: 'is_completed',
        render: getStatusTag,
    },
    // {
    //     title: 'Action',
    //     dataIndex: 'operation',
    //     key: 'operation',
    //     render: () => (
    //         <Space size="middle">
    //             <a>Pause</a>
    //             <a>Stop</a>
    //             <Dropdown menu={{ items }}>
    //                 <a>
    //                     More <DownOutlined />
    //                 </a>
    //             </Dropdown>
    //         </Space>
    //     ),
    // },
];

const expandedRowRender = ({ resources, requirements }) => {
    const resourcesColumns = [
        { title: 'Resource', dataIndex: 'description', key: 'resource' },
        { title: 'Url', dataIndex: 'url', key: 'url' },
    ];

    const requirementsColumns = [
        { title: 'Type', dataIndex: 'type', key: 'type' },
        {
            title: 'passed',
            dataIndex: 'passed',
            key: 'passed',
            render: (value) => {
                if (value) {
                    return <CheckCircleTwoTone twoToneColor="#b7eb8f" />;
                } else {
                    return <ClockCircleTwoTone />;
                }
            },
        },
    ];

    return (
        <>
            <Table
                rowKey="url"
                columns={resourcesColumns}
                dataSource={resources}
                pagination={false}
            />
            <Divider />
            <Table
                rowKey="url"
                columns={requirementsColumns}
                dataSource={requirements}
                pagination={false}
            />
        </>
    );
};

const ExerciseList = ({ exercises }) => {
    return (
        <Table
            rowKey="id"
            columns={columns}
            expandable={{ expandedRowRender }}
            dataSource={exercises}
        />
        // <List
        //     itemLayout="horizontal"
        //     size="large"
        //     pagination={{ pageSize: 5 }}
        //     dataSource={exercises}
        //     renderItem={(item: ExerciseItem) => {
        //         return (
        //             <List.Item key={item.title}>
        //                 <List.Item.Meta
        //                     title={item.title}
        //                     description={item.description}
        //                 />
        //             </List.Item>
        //         );
        //     }}
        // ></List>
    );
};

export default ExerciseList;
