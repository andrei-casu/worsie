import * as types from '../constants/events';
// import fetch from 'isomorphic-fetch';
import axios from 'axios';
import bestEvents from '../dummy/best_events';
import events from '../dummy/events';
import events_history from '../dummy/events_history';
import event from '../dummy/event';


const threeH_mili = 10800000;
const oneD_mili = threeH_mili * 8;
const token = localStorage.getItem("token");
const hostName = "192.168.2.170:3000";
const currentDate_mili =  new Date().getTime();

export function getEvents(type) {
  return dispatch => {
    dispatch({type: types.LOADING_START});

    switch(type){

      case 'main':{

        dispatch({
          type: types.EVENTS,
          eventsType: type,
          events: bestEvents.best_events
        });
        break;
      }

      case '3_hours':{
        
        const data_end = currentDate_mili + threeH_mili;
        let apiLink = `http://${hostName}/api/events?start_date=${currentDate_mili}&end_date=${data_end}&token=${token}`;
        

        axios.get(apiLink)
        .then(function(response){ 

          console.log("DATAAAAAAAA");
          console.log(response.data);

          if (response.data.success === true){

            dispatch({
              type: types.EVENTS,
              eventsType: type,
              events: response.data.events
            });
          }

          dispatch({type: types.LOADING_END});

        });
        break;
      }

      case 'finished':{
    
        const data_start = currentDate_mili - threeH_mili/3;
        
        let apiLink = `http://${hostName}/api/events?start_date=${data_start}&end_date=${currentDate_mili}&token=${token}`;

        axios.get(apiLink)
        .then(function(response){

          dispatch({
            type: types.EVENTS,
            eventsType: type,
            events: response.data.events
          });

          dispatch({type: types.LOADING_END});          
        });
        break;
      }

      case 'main_admin':{

        dispatch({
          type: types.EVENTS,
          eventsType: type,
          events: bestEvents.best_events
        });
        break;
      }

      //////////////*ADMIN*////////////
      case 'races_list': {

          dispatch({
            type: types.EVENTS,
            eventsType: type,
            events: bestEvents.best_events
          });
          break;
      }

      case 'races_history': {

        dispatch({
          type: types.EVENTS,
          eventsType: type,
          events: events_history.events_history
        });
        break;
      }
      
     case "add_races": {
        
        dispatch({
          type: types.EVENTS,
          eventsType: type,
          events: events.events
        });
        break;
      }

      case "add_pairs": {
        
        dispatch({
          type: types.EVENTS,
          eventsType: type,
          events: events.events
        });
        break;
      }
      //////////////*ADMIN*////////////

      default: {
      
        const data_start = currentDate_mili + type*oneD_mili;
        const data_end = data_start + oneD_mili;
        let apiLink = `http://${hostName}/api/events?start_date=${data_start}&end_date=${data_end}&token=${token}`;

        axios.get(apiLink)
        .then(function(response){

          dispatch({
            type: types.EVENTS,
            eventsType: type,
            events: response.data.events
          });
          dispatch({type: types.LOADING_END});
        });
        break;
      }
    }
    // dispatch({type: types.LOADING_END});
    
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


export function sendBet(obj){
    return dispatch => {

        console.log(obj);
        let apiLink = `http://${hostName}/api/bet?token=${token}`;
        dispatch({type: types.LOADING_START});

        // axios.post(apiLink, obj)
        // .then(function(response){
        //   dispatch({type: types.LOADING_END});
        // });
      }
};