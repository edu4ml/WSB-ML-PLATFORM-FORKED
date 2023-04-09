import { List } from 'antd';
import React from 'react';
import ComponentItem from './componentItem';

const ComponentsList = ({ components }) => {
    return (
        <List
            bordered={false}
            dataSource={components}
            data-cy="course-components-list"
            size="large"
            renderItem={(component) => <ComponentItem component={component} />}
            pagination={{ pageSize: 10 }}
        />
    );
};

export default ComponentsList;
