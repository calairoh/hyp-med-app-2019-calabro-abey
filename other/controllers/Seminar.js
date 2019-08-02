'use strict';

var utils = require('../utils/writer.js');
var Seminar = require('../service/SeminarService');

module.exports.getAll = function getAll (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;

  Seminar.getAll(offset, limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.findByName = function findByName (req, res, next) {
  var name = req.swagger.params['name'].value;
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;

  Seminar.findBooksByAuthor(name, offset, limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.findByEvent = function findByEvent (req, res, next) {
  var ID = req.swagger.params['ID'].value;
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;

  Seminar.findByEvent(ID, offset, limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};