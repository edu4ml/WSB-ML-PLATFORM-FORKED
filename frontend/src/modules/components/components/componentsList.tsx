import { List } from 'antd';
import React from 'react';
import ComponentItem from './componentItem';
import { ComponentType } from '../../../types/course';

const ComponentsList = ({ components }) => {
    return (
        <List
            bordered={false}
            dataSource={components}
            data-cy="course-components-list"
            size="large"
            renderItem={(component: ComponentType) => (
                <ComponentItem key={component.uuid} component={component} />
            )}
            pagination={{ pageSize: 10 }}
        />
    );
};

export default ComponentsList;
