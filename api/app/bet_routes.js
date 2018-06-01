module.exports = (() => {
  'use strict';
  const {addBet, getBets} = require('./actions')('Bet', 'bets');
  const {getEvents} = require('./actions')('Event', 'events');
  const {addCredit, getCredits, updateCredit} = require('./actions')('Credit', 'credits');
  const {ObjectID} = require('mongodb');

  const addBetRoute = (req, res) => {
    const {bet} = req.body;
    const {user} = req.decoded;
    console.log(bet, user);
    bet.user_id = user.id;
    bet.status = 'pending';

    const continueBet = () => {
      addBet(bet).then(() => {
        res.json({success: true});
      }).catch((e) => {
        console.log(e);
        res.json({success: false});
      });
    }
    
    getEvents({_id: ObjectID(bet.event_id)}).then((events) => {
      const event = events[0];
      if (event.timestamp < new Date().getTime() || event.pairs[0].result !== undefined) 
        return res.json({success: false});

      getCredits({user_id: bet.user_id}).then((credits) => {
        if (credits.length === 0) {
          addCredit({user_id: bet.user_id, amount: 200}).then(() => {
            if (bet.amount < 200) {
              updateCredit({user_id: bet.user_id}, {$set: {amount: 200 - bet.amount}}).then(() => {
                continueBet();
              });
            }
            else {
              res.json({success: false});
            }
          });
        }
        else {
          const credit = credits[0];
          if (bet.amount < credit.amount) {
            updateCredit({user_id: bet.user_id}, {$set: {amount: credit.amount - bet.amount}}).then(() => {
              continueBet();
            });
          }
          else {
            res.json({success: false});
          }
        }
      });
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