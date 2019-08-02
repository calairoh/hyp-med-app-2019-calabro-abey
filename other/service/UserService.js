'use strict';

let sqlDb;

exports.usersDbSetup = function(database) {
  sqlDb = database;
  console.log("Checking if users table exists");
  return database.schema.hasTable("user").then(exists => {

    if (!exists) {
      console.log("It doesn't so we create it");
      return database.schema.createTable("user", table => {
        table.increments('id');
        table.text("username");
        table.text("password");
        table.text("email");
        table.text("firstName");
        table.text("lastName");
        table.text("address");
        table.text("city");
        table.text("postalCode");
        table.text("country");
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
          .where("id", user.Id)
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
          .where("username", username)
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
         .where("username", username)
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

