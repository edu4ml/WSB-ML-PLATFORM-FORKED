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
import { DownOutlined } from '@ant-design/icons';
import { useGetExercisesCatalogQuery } from '../../features/exercises/exerciseApi';

interface DataType {
    key: string | number;
    title: string;
    description: string;
}

const columns: ColumnsType<DataType> = [
    {
        key: 'sort',
    },
    {
        title: 'Tytuł',
        dataIndex: 'title',
    },
    {
        title: 'Opis',
        dataIndex: 'description',
    },
];

const CourseEditStepsList = ({
    dataSource,
    setDataSource,
    setEditedButNotSaved,
}) => {
    const { data: availableSteps } =
        useGetExercisesCatalogQuery('exercise-catalog');
    const [count, setCount] = useState(dataSource.length);

    const onDragEnd = ({ active, over }: DragEndEvent) => {
        if (active.id !== over?.id) {
            setDataSource((previous) => {
                const activeIndex = previous.findIndex(
                    (i) => i.key === active.id
                );
                const overIndex = previous.findIndex((i) => i.key === over?.id);
                return arrayMove(previous, activeIndex, overIndex);
            });
        }
        setEditedButNotSaved(true);
    };

    const handleAdd = (clickEvent) => {
        const chosenElement = availableSteps.find(
            (availableSteps) => availableSteps.id == clickEvent.key
        );

        const newData: DataType = {
            key: chosenElement.id,
            title: chosenElement.title,
            description: chosenElement.description,
        };

        setDataSource([...dataSource, newData]);
        setCount(count + 1);
        setEditedButNotSaved(true);
    };

    const isAvailable = (item) => {
        return dataSource.find((element) => element.key === item.id);
    };

    const mapToDropdown = (exercises) => {
        return exercises?.map((item) => ({
            label: item.title,
            key: item.id,
            disabled: isAvailable(item),
        }));
    };

    return (
        <>
            <DndContext onDragEnd={onDragEnd}>
                <SortableContext
                    items={dataSource.map((i) => i.key)}
                    strategy={verticalListSortingStrategy}
                >
                    <Table
                        components={{
                            body: {
                                row: CourseEditStepRow,
                            },
                        }}
                        rowKey="key"
                        columns={columns}
                        dataSource={dataSource}
                    />
                </SortableContext>
            </DndContext>
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
    );
};

export default CourseEditStepsList;
