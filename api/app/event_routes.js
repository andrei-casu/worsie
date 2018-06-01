module.exports = (() => {
  'use strict';
  const {getEvents} = require('./actions')('Event', 'events');
  const {ObjectID} = require('mongodb');
  
  const getEventsRoute = (req, res) => {
    const {start_date, end_date} = req.query;

    if (start_date && end_date) {
      getEvents({timestamp: { $gt: start_date * 1, $lt: end_date * 1 }}).then((events) => {
        res.json({success: true, events});
      });
    }
    else {
      getEvents().then((events) => {
        res.json({success: true, events});
      });
    }
  };

  const getEventRoute = (req, res) => {
    console.log(req.query);
    try {
      getEvents({_id: ObjectID(req.query.id)}).then((events) => {
        if (events.length !== 1) return res.json({success: false});
  
        res.json({success: true, event: events[0]});
      }).catch((e) => {
        console.log(e);
      });
    } catch (error) {
      res.json({success: false});
    }
    
  };
  
  return {
    getEventsRoute,
    getEventRoute
  };
})();