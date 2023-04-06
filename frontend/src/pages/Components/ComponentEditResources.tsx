import { Button, Modal, notification, Upload } from 'antd';
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { BTN_EDIT, NOTIF_SOMETHING_WENT_WRONG } from '../../texts';
import { useDeleteCourseComponentFileResourceMutation } from '../../features/courses/coursesApi';
import Cookies from 'js-cookie';
import type { UploadFile } from 'antd/es/upload/interface';

const ComponentEditResources = ({ component, isOpen, onCancel }) => {
    const [removeFileResource, {}] =
        useDeleteCourseComponentFileResourceMutation();

    const defaultFileList: Array<UploadFile> = component.resources
        .filter((file) => file.type === 'FILE')
        .map((file) => {
            return {
                name: file.title,
                url: file.file_link,
                status: 'done',
                uid: file.uuid,
            };
        });

    return (
        <Modal
            title={BTN_EDIT}
            open={isOpen}
            onCancel={onCancel}
            footer={null}
            width={800}
        >
            <Upload
                style={{ width: '100%' }}
                listType="picture"
                withCredentials={true}
                defaultFileList={defaultFileList}
                headers={{
                    'X-CSRFToken': Cookies.get('csrftoken'),
                }}
                action={`/api/v1/course-components/${component.uuid}/file-resources`}
                onChange={(info) => {
                    if (info.file.status === 'done') {
                        console.log(info);
                        notification.info({
                            message: 'Zapisano!',
                            duration: 2,
                        });
                    } else if (info.file.status === 'error') {
                        notification.error({
                            message: NOTIF_SOMETHING_WENT_WRONG,
                            duration: 2,
                        });
                    }
                }}
                onRemove={(file) => {
                    removeFileResource({
                        id: component.uuid,
                        resourceId: file.uid,
                    })
                        .unwrap()
                        .then(() => {
                            notification.info({
                                message: 'Pomyślnie usunięto plik!',
                                duration: 2,
                            });
                            console.log('removed');
                        })
                        .catch((err) => {
                            notification.error({
                                message: NOTIF_SOMETHING_WENT_WRONG,
                                duration: 2,
                            });
                            console.log(err);
                        });
                }}
            >
                <Button block icon={<UploadOutlined />}>
                    Upload File
                </Button>
            </Upload>
        </Modal>
    );
};

export default ComponentEditResources;
