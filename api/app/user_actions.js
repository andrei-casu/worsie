module.exports = (() => {
  'use strict';
  const User = require('./models/user');

  const newUser = ({ password, mail, name }) => {
    return new User()
      .insert()
      .set('password', password)
      .set('mail', mail)
      .set('name', name)
      .valueOf()
      .then(() => {
        return true;
      });
  };

  const getAllUsers = () => {
    return new User()
      .field('*')
      .valueOf()
      .then((res) => {
        return res;
      });
  };

  const getUser = ({ id, password, mail }) => {
    if (id) {
      return new User()
        .field('*')
        .where({ id })
        .valueOf()
        .then((res) => {
          return res[0];
        });
    }
    console.log(mail, password);
    return new User()
      .field('*')
      .where({
        mail, password
      }).valueOf()
      .then((res) => {
        // console.log(res);
        if (res.length > 1)
          return null;
        return res[0];
      });
  };

  return {
    getUser,
    getAllUsers,
    newUser
  };
})();