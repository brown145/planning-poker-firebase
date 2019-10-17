import "./issueAdder.css";

import React, { useContext, useState } from "react";

import { Input } from "antd";
import { RoomContext } from "../providers/RoomProvider";

// ant assumes a input + submit button is a search
const SubmitableInput = Input.Search;

function IssueAdder({ enabled }) {
  const [issueName, setIssueName] = useState("");
  const { addIssue } = useContext(RoomContext);

  const clear = () => {
    setIssueName("");
  };

  const handleChange = event => {
    setIssueName(event.target.value);
  };

  const handleAdd = name => {
    if (name) {
      addIssue({ name });
    }
    clear();
  };

  return (
    <SubmitableInput
      autoFocus
      className="issueAdder"
      disabled={!enabled}
      enterButton="Add"
      onChange={handleChange}
      onSearch={handleAdd}
      placeholder="ISSUE-123"
      value={issueName}
    />
  );
}

export default IssueAdder;
