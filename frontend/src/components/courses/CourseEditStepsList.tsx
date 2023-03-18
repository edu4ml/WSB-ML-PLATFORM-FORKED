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
import { DownOutlined, DeleteTwoTone } from '@ant-design/icons';
import { useGetExercisesCatalogQuery } from '../../features/exercises/exerciseApi';
import { Co2Sharp } from '@mui/icons-material';

interface DataType {
    id: string | number;
    title: string;
    description: string;
}

const CourseEditStepsList = ({
    dataSource,
    setDataSource,
    setEditedButNotSaved,
    editable,
}) => {
    const { data: availableSteps } =
        useGetExercisesCatalogQuery('exercise-catalog');
    const [count, setCount] = useState(dataSource.length);

    const onDragEnd = ({ active, over }: DragEndEvent) => {
        if (active.id !== over?.id) {
            setDataSource((previous) => {
                const activeIndex = previous.findIndex(
                    (i) => i.id === active.id
                );
                const overIndex = previous.findIndex((i) => i.id === over?.id);
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
            id: chosenElement.id,
            title: chosenElement.title,
            description: chosenElement.description,
        };

        setDataSource([...dataSource, newData]);
        setCount(count + 1);
        setEditedButNotSaved(true);
    };

    const handleRemove = (key) => {
        const newData = dataSource.filter((item) => item.id !== key);
        setDataSource(newData);
        setEditedButNotSaved(true);
    };

    const isAvailable = (item) => {
        return dataSource.find((element) => element.id === item.id);
    };

    const mapToDropdown = (items) => {
        return items?.map((item) => ({
            label: item.title,
            key: item.id,
            disabled: isAvailable(item),
        }));
    };
    const columns: ColumnsType<DataType> = [
        {
            key: editable ? 'sort' : 'id',
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
            dataIndex: 'operation',
            render: (_, item) => {
                return (
                    editable && (
                        <DeleteTwoTone onClick={() => handleRemove(item.id)} />
                    )
                );
            },
        },
    ];

    return (
        <>
            <DndContext onDragEnd={onDragEnd}>
                <SortableContext
                    items={dataSource.map((i) => i.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <Table
                        components={{
                            body: {
                                row: CourseEditStepRow,
                            },
                        }}
                        rowKey="id"
                        columns={columns}
                        dataSource={dataSource}
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
