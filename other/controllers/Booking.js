'use strict';

var utils = require('../utils/writer.js');
var Booking = require('../service/BookingService');

module.exports.findByUser = function findByUser (req, res, next) {
  if(req.session.loggedin === true){
    Booking.findByUser(req.session.userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
  } else {
    var msg = { msg: "no logged" }
    utils.writeJson(res, msg);
  }
  
};

module.exports.add = function add (req, res, next) {
  var ID = req.swagger.params['ID'].value;

  Booking.add(req.session.userId, ID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
