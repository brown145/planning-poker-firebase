import React, { useContext } from 'react';
import { Button } from 'antd';

import { MembershipContext } from '../providers/MembershipProvider';

import './subhead.css';

function Subhead({
  onOpenStateChange
}) {
  const { roomMembers } = useContext(MembershipContext);

  return (
    <div className="subhead">
      <Button type="link" size="small" onClick={onOpenStateChange}>
        {roomMembers.length} in room
      </Button>
    </div>
  );
}

export default Subhead;
