import {LOADING_START, LOADING_END, EVENTS, EVENT} from '../constants/events';

export default function eventsReduce(state = {
  loading: false,
  main: null,
  main_admin: null,
  races_history: null,
  races_list: null,
  add_races: null,
  add_pairs: null,
  '3_hours': null,
  'finished': null,
  1: null, 2: null, 3: null
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
      // obj.loading = false;

      return Object.assign({}, state, obj);
    case EVENT:
      obj[action.id] = action.event;
      return Object.assign({}, state, obj);
    default:
      return state;
  }
}