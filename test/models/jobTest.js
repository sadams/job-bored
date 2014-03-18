var mockery = require('mockery');
var expectedJobSchema = {
  title:{type:String, index: true},
  body:{type:String}
};
var mockSchema = {bing:'bong'};
var mockModel = {foo:'bar'};
var moduleUnderTest = '../../models/job';
mockery.registerAllowable(moduleUnderTest);

function jobSchemaSetup(test) {
  test.expect(4);
  mockery.registerMock('mongoose', {
    Schema : function(obj){
      test.deepEqual(obj, expectedJobSchema);
      return mockSchema;
    },
    model : function(name, schema) {
      test.equal(name, 'job');
      test.deepEqual(schema, mockSchema);
      return mockModel;
    }
  });

  var job = require(moduleUnderTest);
  test.equal(job, mockModel);

  test.done();
}

module.exports = {
  setUp: function (callback) {
    mockery.enable();
    callback();
  },
  tearDown: function (callback) {
    mockery.disable();
    callback();
  },
  test1:jobSchemaSetup
};
