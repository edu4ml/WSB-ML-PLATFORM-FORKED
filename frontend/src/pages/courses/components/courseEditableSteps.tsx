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
import { useTranslation } from 'react-i18next';
import {
    DownOutlined,
    DeleteTwoTone,
    FileDoneOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Enums } from '../../../shared';
import { CourseStepType } from '../../../types/course';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MenuOutlined } from '@ant-design/icons';

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    'data-row-key': string;
}

const CourseEditStepRow = ({ children, ...props }: RowProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: props['data-row-key'],
    });

    const style: React.CSSProperties = {
        ...props.style,
        transform: CSS.Transform.toString(
            transform && { ...transform, scaleY: 1 }
        ),
        transition,
        ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
    };

    return (
        <tr {...props} ref={setNodeRef} style={style} {...attributes}>
            {React.Children.map(children, (child) => {
                if ((child as React.ReactElement).key === 'sort') {
                    return React.cloneElement(child as React.ReactElement, {
                        children: (
                            <MenuOutlined
                                ref={setActivatorNodeRef}
                                style={{ touchAction: 'none', cursor: 'move' }}
                                {...listeners}
                            />
                        ),
                    });
                }
                return child;
            })}
        </tr>
    );
};

const CourseEditableSteps = ({ steps, onStepsUpdate }) => {
    const { t } = useTranslation();

    const evaluationTypeKeyToNameMap: { [key: string]: string } = {
        [Enums.COURSE_STEP_EVALUATION_TYPE.SELF_EVALUATED]: t(
            'component type self evaluation'
        ),
        [Enums.COURSE_STEP_EVALUATION_TYPE.FILE_EVALUATED]: t(
            'component type file evaluation'
        ),
    };

    const handleRemove = (key: string) => {
        const newData = steps.filter(
            (item: CourseStepType) => item.component.uuid !== key
        );
        onStepsUpdate(newData);
    };

    const updateEvaluationType = (itemOrder, evaluationType) => {
        const updatedDataSource = steps.map((item) => {
            if (item.order === itemOrder) {
                return {
                    ...item,
                    evaluation_type: evaluationType,
                };
            }
            return item;
        });

        onStepsUpdate(updatedDataSource);
    };
    const onDragEnd = ({ active, over }: DragEndEvent) => {
        if (active.id !== over?.id) {
            onStepsUpdate((previous: Array<CourseStepType>) => {
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
            title: t('component title'),
            render: (_, item) => item.component.title,
        },
        {
            title: t('component description'),
            render: (_, item) => item.component.description,
        },
        {
            title: t('component evaluation type'),
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

export default CourseEditableSteps;
