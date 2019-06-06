'use strict';

var utils = require('../utils/writer.js');
var Cart = require('../service/CartService');

module.exports.createCartElement = function createCartElement (req, res, next) {
  var cart = req.swagger.params['cart'].value;
  Cart.createCartElement(cart)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.findCartByUser = function findCartByUser (req, res, next) {
  var username = req.swagger.params['username'].value;
  Cart.findCartByUser(username)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
