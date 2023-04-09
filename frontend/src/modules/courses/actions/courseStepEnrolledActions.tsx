import { Button, Space, notification } from 'antd';
import React, { useState } from 'react';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { RcFile } from 'antd/lib/upload/interface';
import { useTranslation } from 'react-i18next';
import { Enums } from '../../../shared';
import { useIssueCommandMutation } from '../../../features/courses/coursesApi';
import SubmissionSubmitModal from '../modals/submissionSubmit';

interface FormFields {
    title: string;
    description: string;
}

interface CustomRcFile extends RcFile {
    originFileObj: Blob;
}

const CourseStepSelfEvaluateButton = ({ courseUUID, stepUUID, userUUID }) => {
    const { t } = useTranslation();
    const [issueCommand, {}] = useIssueCommandMutation();

    const command = {
        type: Enums.COMMAND_TYPES.COMPLETE_COURSE_STEP,
        courseUUID,
        stepUUID,
        userUUID,
    };

    return (
        <Button
            icon={<CheckCircleTwoTone />}
            block
            onClick={() => {
                issueCommand({
                    command,
                })
                    .unwrap()
                    .then((response) => {
                        notification.info({
                            message: t('Step completed!'),
                            duration: 2,
                        });
                        console.log('response', response);
                    })
                    .catch((err) => {
                        notification.error({
                            message: t('Something went wrong'),
                            duration: 2,
                        });
                        console.error('Error: ', err);
                    });
            }}
        >
            {t('Complete step')}
        </Button>
    );
};

const CourseStepUploadSubmissionButton = ({ courseStep, courseUUID }) => {
    const { t } = useTranslation();

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [fileList, setFileList] = useState<CustomRcFile[]>([]);
    const [issueCommand, {}] = useIssueCommandMutation();
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
                message: t('You need to add a file'),
                duration: 2,
            });
            return;
        }

        const formData = new FormData();
        formData.append('type', Enums.COMMAND_TYPES.SUBMIT_SUBMISSION);
        formData.append('file', fileList[0].originFileObj);
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('course_step', courseStep.uuid);

        issueCommand({
            command: formData,
        })
            .unwrap()
            .then((response) => {
                notification.info({
                    message: t('Submission uploaded'),
                    duration: 2,
                });
            })
            .catch((err) => {
                notification.error({
                    message: t('Something went wrong'),
                    duration: 2,
                });
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
                {t('Upload submission')}
                {/* modal */}
            </Button>
            <SubmissionSubmitModal
                onFileChange={onFileChange}
                setFileList={setFileList}
                isOpen={isModalOpen}
                onCancel={onCancel}
                onOk={handleSubmit}
            />
        </>
    );
};

const getActions = (courseUUID, userUUID, courseStep) => {
    let actions: React.ReactNode[] = [];
    if (
        courseStep.evaluation_type ==
            Enums.COURSE_STEP_EVALUATION_TYPE.SELF_EVALUATED &&
        !courseStep.user_progress.is_blocked &&
        !courseStep.user_progress.is_completed
    ) {
        actions.push(
            <CourseStepSelfEvaluateButton
                key={'self-evaluate'}
                courseUUID={courseUUID}
                stepUUID={courseStep.uuid}
                userUUID={userUUID}
            />
        );
    }

    if (
        !courseStep.user_progress.is_blocked &&
        !courseStep.user_progress.is_completed
    ) {
        actions.push(
            <CourseStepUploadSubmissionButton
                key={'upload-submission'}
                courseUUID={courseUUID}
                courseStep={courseStep}
            />
        );
    }
    return <Space direction="horizontal">{actions}</Space>;
};

export default getActions;
