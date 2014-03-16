//core
var http = require('http');
var path = require('path');

//contrib
var _ = require('lodash');
var express = require('express');

var config = require('./config.json');
var routes = require('./routes');
var app = module.exports = express();


// all environments
app.set('port', config.port || 3000);
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

//sets up our api
routes(app);

//setup a simple route for showing all the routes registered when visiting '/'
app.get('/',function(req,res){
  res.setHeader('Content-Type', 'application/json');
  var data = {};
  _.forEach(app.routes, function(routes, method){
    data[method] = _.map(routes, function(route){
      //need to do this because it's a regex and so doesn't out correctly when strigified.
      return route.path.toString();
    });
  });

  return res.send(data,200);
});

if (config.production) {
  app.use(express.errorHandler());
} else {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
