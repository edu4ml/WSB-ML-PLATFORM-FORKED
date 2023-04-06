import React, { useState } from 'react';
import { Button, Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useGetComponentListQuery } from '../../features/courses/coursesApi';
import { Enums } from '../../shared';
import type { MenuProps } from 'antd';
import { ComponentType, CourseStepType } from '../../types/course';
import {
    getContentTypeIcon,
    getContentTypeName,
} from '../../helpers/namesFactory';
import { CATEGORY_BUTTON_TEXTS } from '../../texts';

const CourseEditStepsListDropdownAdd = ({ steps, onUpdateSteps }) => {
    const [count, setCount] = useState(steps.length);

    const { data: availableSteps } = useGetComponentListQuery(
        'course-components-catalog'
    );

    const handleAdd = (clickEvent) => {
        const chosenElement: ComponentType = availableSteps.find(
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

    const isAvailable = (item: ComponentType) => {
        return steps.find(
            (element: CourseStepType) => element.component.uuid === item.uuid
        );
    };

    const mapToDropdown = (items: Array<ComponentType>) => {
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
            <Button
                data-cy="course-details-add-steps-dropdown"
                block
                type="primary"
            >
                <Space>
                    {CATEGORY_BUTTON_TEXTS.addStep}
                    <DownOutlined />
                </Space>
            </Button>
        </Dropdown>
    );
};

export default CourseEditStepsListDropdownAdd;
