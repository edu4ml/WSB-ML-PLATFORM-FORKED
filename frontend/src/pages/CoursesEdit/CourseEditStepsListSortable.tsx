import { Table, Button, Dropdown } from 'antd';
import React from 'react';
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
import { Enums } from '../../shared';
import type { MenuProps } from 'antd';
import { CourseStepType } from '../../types/course';
import {
    TEXT_AUTOMATIC,
    TEXT_DESCRIPTION,
    TEXT_EVALUATION,
    TEXT_EXERCISES,
    TEXT_SEND_FILE,
    TEXT_TITLE,
    TEXT_VERIFICATION,
} from '../../texts';

const evaluationTypeKeyToNameMap: { [key: string]: string } = {
    [Enums.COURSE_STEP_EVALUATION_TYPE.SELF_EVALUATED]: TEXT_AUTOMATIC,
    [Enums.COURSE_STEP_EVALUATION_TYPE.FILE_EVALUATED]: TEXT_SEND_FILE,
};

const CourseEditStepsListSortable = ({ steps, onUpdateSteps }) => {
    const handleRemove = (key: string) => {
        const newData = steps.filter(
            (item: CourseStepType) => item.component.uuid !== key
        );
        onUpdateSteps(newData);
    };

    const updateEvaluationType = (itemOrder, evaluationType) => {
        // Create a new array by mapping over the dataSource and updating the evaluationType for the specified itemUUID
        const updatedDataSource = steps.map((item) => {
            if (item.order === itemOrder) {
                // Update the evaluationType for the item with the specified UUID
                return {
                    ...item,
                    evaluation_type: evaluationType,
                };
            }
            return item;
        });

        onUpdateSteps(updatedDataSource);
    };

    const columns: ColumnsType<CourseStepType> = [
        {
            key: 'sort',
            render: (_, item) =>
                item.component.type ===
                    Enums.COURSE_COMPONENT_TYPE.EVALUATION && (
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
                    updateEvaluationType(item.order, e.key);
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
            render: (_, item) => (
                <DeleteTwoTone
                    onClick={() => handleRemove(item.component.uuid)}
                />
            ),
        },
    ];

    const onDragEnd = ({ active, over }: DragEndEvent) => {
        if (active.id !== over?.id) {
            onUpdateSteps((previous: Array<CourseStepType>) => {
                const activeIndex = previous.findIndex(
                    (i: CourseStepType) => i.order === active.id
                );
                const overIndex = previous.findIndex(
                    (i: CourseStepType) => i.order === over?.id
                );
                return arrayMove(previous, activeIndex, overIndex);
            });
        }
    };

    return (
        <DndContext onDragEnd={onDragEnd}>
            <SortableContext
                items={steps.map((i: CourseStepType) => i.order)}
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
                    dataSource={steps}
                    rowClassName={(row, index) => {
                        return row.component.type ===
                            Enums.COURSE_COMPONENT_TYPE.EVALUATION
                            ? 'blue-table-row'
                            : '';
                    }}
                />
            </SortableContext>
        </DndContext>
    );
};

export default CourseEditStepsListSortable;
