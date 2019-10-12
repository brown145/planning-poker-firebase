import React, { useContext } from 'react';
import { RoomContext } from '../providers/RoomProvider';
import { Button, Col, List, Row, Typography } from 'antd';

const { Text } = Typography;

function PendingItem({ item, readOnly }) {
  const { removeIssue, startIssue } = useContext(RoomContext);
  const handleRemove = (event) => {
    removeIssue({ id: item.id });
  }

  const handleStart = (event) => {
    startIssue({ id: item.id });
  }

  return (
    <List.Item className="pendingIssue">
      <Row type="flex" align="middle" justify="space-between" style={{width: '100%'}}>
        <Col sm={24} md={20}>
          <Text strong underline>{item.name}</Text>
        </Col>
        <Col sm={24} md={4}>
          {!readOnly &&
            <Row type="flex" justify="end">
              <Col><Button type="link" onClick={handleRemove} >Delete</Button></Col>
              <Col><Button type={'primary'} onClick={handleStart}>Start</Button></Col>
            </Row>
          }
        </Col>
      </Row>
    </List.Item>
  );
}

export default PendingItem;
