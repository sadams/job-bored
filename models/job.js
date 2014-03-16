var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var JobSchema = new Schema({
  title:{type:String, index: true},
  body:{type:String}
});

module.exports = mongoose.model('job', JobSchema);
