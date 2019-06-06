'use strict';

var utils = require('../utils/writer.js');
var Review = require('../service/ReviewService');

module.exports.createReview = function createReview (req, res, next) {
  var user = req.swagger.params['user'].value;
  Review.createReview(user)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getReviewsByBook = function getReviewsByBook (req, res, next) {
  var iSBN = req.swagger.params['ISBN'].value;
  var offset = req.swagger.params['offset'].value;
  var lenght = req.swagger.params['lenght'].value;
  Review.getReviewsByBook(iSBN,offset,lenght)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
