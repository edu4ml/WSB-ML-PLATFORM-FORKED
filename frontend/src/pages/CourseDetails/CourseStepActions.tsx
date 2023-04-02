import { Button } from 'antd';
import React from 'react';
import { useIssueCourseCommandMutation } from '../../features/courses/coursesApi';
import { Enums } from '../../shared';
import { CheckCircleTwoTone } from '@ant-design/icons';
import CourseStepAddSubmissionModal from './CourseStepAddSubmissionModal';

const CourseStepSelfEvaluateButton = ({
    progress_tracking_uuid,
    course_uuid,
}) => {
    const [issueCommand, {}] = useIssueCourseCommandMutation();

    const command = {
        type: Enums.COMMAND_TYPES.COMPLETE_COURSE_STEP,
        progress_tracking_uuid,
    };

    return (
        <Button
            icon={<CheckCircleTwoTone />}
            block
            onClick={() => {
                issueCommand({ id: course_uuid, command });
            }}
        >
            Zakończ
        </Button>
    );
};

const CourseStepUploadSubmissionButton = ({ courseStep, courseUUID }) => {
    const [issueCommand, {}] = useIssueCourseCommandMutation();

    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const onCancel = () => {
        setIsModalOpen(false);
    };

    const onOk = (values) => {
        const command = {
            type: 'Enums.COMMAND_TYPES.ADD_COURSE_STEP_SUBMISSION',
            // course,
            ...values,
        };

        // issueCommand({ id: course_uuid, command })
        //     .unwrap()
        //     .then((response) => {
        //         setIsModalOpen(false);
        //     })
        //     .catch((err) => {
        //         console.error('Error: ', err);
        //         setIsModalOpen(false);
        //     });
    };

    return (
        <>
            <Button
                icon={<CheckCircleTwoTone />}
                block
                onClick={() => {
                    showModal();
                }}
            >
                Prześlij rozwiązanie
                {/* modal */}
            </Button>
            <CourseStepAddSubmissionModal
                courseUUID={courseUUID}
                courseStep={courseStep}
                isOpen={isModalOpen}
                onCancel={onCancel}
                onOk={onOk}
            />
        </>
    );
};

export { CourseStepSelfEvaluateButton, CourseStepUploadSubmissionButton };
