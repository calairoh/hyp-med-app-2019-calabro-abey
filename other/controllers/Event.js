'use strict';

var utils = require('../utils/writer.js');
var Event = require('../service/EventService');

module.exports.findByName = function findByName (req, res, next) {
  var name = req.swagger.params['name'].value;
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  Event.findByName(name, offset, limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

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

module.exports.getByID = function getByID (req, res, next) {
  var ID = req.swagger.params['ID'].value;
  
  Event.getByID(ID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAll = function getAll(req, res, next){
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  
  Event.getAll(offset, limit)
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
