'use strict';

var utils = require('../utils/writer.js');
var Event = require('../service/EventService');

module.exports.findByType = function findByType(req, res, next){
  var type = req.swagger.params['type'].value;

  Event.findByType(type)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    }); 
}

module.exports.getTypes = function getTypes(req, res, next){
  Event.getTypes()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    }); 
}

module.exports.findByDate = function findByDate (req, res, next) {
  var start = req.swagger.params['start'].value;
  var end = req.swagger.params['end'].value;
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  Event.findByDate(start, end, offset, limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.findByPerformer = function findByPerformer (req, res, next) {
  var id = req.swagger.params['id'].value;
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  Event.findByPerformer(id, offset, limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getEventByID = function getByID (req, res, next) {
  var ID = req.swagger.params['ID'].value;
  
  Event.getEventByID(ID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAllEvents = function getAll(req, res, next){
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  
  Event.getAllEvents(offset, limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
}

module.exports.findBySeminar = function findBySeminar(req, res, next){
  var id = req.swagger.params['id'].value;
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  
  Event.findBySeminar(id, offset, limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
}
