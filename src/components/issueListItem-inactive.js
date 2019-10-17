import { Col, List, Row, Statistic, Tag, Tooltip, Typography } from "antd";
import React, { useContext } from "react";
import {
  findBidMean,
  findBidMedian,
  findBidMode,
  findBidsByValue
} from "../utility/bidMaths";

import { BidContext } from "../providers/BidProvider";

const { Text } = Typography;

function InactiveItem({ item }) {
  const { bids } = useContext(BidContext);
  const bidMean = findBidMean(bids);
  const bidMedian = findBidMedian(bids);
  const bidMode = findBidMode(bids);

  const renderBidSums = () => {
    const bidsByBidValue = findBidsByValue(bids);

    return bidsByBidValue.map(({ bidValue, bids = [] }) => (
      <Tooltip
        key={bidValue}
        title={bids.map(bid => (
          <div key={bid.bidderName}>{bid.bidderName}</div>
        ))}
      >
        <Tag className={bidValue === bidMode ? "modeTag" : ""}>
          <strong>{bidValue}</strong>&nbsp;
          <em>x{bids.length}</em>
        </Tag>
      </Tooltip>
    ));
  };

  return (
    <List.Item className="InactiveIssue">
      <Row style={{ width: "100%" }}>
        <Col sm={24}>
          <Row type="flex" align="bottom" justify="space-between">
            <Col xs={24} sm={8}>
              <Text strong underline>
                {item.name}
              </Text>
            </Col>
            <Col xs={0} sm={16}>
              <Row type="flex" align="middle" justify="end">
                <Col>
                  <Statistic title="Mean" value={bidMean} />
                </Col>
                <Col>
                  <Statistic title="Median" value={bidMedian} />
                </Col>
                <Col>
                  <Statistic title="Mode" value={bidMode} />
                </Col>
                <Col>
                  <Statistic title="Total" value={bids.length} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col sm={24}>{renderBidSums()}</Col>
      </Row>
    </List.Item>
  );
}

export default InactiveItem;
