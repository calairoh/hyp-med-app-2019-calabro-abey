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

module.exports.getAuthorsByName = function getAuthorsByName (req, res, next) {
  var name = req.swagger.params['name'].value;
  var offset = req.swagger.params['offset'].value;
  var lenght = req.swagger.params['lenght'].value;
  Author.getAuthorsByName(name,offset,lenght)
    .then(function (response) {
      utils.writeJson(res, response);
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
