import * as types from '../constants/events';
// import fetch from 'isomorphic-fetch';
import axios from 'axios';
import bestEvents from '../dummy/best_events';
// import events from '../dummy/events';
import events_history from '../dummy/events_history';
// import event from '../dummy/event';


const threeH_mili = 10800000;
const twoH_mili = 7200000;
const oneH_mili = 3600000;
// const oneD_mili = threeH_mili * 8;
const hostName = '206.189.30.132:3000';

export function getEvents(type) {
  const token = localStorage.getItem("token");
  const currentDate_mili =  new Date().getTime();
  return dispatch => {
    dispatch({type: types.LOADING_START});

    switch(type){

      case 'main':{

        const data_end = currentDate_mili + oneH_mili;
        let apiLink = `http://${hostName}/api/events?start_date=${currentDate_mili}&end_date=${data_end}&token=${token}`;

        axios.get(apiLink)
        .then(function(response){ 

          // console.log(response.data);

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

      
      case '1_hour':{
        
        const data_end = currentDate_mili + oneH_mili;
        let apiLink = `http://${hostName}/api/events?start_date=${currentDate_mili}&end_date=${data_end}&token=${token}`;
        

        axios.get(apiLink)
        .then(function(response){ 

          // console.log(response.data);
          
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

      case '2_hours':{
        
        const data_end = currentDate_mili + twoH_mili;
        let apiLink = `http://${hostName}/api/events?start_date=${currentDate_mili+oneH_mili}&end_date=${data_end}&token=${token}`;
        

        axios.get(apiLink)
        .then(function(response){ 

          // console.log(response.data);
          
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

      case '3_hours':{
        
        const data_end = currentDate_mili + threeH_mili;
        let apiLink = `http://${hostName}/api/events?start_date=${currentDate_mili+twoH_mili}&end_date=${data_end}&token=${token}`;
        

        axios.get(apiLink)
        .then(function(response){ 

          // console.log(response.data);
          
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

          for (let index in response.data.events){
          
            response.data.events[index].pairs.sort(function(a, b){

              if (a.result < b.result) return -1;
              if (a.result > b.result) return 1;
            });
          }
          dispatch({
            type: types.EVENTS,
            eventsType: type,
            events: response.data.events
          });

          dispatch({type: types.LOADING_END});          
        });
        break;
      }

      //////////////*ADMIN*////////////
      case 'main_admin':{

          let apiLink = `http://${hostName}/api/statistics_events?token=${token}`;

          axios.get(apiLink)
          .then(function(response){ 
            
            if (response.data.success === true){
              

              const events = response.data.events;
              const generalStatistics = response.data.generalStatistics;
              const userStatistics = response.data.userStatistics;

              dispatch({
                type: types.EVENTS,
                eventsType: type,
                events: {events, generalStatistics, userStatistics}
              });
            }
  
            dispatch({type: types.LOADING_END});
  
          });
          break;
      }

      
      case 'races_list': {
        
          const data_end = currentDate_mili + threeH_mili;
          let apiLink = `http://${hostName}/api/events?start_date=${currentDate_mili}&end_date=${data_end}&token=${token}`;

          axios.get(apiLink)
          .then(function(response){ 
            
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

      case 'races_history': {

        let apiLink = `http://${hostName}/api/statistics_events?token=${token}`;

          axios.get(apiLink)
          .then(function(response){ 
            
            if (response.data.success === true){
              

              const events = response.data.events;
              const generalStatistics = response.data.generalStatistics;
              const userStatistics = response.data.userStatistics;

              dispatch({
                type: types.EVENTS,
                eventsType: type,
                events: {events, generalStatistics, userStatistics}
              });
            }
  
            dispatch({type: types.LOADING_END});
  
          });
          break;
      }
      //////////////*ADMIN*////////////

      default: {
      
        
        dispatch({type: types.LOADING_END});
        
        break;
      }
    }
    // dispatch({type: types.LOADING_END});
    
  };
}

export function getEvent(id) {
  return dispatch => {
      const token = localStorage.getItem("token");

      let apiLink = `http://${hostName}/api/event?id=${id}&token=${token}`;
      axios.get(apiLink)
      .then(function(response){

        if (response.data.success === true){
          dispatch({
            type: types.EVENT,
            id,
            event: response.data.event
          });
        }
      });
  };
}


export function sendBet(obj){
    return dispatch => {
        const token = localStorage.getItem("token");

        // console.log(obj);
        let apiLink = `http://${hostName}/api/bet?token=${token}`;
        dispatch({type: types.LOADING_START});

        axios.post(apiLink, obj)
        .then(function(response){

          if (response.success === false){
            //fa dispatch la ceva cu error: true
          }
          dispatch({type: types.LOADING_END});
        });
      };
}