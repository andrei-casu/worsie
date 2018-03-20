import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux';
import eventsReducer from './events';
import userReducer from './user';

const rootReducer = combineReducers({
  routing: routerReducer,
  events: eventsReducer,
  user: userReducer
});

export default rootReducer;
