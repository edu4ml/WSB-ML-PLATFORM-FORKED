import { Button, Dropdown, Space } from 'antd';
import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { useGetCourseComponentsQuery } from '../../features/courses/coursesApi';
import { Enums } from '../../shared';
import type { MenuProps } from 'antd';
import { CourseComponentType, CourseStepType } from '../../types/course';
import { TEXT_ADD_STEP } from '../../texts';
import {
    getContentTypeIcon,
    getContentTypeName,
} from '../../helpers/namesFactory';

const CourseEditStepsListDropdownAdd = ({ steps, onUpdateSteps }) => {
    const { data: availableSteps } = useGetCourseComponentsQuery(
        'course-components-catalog'
    );

    const handleAdd = (clickEvent) => {
        const [count, setCount] = useState(steps.length);

        const chosenElement: CourseComponentType = availableSteps.find(
            (availableSteps) => availableSteps.uuid == clickEvent.key
        );

        const newData: CourseStepType = {
            evaluation_type: Enums.COURSE_STEP_EVALUATION_TYPE.SELF_EVALUATED,
            component: chosenElement,
            user_progress: null,
            order: steps.length + 1,
        };

        onUpdateSteps([...steps, newData]);
        setCount(count + 1);
    };

    const isAvailable = (item: CourseComponentType) => {
        return steps.find(
            (element: CourseStepType) => element.component.uuid === item.uuid
        );
    };

    const mapToDropdown = (items: Array<CourseComponentType>) => {
        if (items) {
            const groupedItems = items?.reduce((acc, item) => {
                if (!acc[item.type]) {
                    acc[item.type] = {
                        type: 'group',
                        label: getContentTypeName(item.type),
                        children: [],
                    };
                }
                acc[item.type].children.push({
                    label: item.title,
                    icon: getContentTypeIcon(item.type),
                    key: item.uuid,
                    disabled: isAvailable(item),
                });
                return acc;
            }, {});

            const groupedItemsArray: MenuProps['items'] =
                Object.values(groupedItems);
            return groupedItemsArray;
        }
        return [];
    };
    return (
        <Dropdown
            menu={{
                items: mapToDropdown(availableSteps),
                onClick: handleAdd,
            }}
        >
            <Button block type="primary">
                <Space>
                    {TEXT_ADD_STEP}
                    <DownOutlined />
                </Space>
            </Button>
        </Dropdown>
    );
};

export default CourseEditStepsListDropdownAdd;
