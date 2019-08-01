'use strict';

var utils = require('../utils/writer.js');
var Review = require('../service/ReviewService');

module.exports.createReview = function createReview (req, res, next) {

  if(req.session.loggedin === true){
    var review = req.swagger.params['review'].value;
    var rate = req.swagger.params['rate'].value;
    var ISBN = req.swagger.params['ISBN'].value;
    var user = req.session.userId;

    Review.createReview(review, rate, user, ISBN)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  } else {
    var response = utils.respondWithCode(403, "User not logged in");
    utils.writeJson(res, response);
  }  
};

module.exports.getReviewsByBook = function getReviewsByBook (req, res, next) {
  var ISBN = req.swagger.params['ISBN'].value;
  var offset = req.swagger.params['offset'].value;
  var lenght = req.swagger.params['lenght'].value;
  Review.getReviewsByBook(ISBN,offset,lenght)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
