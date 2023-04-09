import { Space, Tag, Typography } from 'antd';
import React from 'react';
import { Enums } from '../../../shared';
import ResourceAvatarLink from '../../common/ResourceAvatarLink';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

const SubmissionsList = ({ submissions, disabled }) => {
    const { t } = useTranslation();

    const submissionStatusTagColor = {
        [Enums.COURSE_STEP_EVALUATION_STATUS.WAITING]: 'warning',
        [Enums.COURSE_STEP_EVALUATION_STATUS.PASSED]: 'success',
        [Enums.COURSE_STEP_EVALUATION_STATUS.FAILED]: 'error',
        [Enums.COURSE_STEP_EVALUATION_STATUS.SUBMITTED]: 'processing',
    };

    const submissionStatusTagText = {
        [Enums.COURSE_STEP_EVALUATION_STATUS.WAITING]: t('Waiting'),
        [Enums.COURSE_STEP_EVALUATION_STATUS.PASSED]: t('Approved'),
        [Enums.COURSE_STEP_EVALUATION_STATUS.FAILED]: t('Rejected'),
        [Enums.COURSE_STEP_EVALUATION_STATUS.SUBMITTED]: t('Submitted'),
    };

    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <Text disabled={disabled} strong>
                {t('Submitted tasks')}
            </Text>
            {submissions.map((submission) => (
                <Space style={{ width: '100%' }} key={submission.uuid}>
                    <ResourceAvatarLink
                        key={submission.uuid}
                        resource={submission}
                        disabled={disabled}
                    />
                    <Tag color={submissionStatusTagColor[submission.status]}>
                        {submissionStatusTagText[submission.status]}
                    </Tag>
                </Space>
            ))}
        </Space>
    );
};

export default SubmissionsList;
