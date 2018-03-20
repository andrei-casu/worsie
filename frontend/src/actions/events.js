import * as types from '../constants/events';
// import fetch from 'isomorphic-fetch';
import bestEvents from '../dummy/best_events.json';
import events from '../dummy/events.json';


export function getEvents(type) {
  return dispatch => {
    dispatch({type: types.LOADING_START});
    // fetch()

    console.log(type);
    if (type === 'main')
      dispatch({
        type: types.EVENTS,
        eventsType: type,
        events: bestEvents.best_events
      });
    else
      dispatch({
        type: types.EVENTS,
        eventsType: type,
        events: events.events
      });


    dispatch({type: types.LOADING_END});
  };
}