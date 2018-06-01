import {PAIR, PAIRS} from '../constants/pairs';

export default function eventsReduce(state = {
}, action) {
  const obj = {};
  switch (action.type) {
    case PAIR:
      obj[action.id] = action.pair;
      return Object.assign({}, state, obj);
    case PAIRS:
      return Object.assign({}, state, action.pairs);
    default:
      return state;
  }
}