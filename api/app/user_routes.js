module.exports = (() => {
  'use strict';

  const {getUser} = require('./user_actions');
  const {getBets} = require('./actions')('Bet', 'bets');
  const {getCredits} = require('./actions')('Credit', 'credits');

  const getUserRoute = (req, res) => {
    const id = req.decoded.user.id;
    getUser({id}).then((user) => {
      delete user.password;

      Promise.all([getBets({user_id: id, status: 'pending'}),
      getBets({user_id: id, status: {$not: {$eq: 'pending'}}}),
      getCredits({user_id: id})
      ]).then(([pending, history, credits]) => {
        // console.log(pending.length);
        // console.log(history.length);
        user.pending = pending;
        user.history = history;
        if (credits.length === 0) credits = [{amount: 200}];
        user.credit = credits[0].amount;
        // console.log(user);
        res.json({success: true, user});
      });

    }).catch((e) => {
      console.log(e);
      res.json({success: false, message: 'An error occurred'});
    })
  };

  return {
    getUserRoute
  };
})();