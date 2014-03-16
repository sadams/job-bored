var options = require('../config.json');
var mongo = require('../db/mongo.js').mongoose;
var base = options.apiPrefix || '/api';
//load the modules into mongo
require('../models/job');

function create(req, res, next) {
  var model = mongo.model(req.params.resource);
  if (!model) {
    next();
    return;
  }
  model.create(req.body, function(err, obj) {
    if (err) {
      console.log(err);
      res.send(500, err);
    }
    else {
      res.send(200, obj);
    }
  });
}

function list(req, res, next) {
  var model = null;
  var options = {
    //can put 'skip' or 'limit' in here when needed
  };
  try {
    model = mongo.model(req.params.resource);
  } catch (err) {
    console.log(err);
    res.send(500, err);
    return;
  }
  if (!model) {
    //will hit 404 error if no other routes pick this up
    next();
    return;
  }
  model.find(null, null, options, function(err, objs) {
    if (err) {
      console.log(err);
      res.send(500, err);
    } else {
      res.send(200, objs);
    }
  });
}

function findById(req, res, next) {
  var model = mongo.model(req.params.resource);
  var id = req.params.id;
  if (!model) {
    next();
    return;
  }
  model.findById(id, function(err, obj) {
    if (err) {
      console.log(err);
      res.send(404, err);
    }
    else {
      res.send(200, obj);
    }
  });
}

function deleteById(req, res, next) {
  var model = mongo.model(req.params.resource);
  var id = req.params.id;
  if (!model) {
    next();
    return;
  }
  model.findByIdAndRemove(id, function(err, obj) {
    if (err) {
      console.log(err);
      res.send(404, err);
    } else {
      res.send(200, obj);
    }
  });
}

function updateById(req, res, next) {
  var model = mongo.model(req.params.resource);
  var id = req.params.id;
  if (!model) {
    next();
    return;
  }
  model.findByIdAndUpdate(id, req.body, function(err, obj) {
    if (err) {
      console.log(err);
      res.send(404, err);
    }
    else {
      res.send(200, obj);
    }
  });
}


module.exports = function(app) {
  app.post(base + '/:resource', create);
  app.get(base + '/:resource', list);
  app.get(base + '/:resource/:id', findById);
  app.put(base + '/:resource/:id', updateById);
  app.delete(base + '/:resource/:id', deleteById);
};
