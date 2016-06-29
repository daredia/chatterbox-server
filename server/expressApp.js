var express = require('express');
require('node-monkey').start({ host: '127.0.0.1', port: '50500'});
var bodyParser = require('body-parser');


var myApp = express();
myApp.use(bodyParser.json());

var storage = {
  results: []
};

myApp.get('/classes/messages', function (req, res) {
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'application/json';
  var query = req.query;
  if (query['order'] && query['order'] === '-createdAt') {
    storage['results'] = storage['results'].sort(function(a, b) {
      return b.createdAt - a.createdAt;
    });
  }


  res.set(headers);
  res.send(storage);

});

myApp.post('/classes/messages', function (req, res) {
  var headers = defaultCorsHeaders;
  storage['results'].push(req.body);

  res.set(headers);
  res.status(201).send('message');

});

myApp.options('/classes/messages', function(req, res) {
  var headers = defaultCorsHeaders;
  headers['Allow'] = 'GET, POST, PUT, DELETE, OPTIONS';
  res.set(headers);
  res.send('options response sent');
});

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};


myApp.listen(3000, '127.0.0.1', function () {
});