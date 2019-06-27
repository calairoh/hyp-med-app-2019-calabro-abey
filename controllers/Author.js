'use strict';

var utils = require('../utils/writer.js');
var Author = require('../service/AuthorService');

module.exports.getAuthors = function getAuthors (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var lenght = req.swagger.params['lenght'].value;
  Author.getAuthors(offset,lenght)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAuthorById = function getAuthorById (req, res, next) {
  var id = req.swagger.params['Id'].value;
  Author.getAuthorById(id)
    .then(function (response) {
      utils.writeJson(res, response[0]);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAuthorsByBook = function getAuthorsByBook(req, res, next){
  var ISBN = req.swagger.params['ISBN'].value;
  Author.getAuthorsByBook(ISBN)
  .then(function (response) {
    console.log(response);
    utils.writeJson(res, response);
  })
  .catch(function (response) {
    utils.writeJson(res, response);
  });
}
