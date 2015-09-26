/*eslint-disable */

require('babel/register');

var config = require('./config');
var express = require('express');
var renderFile = require('ejs').renderFile;
var server = express();

server.engine('.html', renderFile);
server.set('views', __dirname + '/' + config.paths.dist);
server.use(express.static(__dirname + '/' + config.paths.dist));

server.get('/', function(req, res) {
  res.render(config.html.entryPoint);
});

server.listen(3000, function() {
  console.log('Development server ready => localhost:3000');
});
