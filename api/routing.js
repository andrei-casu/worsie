module.exports = (() => {
  'use strict';
  const http = require('http');
  const port = 3000;

  const handlers = [];

  const requestHandler = (request, response) => {
    const {url, method} = request;
    if (method === 'POST') {
      var jsonString = '';
        request.on('data', function (data) {
            jsonString += data;
        });
        request.on('end', function () {
            request.body = JSON.parse(jsonString);
        });
    }
    const matchToHandlers = () => {
      handlers.map((handler) => {
        if (handler.route === url && handler.type === method) {
          handler.callback(request, response);
        }
      });
    };
    // console.log(request.url)
  }

  const server = http.createServer(requestHandler);

  const start = (port) => {
    server.listen(port, (err) => {
      if (err) {
        return console.log('something bad happened', err);
      }

      console.log(`server is listening on ${port}`);
    });
  }

  const get = (route, callback) => {
    handlers.push({
      type: 'GET',
      route, callback
    });
  }

  return {
    start, get
  }
})();