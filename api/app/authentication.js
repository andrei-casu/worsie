module.exports = (() => {
  'use strict';
  const jwt = require('jsonwebtoken');
  const { getUser, newUser } = require('./user_actions');
  const { secret } = require('./config/config');

  const checkAuthenticated = (req, res, next) => {
    var token = req.body.token || req.query.token;

    if (token) {
      jwt.verify(token, secret, function (err, decoded) {
        console.log('decoded');
        console.log(decoded);
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });
        } else {
          req.decoded = decoded;
          next(req, res);
        }
      });
    } else {
      return res.json({
        success: false,
        message: 'No token provided.'
      });
    }
  };

  const authenticate = (req, res) => {
    const { body } = req;
    getUser(body).then((user) => {
      if (user) {
        const token = jwt.sign({ user }, secret, {
          expiresIn: 86400
        });
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token,
          amazon_account: user.amazon_account
        });
      }
      else {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      }
    }).catch((e) => {
      console.log(e);
    });

  };

  const register = (req, res) => {
    const { body } = req;
    newUser(body).then((result) => {
      res.json({ success: true });
    }).catch((e) => {
      console.log(e);
      res.json({ success: false })
    })
  };

  return {
    authenticate,
    register,
    checkAuthenticated,
  };
})();