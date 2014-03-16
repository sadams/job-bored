var _ = require('lodash');
var mongoose = require('mongoose');

var config = require('../config.json').mongo
var connectionURI;
var connection;

_.defaults(config, {
  port:27017,
  hostname:'localhost',
  dbname:'job-bored'
});

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function() {
  console.log('MongoDB connection opened');
});

if (config.username && config.password) {
  //add basic auth to hostname
  config.hostname = _.template('<%= username %>:<%= password %>@<%=hostname%>', config);
}
connectionURI = _.template('mongodb://<%= hostname %>:<%= port %>/<%= dbname %>', config);
if (mongoose.connection.readyState === 0) {
  connection = mongoose.connect(connectionURI);
}

/**
 * @type {{connectionURI: *, connection: *, mongoose: (*|exports)}}
 */
module.exports = {
  connectionURI:connectionURI,
  connection:connection,
  mongoose:mongoose
};

