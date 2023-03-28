import { Avatar, Tooltip } from 'antd';
import React from 'react';

import { FileOutlined } from '@ant-design/icons';

const FilesAvatars = ({ files }) => {
    const fileAvatars = files.map((file) => {
        return (
            <Tooltip key={file.uuid} title={file.title} placement="top">
                <Avatar
                    size="large"
                    icon={<FileOutlined />}
                    style={{ marginRight: '10px' }}
                    onClick={() => console.log('file clicked', file.file_link)}
                />
            </Tooltip>
        );
    });

    return (
        <Avatar.Group
            maxCount={2}
            size="large"
            style={{ position: 'absolute', right: '0' }}
        >
            {fileAvatars}
        </Avatar.Group>
    );
};

export default FilesAvatars;
