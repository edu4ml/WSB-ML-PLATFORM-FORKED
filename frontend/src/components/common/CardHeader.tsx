import { Button, Col, Row, Typography } from 'antd';
import React from 'react';

const { Text } = Typography;

interface CardRightButtonActionType {
    text: string;
    onClick;
}

type CardHeaderActionsType = Array<CardRightButtonActionType>;

const CardHeader = ({ title, actions }) => {
    return (
        <Row>
            <Col span={12}>
                <Text>{title}</Text>
            </Col>
            <Col span={12}>
                {actions.map((element: CardRightButtonActionType) => {
                    return (
                        <Button
                            key={element.text}
                            onClick={element.onClick}
                            style={{ float: 'right', marginLeft: '10px' }}
                        >
                            {element.text}
                        </Button>
                    );
                })}
            </Col>
        </Row>
    );
};

export { CardHeaderActionsType, CardRightButtonActionType };

export default CardHeader;
