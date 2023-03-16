import { Button, Col, Row, Typography } from 'antd';
import React from 'react';
import type { ButtonType } from 'antd/es/button/buttonHelpers';
const { Text } = Typography;

interface CardRightButtonActionType {
    text: string;
    onClick;
    type: ButtonType;
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

export { CardHeaderActionsType, CardRightButtonActionType };

export default CardHeader;
