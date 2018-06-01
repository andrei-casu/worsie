module.exports = (() => {
  'use strict';
  const {addBet, getBets} = require('./actions')('Bet', 'bets');
  const {getEvents} = require('./actions')('Event', 'events');
  const {ObjectID} = require('mongodb');

  const addBetRoute = (req, res) => {
    const {bet} = req.body;
    const {user} = req.decoded;
    console.log(bet, user);
    bet.user_id = user.id;
    bet.status = 'pending';
    addBet(bet).then(() => {
      res.json({success: true});
    }).catch((e) => {
      console.log(e);
      res.json({success: false});
    });
  }

  const getBetsRoute = (req, res) => {
    getBets({user_id: req.decoded.user.id}).then((bets) => {
      res.json({success: true, bets});
    }).catch((e) => {
      console.log(e);
      res.json({success: false});
    });
  };

  return {
    addBetRoute,
    getBetsRoute
  };
})();