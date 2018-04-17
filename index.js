var http = require('http');
var fs = require('fs');
var extract = require('./extract');
var wss = require('./websockets-server');
const mime = require('mime');

var handleError = function(err, res) {
  //res.writeHead(404);
  fs.readFile('./app/error.html', function(err, data) {
    res.end(data);
  });
};

var server = http.createServer(function(req, res) {
  console.log('Responding to a request.');
  var filePath = extract(req.url);
  var type = mime.getType(filePath);
  fs.readFile(filePath, function(err, data) {
    if (err) {
      handleError(err, res);
      return;
    } else {
      res.setHeader('Content-Type', type);
      res.end(data);
    }
  });
});
server.listen(3000);
