import React from 'react';
import { List } from 'antd';
import LinkIcon from '@mui/icons-material/Link';

interface LinkResourceItem {
    title: string;
    url: string;
}

const LinkResourceListItem = ({ item }) => {
    return (
        <List.Item>
            <a href={item.url} target="_blank">
                <LinkIcon style={{ verticalAlign: 'middle' }} /> {item.title}
            </a>
        </List.Item>
    );
};

export default LinkResourceListItem;
