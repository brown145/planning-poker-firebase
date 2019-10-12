import React from 'react';
import { Button, Col, Row, Typography } from 'antd';
import './foot.css';

const { Text } = Typography;

function Foot({
  onMobileViewChange,
  isMobileView,
}) {
  const altView = (isMobileView) ? 'web view' : 'mobile view';

  return (
    <Row className='foot' type="flex" align="middle" justify="start">
      <Col xs={24}>
        <Text>Made by <Text strong>Scott Brown</Text></Text>
      </Col>
      <Col xs={24}>
        <Text>
          Toggle to
          <Button type="link" size="small" onClick={onMobileViewChange}>{altView}</Button>
        </Text>
      </Col>
    </Row>
  );
}

export default Foot;
