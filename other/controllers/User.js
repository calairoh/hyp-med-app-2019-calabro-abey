'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');

module.exports.createUser = function createUser (req, res, next) {
  var body = req.swagger.params['body'].value;
  console.log(body);

  User.getUserByName(body.username)
    .then(function(response){

      var message = {
        code: 500,
        msg: ""
      };

      if(response.length === 0){
        User.createUser(body)
          .then(function (response) {
            console.log(response);
            message.code = 200;
            message.msg = "Registration complete succefully";
            utils.writeJson(res, message);
          })
          .catch(function (response) {
            console.log(response);
            message.msg = "Unknow error";
            utils.writeJson(res, message);            
          });

      } else {
        message.msg = "User with this name already exists"
        utils.writeJson(res, message);
      }      
    }); 
};

module.exports.deleteUser = function deleteUser (req, res, next) {
  var username = req.swagger.params['username'].value;
  User.deleteUser(username)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUserByName = function getUserByName (req, res, next) {
  var username = req.swagger.params['username'].value;
  User.getUserByName(username)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUserLoggedInfo = function getUserLoggedInfo(req, res, next){
  if(req.session.loggedin === true){
    User.getUserByName(req.session.username)
    .then(function(response){
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
  } else {

    var msg = {
      msg: "no user logged in"
    };

    utils.writeJson(res, msg);
  }
}

module.exports.loginUser = function loginUser (req, res, next) {
  var loginObj = req.swagger.params['loginObj'].value;
  var username = loginObj.username;
  var password = loginObj.password;

  User.loginUser(username,password)
    .then(function (response) {
      req.session.loggedin = false;
      var message = {
        code: 500,
        msg: ""
      };

      if(response.length > 0){
        response = response[0];
        if(response.password === password){
          req.session.loggedin = true;
          req.session.username = username;
          req.session.userId = response.id;
          message.code = 200;          
        }
      }
      console.log(message);
      console.log(response);
      
      utils.writeJson(res, message);
    })
    .catch(function (response) {
      req.session.loggedin = false;
      utils.writeJson(res, response);
    });
};

module.exports.logoutUser = function logoutUser (req, res, next) {
  req.session.loggedin = false;
  req.session.username = undefined;

  var msg = {
    msg: "Logout executed"
  };

  utils.writeJson(res, msg);

  /*User.logoutUser()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });*/
};

module.exports.updateUser = function updateUser (req, res, next) {
  var username = req.swagger.params['username'].value;
  var body = req.swagger.params['body'].value;
  User.updateUser(username,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
