module.exports = (() => {
  "use strict";

  return {
    Extension: {
      host: process.env.DB_HOST || '0.0.0.0',
      port: process.env.DB_PORT || 3306,
      database: process.env.DB_DATABASE || 'worsie',
      user: process.env.DB_USER || 'worsie',
      password: process.env.DB_PASSWORD || 'worsie',
      debug: false,
      connectionLimit: 33,
      queueLimit: 33,
      dateStrings: true
    }
  };
})();
