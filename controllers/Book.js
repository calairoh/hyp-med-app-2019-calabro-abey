'use strict';

var utils = require('../utils/writer.js');
var Book = require('../service/BookService');

exports.book = function book(req, res, next){
  console.log(req);
}

module.exports.findBookByTitle = function findBookByTitle (req, res, next) {
  var title = req.swagger.params['title'].value;
  var offset = req.swagger.params['offset'].value;
  var lenght = req.swagger.params['lenght'].value;
  Book.findBookByTitle(title,offset,lenght)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.findBooksByAuthor = function findBooksByAuthor (req, res, next) {
  var authors = req.swagger.params['author'].value;
  var offset = req.swagger.params['offset'].value;
  var lenght = req.swagger.params['lenght'].value;
  Book.findBooksByAuthor(authors,offset,lenght)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.findBooksByGenre = function findBooksByGenre (req, res, next) {
  var genres = req.swagger.params['genres'].value;
  var offset = req.swagger.params['offset'].value;
  var lenght = req.swagger.params['lenght'].value;
  Book.findBooksByGenre(genres,offset,lenght)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.findBooksByTheme = function findBooksByTheme (req, res, next) {
  var themes = req.swagger.params['themes'].value;
  var offset = req.swagger.params['offset'].value;
  var lenght = req.swagger.params['lenght'].value;
  Book.findBooksByTheme(themes,offset,lenght)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getBookByISBN = function getBookByISBN (req, res, next) {
  var iSBN = req.swagger.params['ISBN'].value;
  var code = 200;
  Book.getBookByISBN(iSBN)
    .then(function (response) {
      if(response.lenght === 0){
        code = 404;
      }

      utils.writeJson(res, response[0], code);
    })
    .catch(function (response) {
      code = 400;
      utils.writeJson(res, response[0], code);
    });
};

module.exports.getBooks = function getBooks (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var lenght = req.swagger.params['lenght'].value;
  Book.getBooks(offset,lenght)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
