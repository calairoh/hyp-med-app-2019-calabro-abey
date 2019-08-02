'use strict';

var utils = require('../utils/writer.js');
var Booking = require('../service/CartService');

module.exports.findByUser = function findByUser (req, res, next) {
  //Prendere lo userID dalla sessione e passarlo
  Booking.findByUser(cart)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.add = function add (req, res, next) {
  var username = req.swagger.params['username'].value;
  var ID = req.swagger.params['ID'].value;
  Booking.add(username, ID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
