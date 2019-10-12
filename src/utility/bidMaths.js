import { floor, flow, groupBy, last, map, meanBy, reverse, sortBy } from 'lodash';

export const findBidMean = flow(
  (data) => map(data, datum => parseInt(datum.value, 10)),
  (data) => meanBy(data),
  (data) => floor(data, 2)
);
export const findBidMedian = flow(
  (data) => map(data, datum => parseInt(datum.value, 10)),
  (data) => sortBy(data),
  (data) => (data.length % 2 === 0) ?
    (data[(data.length /2) -1] + data[data.length/ 2]) / 2 :
    data[(data.length - 1) / 2]
);
export const findBidMode = flow(
  (data) => groupBy(data, 'value'),
  (data) => map(data, (value, key) => ({ bidValue: key, count: value.length })),
  (data) => sortBy(data, 'count'),
  (data) => map(data, 'bidValue'),
  (data) => last(data)
);
export const findBidsByValue = flow(
  (data) => groupBy(data, 'value'),
  (data) => map(data, (value, key) => ({ bidValue: key, bids: value })),
  (data) => reverse(data)
);
