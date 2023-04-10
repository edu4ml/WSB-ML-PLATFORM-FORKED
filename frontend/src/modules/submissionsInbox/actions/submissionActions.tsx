import { t } from 'i18next';
import { useIssueCommandMutation } from '../../../features/courses/coursesApi';
import { Enums } from '../../../shared';

const getMenuActions = (submission) => {
    const [issueCommand, {}] = useIssueCommandMutation();

    return [
        {
            key: 'download',
            label: t('Download'),
            onClick: (record) => {
                console.log('Download', record);
            },
        },
        {
            key: 'approve',
            label: t('Approve'),
            onClick: () => {
                const command = {
                    type: Enums.COMMAND_TYPES.APPROVE_SUBMISSION,
                    submission_uuid: submission.uuid,
                };

                issueCommand({ command })
                    .unwrap()
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
        },
        {
            key: 'reject',
            label: t('Reject'),
            onClick: () => {
                const command = {
                    type: Enums.COMMAND_TYPES.REJECT_SUBMISSION,
                    submission_uuid: submission.uuid,
                };
                issueCommand({ command })
                    .unwrap()
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
        },
    ];
};

export default getMenuActions;
