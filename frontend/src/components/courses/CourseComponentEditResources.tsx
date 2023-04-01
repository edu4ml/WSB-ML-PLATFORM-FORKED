import { Button, Modal, notification, Upload } from 'antd';
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import {
    TEXT_EDIT_COURSE_COMPONENT_MODAL_TITLE,
    TEXT_SOMETHING_WENT_WRONG,
} from '../../texts';
import { useDeleteCourseComponentFileResourceMutation } from '../../features/courses/coursesApi';
import Cookies from 'js-cookie';
import type { UploadFile } from 'antd/es/upload/interface';

const CourseComponentEditResources = ({ component, isOpen, onCancel }) => {
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
            title={TEXT_EDIT_COURSE_COMPONENT_MODAL_TITLE}
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
                onRemove={(file) => {
                    console.log(file);
                    removeFileResource({
                        id: component.uuid,
                        resourceId: file.uid,
                    })
                        .unwrap()
                        .then(() => {
                            notification.info({
                                message: 'Dodano plik!',
                                duration: 2,
                            });
                            console.log('removed');
                        })
                        .catch((err) => {
                            notification.error({
                                message: TEXT_SOMETHING_WENT_WRONG,
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

export default CourseComponentEditResources;
