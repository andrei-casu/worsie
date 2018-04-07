module.exports = (() => {
  'use strict';

  const {getUser} = require('./user_actions');

  const getUserRoute = (req, res) => {
    const id = req.decoded.user.id;
    getUser({id}).then((user) => {
      delete user.password;
      res.json({success: true, user});
    }).catch((e) => {
      console.log(e);
      res.json({success: false, message: 'An error occurred'});
    })
  };

  return {
    getUserRoute
  };
})();