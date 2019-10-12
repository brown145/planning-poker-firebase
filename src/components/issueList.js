import React, { Fragment, useContext} from 'react';
import { MembershipContext } from '../providers/MembershipProvider';
import { RoomContext } from '../providers/RoomProvider';
import { UserContext } from '../providers/UserProvider';
import { Divider, List } from 'antd';
import './issueList.css';

import BidProvider from '../providers/BidProvider';
import issueSorter from '../utility/issueSorter';
import ActiveItem from '../components/issueListItem-active';
import InactiveItem from '../components/issueListItem-inactive';
import PendingItem from '../components/issueListItem-pending';
import IssueAdder from '../components/issueAdder';

function IssueList() {
  const { room, issues } = useContext(RoomContext);
  const { user } = useContext(UserContext);
  const { isRoomMember } = useContext(MembershipContext);
  const isLoading = !issues;
  const canActOnList = isRoomMember(user);

  const sortedArray = issues.sort(issueSorter);

  const renderItem = (item) => {
    switch (item.status) {
      case 'active':
        return (
          <BidProvider issueId={item.id}>
            <ActiveItem item={item} readOnly={!canActOnList} />
          </BidProvider>
        );
      case 'inactive':
        return (
          <BidProvider issueId={item.id}>
            <InactiveItem item={item} />
          </BidProvider>
        );
      case 'pending':
        return (
          <PendingItem item={item} readOnly={!canActOnList} />
        );
      default:
        return <></>;
    }
  };

  return (
    <Fragment>
      <List
        className="issueList"
        dataSource={sortedArray}
        itemLayout="horizontal"
        loading={isLoading}
        renderItem={renderItem}
      />
      <Divider className="listEnd" />
      <IssueAdder
        enabled={!isLoading && room && user && canActOnList}
      />
    </Fragment>
  );
}

export default IssueList;
