import { Table, Button, Dropdown, Space, Menu } from 'antd';
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
import { CourseComponentItemType } from '../../types/course';

const contentTypeToIconMap = {
    [Enums.COURSE_STEP_CONTENT_TYPES.EXERCISE]: <ReadOutlined />,
    [Enums.COURSE_STEP_CONTENT_TYPES.FILE_EVALUATION_TYPE]: (
        <FileDoneOutlined />
    ),
};

const contentTypeToGroupTitleMap = {
    [Enums.COURSE_STEP_CONTENT_TYPES.EXERCISE]: 'Ćwiczenia',
    [Enums.COURSE_STEP_CONTENT_TYPES.FILE_EVALUATION_TYPE]: 'Weryfikacja',
};

const evaluationTypeKeyToNameMap: { [key: string]: string } = {
    [Enums.COURSE_STEP_EVALUATION_TYPES.SELF_EVALUATED]: 'automatyczne',
    [Enums.COURSE_STEP_EVALUATION_TYPES.FILE_EVALUATED]: 'przesłanie pliku',
    [Enums.COURSE_STEP_EVALUATION_TYPES.TEACHER_EVALUATED]: 'ręcznie',
    [Enums.COURSE_STEP_EVALUATION_TYPES.TEST_EVALUATED]: 'quiz',
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
        if (active.id !== over?.id) {
            setDataSource((previous: Array<CourseComponentItemType>) => {
                const activeIndex = previous.findIndex(
                    (i: CourseComponentItemType) => i.uuid === active.id
                );
                const overIndex = previous.findIndex(
                    (i: CourseComponentItemType) => i.uuid === over?.id
                );
                return arrayMove(previous, activeIndex, overIndex);
            });
        }
        setEditedButNotSaved(true);
    };

    const handleAdd = (clickEvent) => {
        const chosenElement = availableSteps.find(
            (availableSteps) => availableSteps.uuid == clickEvent.key
        );

        const newData: CourseComponentItemType = {
            uuid: chosenElement.uuid,
            title: chosenElement.title,
            description: chosenElement.description,
            content_type: chosenElement.content_type,
            evaluation_type: null,
        };

        setDataSource([...dataSource, newData]);
        setCount(count + 1);
        setEditedButNotSaved(true);
    };

    const handleRemove = (key: string) => {
        const newData = dataSource.filter(
            (item: CourseComponentItemType) => item.uuid !== key
        );
        setDataSource(newData);
        setEditedButNotSaved(true);
    };

    const isAvailable = (item: CourseComponentItemType) => {
        return dataSource.find(
            (element: CourseComponentItemType) => element.uuid === item.uuid
        );
    };

    const mapToDropdown = (items: Array<CourseComponentItemType>) => {
        if (items) {
            const groupedItems = items?.reduce((acc, item) => {
                if (!acc[item.content_type]) {
                    acc[item.content_type] = {
                        type: 'group',
                        label: contentTypeToGroupTitleMap[item.content_type],
                        children: [],
                    };
                }
                acc[item.content_type].children.push({
                    label: item.title,
                    icon: contentTypeToIconMap[item.content_type],
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

    const columns: ColumnsType<CourseComponentItemType> = [
        {
            key: editable ? 'sort' : 'uuid',
            render: (_, item) =>
                item.content_type ===
                    Enums.COURSE_STEP_CONTENT_TYPES.FILE_EVALUATION_TYPE && (
                    <FileDoneOutlined />
                ),
        },
        {
            title: 'Tytuł',
            dataIndex: 'title',
        },
        {
            title: 'Opis',
            dataIndex: 'description',
        },
        {
            title: 'Zaliczenie',
            render: (_, item) => {
                const items: MenuProps['items'] = Object.entries(
                    evaluationTypeKeyToNameMap
                ).map(([key, value]) => ({ key, label: value }));

                const onClick = (e) => {
                    updateEvaluationType(item.uuid, e.key);
                };

                return (
                    <Dropdown menu={{ items, onClick }} trigger={['click']}>
                        <Button>
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
                            onClick={() => handleRemove(item.uuid)}
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
                    items={dataSource.map(
                        (i: CourseComponentItemType) => i.uuid
                    )}
                    strategy={verticalListSortingStrategy}
                >
                    <Table
                        components={{
                            body: {
                                row: CourseEditStepRow,
                            },
                        }}
                        rowKey="uuid"
                        columns={columns}
                        dataSource={dataSource}
                        rowClassName={(row, index) => {
                            return row.content_type ===
                                Enums.COURSE_STEP_CONTENT_TYPES
                                    .FILE_EVALUATION_TYPE
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
                                Dodaj
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
