import { Button, Col, List, Row, Tag, Typography } from "antd";
import React, { useContext, useState } from "react";

import { BidContext } from "../providers/BidProvider";
import { RoomContext } from "../providers/RoomProvider";

const { Text } = Typography;

function ActiveItem({ item, readOnly }) {
  const [bid, setBid] = useState(NaN);
  const { bidIssue } = useContext(BidContext);
  const { closeIssue } = useContext(RoomContext);

  const handleClose = event => {
    closeIssue({ id: item.id });
  };

  const handleBid = event => {
    const { value } = event.target;
    setBid(value);

    bidIssue({ bidValue: value });
  };

  const renderBidder = () => (
    <Button.Group onClick={handleBid}>
      <Button value={1}>1</Button>
      <Button value={2}>2</Button>
      <Button value={3}>3</Button>
      <Button value={5}>5</Button>
      <Button value={8}>8</Button>
      <Button value={13}>13</Button>
      <Button value={21}>21</Button>
    </Button.Group>
  );

  const renderBid = () => <Tag>{bid}</Tag>;

  const renderContent = () => {
    if (readOnly) {
      return "";
    }

    if (bid) {
      return renderBid();
    }

    return renderBidder();
  };

  return (
    <List.Item>
      <Row type="flex" align="middle" style={{ width: "100%" }}>
        <Col xs={24} sm={24} md={8}>
          <Text strong underline>
            {item.name}
          </Text>
        </Col>
        <Col xs={24} sm={24} md={16}>
          <Row type="flex" justify="end" gutter={2}>
            <Col>{renderContent()}</Col>
            {!readOnly && (
              <Col>
                <Button onClick={handleClose}>Close</Button>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </List.Item>
  );
}

export default ActiveItem;
