import * as types from '../constants/events';
// import fetch from 'isomorphic-fetch';
import bestEvents from '../dummy/best_events';
import events from '../dummy/events';
import events_history from '../dummy/events_history';
import event from '../dummy/event';


export function getEvents(type) {
  return dispatch => {
    dispatch({type: types.LOADING_START});
    // fetch()

    if (type === 'main')

      dispatch({
        type: types.EVENTS,
        eventsType: type,
        events: bestEvents.best_events
      });

    if (type === 'races_list'){

        dispatch({
          type: types.EVENTS,
          eventsType: type,
          events: bestEvents.best_events
        })
    }

    if (type === 'races_history'){
      dispatch({
        type: types.EVENTS,
        eventsType: type,
        events: events_history.events_history
      })
    }
    
    if (type === "add_races"){
      
      dispatch({
        type: types.EVENTS,
        eventsType: type,
        events: events.events
      });
    }

    if (type === "add_pairs"){
      
      dispatch({
        type: types.EVENTS,
        eventsType: type,
        events: events.events
      });
    }
    


    dispatch({type: types.LOADING_END});
  };
}

export function getEvent(id) {
  return dispatch => {

      dispatch({
        type: types.EVENT,
        id,
        event: event.event
      });


  };
}
