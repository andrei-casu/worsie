import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux';
import eventsReducer from './events';
import userReducer from './user';
import pairsReducer from './pairs';

const rootReducer = combineReducers({
  routing: routerReducer,
  pairs: pairsReducer,
  events: eventsReducer,
  user: userReducer
});

export default rootReducer;
