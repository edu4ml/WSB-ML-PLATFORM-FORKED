import { Button, Dropdown, Space, notification } from 'antd';
import type { MenuProps } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Enums } from '../../../shared';
import { ComponentType, CourseStepType } from '../../../types/course';
import {
    useGetComponentListQuery,
    useIssueCommandMutation,
} from '../../../features/courses/coursesApi';
import { useNavigate } from 'react-router-dom';
import {
    getContentTypeIcon,
    getContentTypeName,
} from '../../../helpers/namesFactory';
import { DownOutlined } from '@ant-design/icons';

type CourseActionButtonDataType = {
    uuid: string;
    steps: Array<CourseStepType>;
    description: string;
};

const mapToCourseSteps = (data) => {
    return data.map((item: CourseStepType, index: number) => ({
        component: item.component.uuid,
        order: index + 1,
        evaluation_type: item.evaluation_type,
    }));
};
const validateBeforeSave = (steps, description) => {
    return steps.length > 0 || description.length > 0;
};

const validateBeforePublish = (steps, description) => {
    return steps.length > 0 && description.length > 0;
};

const PublishButton = ({ course }: { course: CourseActionButtonDataType }) => {
    const { t } = useTranslation();
    const [issueCommand, {}] = useIssueCommandMutation();
    const navigate = useNavigate();

    const publish = () => {
        const command = {
            type: Enums.COMMAND_TYPES.PUBLISH_COURSE,
            course_uuid: course.uuid,
            description: course.description,
            steps: mapToCourseSteps(course.steps),
        };

        if (!validateBeforePublish(course.steps, course.description)) {
            notification.error({
                message: t(
                    'You need to add at least one step and a description'
                ),
            });
            return;
        }

        issueCommand({ command })
            .unwrap()
            .then((res) => {
                notification.info({
                    message: t('Course published'),
                    duration: 2,
                });
                navigate('/app/courses/');
            })
            .catch((err) => {
                notification.error({
                    message: t('Error publishing course'),
                });
            });
    };

    return (
        <Button
            data-cy="course-details-edit-publish"
            onClick={publish}
            type="primary"
        >
            {t('Publish')}
        </Button>
    );
};

const SaveButton = ({ course }: { course: CourseActionButtonDataType }) => {
    const { t } = useTranslation();
    const [issueCommand, {}] = useIssueCommandMutation();
    const save = () => {
        const command = {
            type: Enums.COMMAND_TYPES.UPDATE_COURSE,
            description: course.description,
            steps: mapToCourseSteps(course.steps),
            course_uuid: course.uuid,
        };

        if (!validateBeforeSave(command.steps, command.description)) {
            notification.error({
                message: t('Please add at least one step or description'),
            });
            return;
        }

        issueCommand({ command })
            .unwrap()
            .then((res) => {
                notification.info({
                    message: t('Course saved'),
                    duration: 2,
                });
            })
            .catch((err) => {
                notification.error({
                    message: t('Error saving course'),
                });
            });
    };
    return (
        <Button
            data-cy="course-details-edit-save"
            onClick={save}
            type="primary"
        >
            {t('Save')}
        </Button>
    );
};

const getActions = (
    courseData: CourseActionButtonDataType
): Array<React.ReactNode> => {
    return [
        <PublishButton course={courseData} />,
        <SaveButton course={courseData} />,
    ];
};

const AddComponentButton = ({ steps, onStepsUpdate }) => {
    const { t } = useTranslation();
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

        onStepsUpdate([...steps, newData]);
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
                    {t('Add step')}
                    <DownOutlined />
                </Space>
            </Button>
        </Dropdown>
    );
};

export default getActions;

export { AddComponentButton };
