import React, { useContext } from 'react';
import { MembershipContext } from '../providers/MembershipProvider';
import { UserContext } from '../providers/UserProvider';
import { Avatar, Button, Col, List, Row } from 'antd';

import './userList.css';

function UserList({showDetails}) {
  const { roomMembers, exitRoom } = useContext(MembershipContext);
  const { user } = useContext(UserContext);
  const currentMember = user;
  const isLoading = roomMembers.length === 0;

  const renderActions = forUser => (showDetails) ? (
    <Button
      icon="close"
      shape="circle"
      size="small"
      onClick={() => exitRoom(forUser.id)}
    />
  ) : null;

  return (roomMembers.length) ? (
    <List
      className='userList'
      dataSource={roomMembers.sort()}
      itemLayout="horizontal"
      loading={isLoading}
      renderItem={member => (
        <List.Item>
          <Row
            className={(currentMember.id === member.id) ? 'currentUser' : ''}
            type="flex"
            align="middle"
            justify="space-between"
            style={{width: '100%'}}
          >
            <Col span={6}>
              <Avatar size={(showDetails) ? 'default' : 'small'} shape="square" alt={member.displayName}>
                {member.displayName.split(' ').reduce((a, b) => `${a}${b.charAt(0)}`, '')}
              </Avatar>
            </Col>
            <Col span={14}>
              {(showDetails) ? member.displayName : null}
            </Col>
            <Col span={4}>
              {renderActions(member)}
            </Col>
          </Row>
        </List.Item>
      )}
    />
  ): null;
}

export default UserList;
