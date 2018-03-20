import {LOADING_START, LOADING_END, EVENTS} from '../constants/events';

export default function eventsReduce(state = {
  loading: false,
  main: [],
  '3_hours': [],
  1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: []
}, action) {
      const obj = {};
  switch (action.type) {
    case LOADING_START:
      return Object.assign({}, state, {
        loading: true
      });
    case LOADING_END:
      return Object.assign({}, state, {
        loading: false
      });
    case EVENTS:
      obj[action.eventsType] = action.events;
      return Object.assign({}, state, obj);
    default:
      return state;
  }
}