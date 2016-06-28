var express = require('express');
require('node-monkey').start({ host: '127.0.0.1', port: '50500'});

var myApp = express();

myApp.get('/', function (req, res) {
  res.send('Hello World!');
});

myApp.listen(3000, '127.0.0.1', function () {
  console.log('Example app listening on port 3000!');
});