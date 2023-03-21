import { Button, Col, Row, Typography } from 'antd';
import React from 'react';
import { CardHeaderRightButtonActionType } from '../../types/course';
const { Text } = Typography;

const CardHeader = ({ title, actions }) => {
    return (
        <Row>
            <Col span={12}>
                <Text>{title}</Text>
            </Col>
            <Col span={12}>
                {actions.map((element: CardHeaderRightButtonActionType) => {
                    return (
                        <Button
                            data-cy={element.dataCy}
                            key={element.text}
                            onClick={element.onClick}
                            style={{ float: 'right', marginLeft: '10px' }}
                            type={element.type}
                        >
                            {element.text}
                        </Button>
                    );
                })}
            </Col>
        </Row>
    );
};

export default CardHeader;
