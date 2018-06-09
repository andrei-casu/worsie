module.exports = (() => {
  'use strict';
  const http = require('http');
  const urlParse = require('url');
  const port = 3000;

  const handlers = [];
  const middlewares = [];

  const requestHandler = (request, response) => {
    const {url, method} = request;
    const parsed = urlParse.parse(url, true);
    request.query = parsed.query;
    request.body = {};

    response.json = (result) => {
      response.end(JSON.stringify(result));
    };

    const matchToHandlers = () => {
      let i, j;
      for (i = 0; i < handlers.length; ++i) {
        const handler = handlers[i];
        if (handler.route === parsed.pathname && handler.type === method) {
          if (handler.route === '/feed') 
            response.writeHead(200, {'Content-Type': 'application/atom+xml'});
          else
            response.writeHead(200, {"Content-Type": "application/json"});
          for (j = 0; j < middlewares.length; ++j) {
            const middleware = middlewares[j];

            if (parsed.pathname.search(middleware.route) !== -1) {
              middleware.callback(request, response, handler.callback);
              return;
            }
          }
          handler.callback(request, response);
          return;
        }
      }
      
      response.writeHead(200);
      response.end();
    };

    if (method === 'POST') {
      var jsonString = '';
        request.on('data', function (data) {
            jsonString += data;
        });
        request.on('end', function () {
            // console.log(jsonString);
            request.body = JSON.parse(jsonString);
            matchToHandlers();
        });
    }
    else {
      matchToHandlers();
    }
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
  };

  const get = (route, callback) => {
    handlers.push({
      type: 'GET',
      route, callback
    });
  };

  const post = (route, callback) => {
    handlers.push({
      type: 'POST',
      route, callback
    });
  };

  const applyMiddleware = (route, callback) => {
    middlewares.push({
      route, callback
    });
  }

  return {
    start, get, post,
    applyMiddleware
  }
})();