
module.exports = (() => {
  'use strict';
  const {getEvents} = require('./actions')('Event', 'events');
  const {isAdmin} = require('./authentication');
  const {getBets, updateBet} = require('./actions')('Bet', 'bets');
  
  const getEventsStatistics = (req, res) => {
    if (isAdmin(req.decoded.user.id) !== true) return res.json({success: false});
    getEvents().then((events) => {
      console.log(events.length);
      Promise.all(events.map((event) => {
        return getBets({event_id: event._id + ''}).then((bets) => {
          let totalSum = 0;
          let totalSumWon = 0;
          for (let i = 0; i < bets.length; ++i) {
            totalSum += bets[i].amount;
            if (bets[i].status === 'won') {
              totalSumWon += bets[i].amount;
            }
          }
          let totalProfit = totalSum - totalSumWon;
          let totalBets = bets.length;
          return Object.assign(event, {totalBets, totalSum, totalSumWon, totalProfit});
        });
      })).then((events) => {
        res.json({success: true, events});
      });
    });
  };
  
  return {
    getEventsStatistics
  };
})();