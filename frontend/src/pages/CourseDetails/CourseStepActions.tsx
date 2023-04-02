import { Button, notification } from 'antd';
import React, { useState } from 'react';
import { useIssueCourseCommandMutation } from '../../features/courses/coursesApi';
import { Enums } from '../../shared';
import { CheckCircleTwoTone } from '@ant-design/icons';
import CourseStepAddSubmissionModal from './CourseStepAddSubmissionModal';
import { useUploadCourseStepSubmissionMutation } from '../../features/courses/coursesApi';
import { RcFile } from 'antd/lib/upload/interface';
import Cookies from 'js-cookie';
import { NOTIF_SOMETHING_WENT_WRONG } from '../../texts';

interface FormFields {
    title: string;
    description: string;
}

interface CustomRcFile extends RcFile {
    originFileObj: Blob;
}

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
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [fileList, setFileList] = useState<CustomRcFile[]>([]);
    const [uploadSubmission, {}] = useUploadCourseStepSubmissionMutation();
    const onFileChange = ({ fileList }) => setFileList(fileList);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const onCancel = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async (values: FormFields) => {
        if (!fileList.length) {
            notification.error({
                message: 'Please attach a file',
                duration: 2,
            });
            return;
        }

        const formData = new FormData();
        formData.append('file', fileList[0].originFileObj);
        formData.append('title', values.title);
        formData.append('description', values.description);

        uploadSubmission({
            courseUUID,
            stepUUID: courseStep.uuid,
            progressTrackingUUID: courseStep.user_progress.tracking_uuid,
            formData,
        })
            .unwrap()
            .then((response) => {
                notification.info({
                    message: 'Rozwiązanie przesłane!',
                    duration: 2,
                });
                console.log('response', response);
            })
            .catch((err) => {
                notification.error({
                    message: NOTIF_SOMETHING_WENT_WRONG,
                    duration: 2,
                });
                console.error('Error: ', err);
            });
        setIsModalOpen(false);
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
                onFileChange={onFileChange}
                setFileList={setFileList}
                isOpen={isModalOpen}
                onCancel={onCancel}
                onOk={handleSubmit}
            />
        </>
    );
};

export { CourseStepSelfEvaluateButton, CourseStepUploadSubmissionButton };
