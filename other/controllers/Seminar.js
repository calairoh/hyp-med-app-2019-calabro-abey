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

module.exports.getByID = function getByID(req, res, next){
  var id = req.swagger.params['ID'].value;

  Seminar.getByID(id)
    .then(function (response) {
      if(response.length > 0){        
        utils.writeJson(res, response[0]);
      } else {
        utils.writeJson(res, {});
      }
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
}