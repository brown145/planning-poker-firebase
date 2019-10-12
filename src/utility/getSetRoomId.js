import randomWords from 'random-words';

export const getSetRoomId = ({ location, history }) => {
  let roomId = location.pathname.slice(1);
  if (!roomId) {
    roomId = randomWords({min:1, max:3, join:'-'});
  }
  history.pushState({}, 'Planning Poker', roomId);
  return roomId;
};
