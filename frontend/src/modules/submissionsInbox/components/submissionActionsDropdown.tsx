import { Dropdown } from 'antd';
import React from 'react';
import getMenuActions from '../actions/submissionActions';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const SubmissionDropdown = ({ submission }) => {
    return (
        <Dropdown
            menu={{ items: getMenuActions(submission) }}
            trigger={['click', 'hover']}
            placement="bottomRight"
        >
            <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
            >
                <MoreVertIcon />
            </a>
        </Dropdown>
    );
};

export default SubmissionDropdown;
