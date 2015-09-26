/*eslint-disable */

require('babel/register');

var appPackage = require('./package.json');
var config = require('./config');
var debug = require('debug')(appPackage.name);
var express = require('express');
var renderFile = require('ejs').renderFile;
var server = express();

server.engine('.html', renderFile);
server.set('views', __dirname + '/' + config.paths.dist);
server.use(express.static(__dirname + '/' + config.paths.dist));

server.get('/', function(req, res) {
  res.render(config.html.entryPoint);
});

server.listen(config.server.port, function() {
  debug('Development server ready => localhost:' + config.server.port);
});
