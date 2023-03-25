import { Table, Button, Dropdown, Space } from 'antd';
import React, { useState } from 'react';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import type { ColumnsType } from 'antd/es/table';
import CourseEditStepRow from '../../components/courses/CourseEditStepRow';
import {
    DownOutlined,
    DeleteTwoTone,
    FileDoneOutlined,
    ReadOutlined,
} from '@ant-design/icons';
import { useGetCourseComponentsQuery } from '../../features/courses/coursesApi';
import { Enums } from '../../shared';
import type { MenuProps } from 'antd';
import { CourseComponentType, CourseStepType } from '../../types/course';
import {
    TEXT_ADD_STEP,
    TEXT_AUTOMATIC,
    TEXT_DESCRIPTION,
    TEXT_EVALUATION,
    TEXT_EXERCISES,
    TEXT_MANUALLY,
    TEXT_SEND_FILE,
    TEXT_TITLE,
    TEXT_VERIFICATION,
} from '../../texts';

const contentTypeToIconMap = {
    [Enums.COURSE_STEP_COMPONENT_TYPES.EXERCISE]: <ReadOutlined />,
    [Enums.COURSE_STEP_COMPONENT_TYPES.FILE_EVALUATION]: <FileDoneOutlined />,
};

const contentTypeToGroupTitleMap = {
    [Enums.COURSE_STEP_COMPONENT_TYPES.EXERCISE]: TEXT_EXERCISES,
    [Enums.COURSE_STEP_COMPONENT_TYPES.FILE_EVALUATION]: TEXT_VERIFICATION,
};

const evaluationTypeKeyToNameMap: { [key: string]: string } = {
    [Enums.COURSE_STEP_EVALUATION_TYPES.SELF_EVALUATED]: TEXT_AUTOMATIC,
    [Enums.COURSE_STEP_EVALUATION_TYPES.FILE_EVALUATED]: TEXT_SEND_FILE,
    [Enums.COURSE_STEP_EVALUATION_TYPES.TEACHER_EVALUATED]: TEXT_MANUALLY,
};

const CourseEditStepsList = ({
    dataSource,
    setDataSource,
    setEditedButNotSaved,
    editable,
}) => {
    const { data: availableSteps } = useGetCourseComponentsQuery(
        'course-components-catalog'
    );
    const [count, setCount] = useState(dataSource.length);

    const onDragEnd = ({ active, over }: DragEndEvent) => {
        console.log(active, over);
        if (active.id !== over?.id) {
            setDataSource((previous: Array<CourseStepType>) => {
                const activeIndex = previous.findIndex(
                    (i: CourseStepType) => i.order === active.id
                );
                const overIndex = previous.findIndex(
                    (i: CourseStepType) => i.order === over?.id
                );
                return arrayMove(previous, activeIndex, overIndex);
            });
        }
        setEditedButNotSaved(true);
    };

    const handleAdd = (clickEvent) => {
        const chosenElement: CourseComponentType = availableSteps.find(
            (availableSteps) => availableSteps.uuid == clickEvent.key
        );

        const newData: CourseStepType = {
            evaluation_type: Enums.COURSE_STEP_EVALUATION_TYPES.SELF_EVALUATED,
            component: chosenElement,
            user_progress: null,
            order: dataSource.length + 1,
        };

        setDataSource([...dataSource, newData]);
        setCount(count + 1);
        setEditedButNotSaved(true);
    };

    const handleRemove = (key: string) => {
        const newData = dataSource.filter(
            (item: CourseStepType) => item.component.uuid !== key
        );
        setDataSource(newData);
        setEditedButNotSaved(true);
    };

    const isAvailable = (item: CourseComponentType) => {
        return dataSource.find(
            (element: CourseStepType) => element.component.uuid === item.uuid
        );
    };

    const mapToDropdown = (items: Array<CourseComponentType>) => {
        if (items) {
            const groupedItems = items?.reduce((acc, item) => {
                if (!acc[item.type]) {
                    acc[item.type] = {
                        type: 'group',
                        label: contentTypeToGroupTitleMap[item.type],
                        children: [],
                    };
                }
                acc[item.type].children.push({
                    label: item.title,
                    icon: contentTypeToIconMap[item.type],
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

    const updateEvaluationType = (itemUUID, evaluationType) => {
        // Create a new array by mapping over the dataSource and updating the evaluationType for the specified itemUUID
        const updatedDataSource = dataSource.map((item) => {
            if (item.uuid === itemUUID) {
                // Update the evaluationType for the item with the specified UUID
                return {
                    ...item,
                    evaluation_type: evaluationType,
                };
            }
            return item;
        });

        setDataSource(updatedDataSource);
        setEditedButNotSaved(true);
    };

    const columns: ColumnsType<CourseStepType> = [
        {
            key: editable ? 'sort' : 'component',
            render: (_, item) =>
                item.component.type ===
                    Enums.COURSE_STEP_COMPONENT_TYPES.FILE_EVALUATION && (
                    <FileDoneOutlined />
                ),
        },
        {
            title: TEXT_TITLE,
            render: (_, item) => item.component.title,
        },
        {
            title: TEXT_DESCRIPTION,
            render: (_, item) => item.component.description,
        },
        {
            title: TEXT_EVALUATION,
            render: (_, item) => {
                const items: MenuProps['items'] = Object.entries(
                    evaluationTypeKeyToNameMap
                ).map(([key, value]) => ({ key, label: value }));

                const onClick = (e) => {
                    updateEvaluationType(item.component.uuid, e.key);
                };

                return (
                    <Dropdown menu={{ items, onClick }}>
                        <Button block>
                            {
                                evaluationTypeKeyToNameMap[
                                    item.evaluation_type || ''
                                ]
                            }
                            <DownOutlined />
                        </Button>
                    </Dropdown>
                );
            },
        },

        {
            dataIndex: 'operation',
            render: (_, item) => {
                return (
                    editable && (
                        <DeleteTwoTone
                            onClick={() => handleRemove(item.component.uuid)}
                        />
                    )
                );
            },
        },
    ];

    return (
        <>
            <DndContext onDragEnd={onDragEnd}>
                <SortableContext
                    items={dataSource.map((i: CourseStepType) => i.order)}
                    strategy={verticalListSortingStrategy}
                >
                    <Table
                        components={{
                            body: {
                                row: CourseEditStepRow,
                            },
                        }}
                        rowKey="order"
                        columns={columns}
                        dataSource={dataSource}
                        rowClassName={(row, index) => {
                            return row.component.type ===
                                Enums.COURSE_STEP_COMPONENT_TYPES
                                    .FILE_EVALUATION
                                ? 'blue-table-row'
                                : '';
                        }}
                    />
                </SortableContext>
            </DndContext>
            {editable && (
                <>
                    <Space />
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
                </>
            )}
        </>
    );
};

export default CourseEditStepsList;
