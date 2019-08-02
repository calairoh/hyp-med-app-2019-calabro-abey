'use strict';

var utils = require('../utils/writer.js');
var Performer = require('../service/PerformerService');

module.exports.getAll = function getAll (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;

  Performer.getAll(offset, limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getByID = function getByID (req, res, next) {
  var ID = req.swagger.params['ID'].value;
  Performer.getByID(ID)
    .then(function (response) {
      utils.writeJson(res, response[0]);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.findByEvent = function findByEvent(req, res, next){
  var ID = req.swagger.params['ID'].value;
  Performer.findByEvent(ID)
  .then(function (response) {
    utils.writeJson(res, response);
  })
  .catch(function (response) {
    utils.writeJson(res, response);
  });
}
