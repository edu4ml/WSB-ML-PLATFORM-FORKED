import { Space, Tag, Typography } from 'antd';
import React from 'react';
import ResourceAvatarLink from '../../components/common/ResourceAvatarLink';
import { Enums } from '../../shared';

const { Text } = Typography;

const submissionStatusTagColor = {
    [Enums.COURSE_STEP_EVALUATION_STATUS.WAITING]: 'warning',
    [Enums.COURSE_STEP_EVALUATION_STATUS.PASSED]: 'success',
    [Enums.COURSE_STEP_EVALUATION_STATUS.FAILED]: 'error',
    [Enums.COURSE_STEP_EVALUATION_STATUS.SUBMITTED]: 'processing',
};

const submissionStatusTagText = {
    [Enums.COURSE_STEP_EVALUATION_STATUS.WAITING]: 'Oczekuje',
    [Enums.COURSE_STEP_EVALUATION_STATUS.PASSED]: 'Zatwierdzone',
    [Enums.COURSE_STEP_EVALUATION_STATUS.FAILED]: 'Odrzucone',
    [Enums.COURSE_STEP_EVALUATION_STATUS.SUBMITTED]: 'Przesłane',
};

const CourseStepSubmissionList = ({ submissions, disabled }) => {
    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <Text disabled={disabled} strong>
                Przesłane zadania
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

export default CourseStepSubmissionList;
