import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux';
import eventsReducer from './events';

const rootReducer = combineReducers({
  routing: routerReducer,
  events: eventsReducer
});

export default rootReducer;
