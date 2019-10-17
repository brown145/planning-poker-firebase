import './head.css';

import { Col, Row } from 'antd';

import Login from '../components/login';
import { ReactComponent as Logo } from '../svg/logo.svg';
import React from 'react';

function Head() {
  return (
    <Row className='head' type="flex" align="middle" justify="space-between">
      <Col>
        <Row className='head' type="flex" align="middle" justify="start">
          <Col>
            <Logo className="logo" />
          </Col>
          <Col>
            <h1>Planning Poker</h1>
          </Col>
        </Row>
      </Col>
      <Col>
        <Login />
      </Col>
    </Row>
  );
}

export default Head;
