'use strict';

let sqlDb;

exports.usersDbSetup = function(database) {
  sqlDb = database;
  console.log("Checking if users table exists");
  return database.schema.hasTable("user").then(exists => {

    if (!exists) {
      console.log("It doesn't so we create it");
      return database.schema.createTable("user", table => {
        table.increments('Id');
        table.text("Username");
        table.text("Password");
        table.text("Name");
        table.text("Surname");
        table.text("Address");
        table.text("City");
        table.text("PostalCode");
        table.text("Country");
        table.primary("Id");
      });
    }
    
  });
};

/**
 * Create user
 * This can only be done by the logged in user.
 *
 * body User Created user object
 * no response value expected for this operation
 **/
exports.createUser = function(body) {
    return sqlDb("user").insert(body);
}


/**
 * Delete user
 * This can only be done by the logged in user.
 *
 * username String The name that needs to be deleted
 * no response value expected for this operation
 **/
exports.deleteUser = function(username) {
  return sqlDb("user")
          .where("Id", user.Id)
          .del();
}


/**
 * Get user by user name
 * 
 *
 * username String The name that needs to be fetched. Use user1 for testing. 
 * returns User
 **/
exports.getUserByName = function(username) {
  return sqlDb("user")
          .where("Username", username)
          .then(data => {
            data.map(
            e => {
              return e;
            });
            return data;
        });
}


/**
 * Logs user into the system
 * 
 *
 * username String The user name for login
 * password String The password for login in clear text
 * returns String
 **/
exports.loginUser = function(username,password) {
  return sqlDb("user")
         .where("Username", username)
         .then(data => {
          data.map(e => {
            return e;
          });
          return data;
      });
}


/**
 * Logs out current logged in user session
 * 
 *
 * no response value expected for this operation
 **/
exports.logoutUser = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Updated user
 * This can only be done by the logged in user.
 *
 * username String name that need to be updated
 * body User Updated user object
 * no response value expected for this operation
 **/
exports.updateUser = function(username,body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

