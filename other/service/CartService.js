'use strict';

let sqlDb;

exports.cartDbSetup = function(database) {
  sqlDb = database;
  console.log("Checking if cart table exists");
  return database.schema.hasTable("cart").then(exists => {

    if (!exists) {
      console.log("It doesn't so we create it");
      return database.schema.createTable("cart", table => {
        table.text("UserId");
        table.text("ISBN");
        table.integer("Quantity");
        table.foreign("UserId").references("User.Id");
        table.foreign("ISBN").references("Book.ISBN");
      });
    }
    
  });
};

/**
 * Create cart element
 * Add an element to current user cart
 *
 * cart Cart The cart element object
 * no response value expected for this operation
 **/
exports.createCartElement = function(cart) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get the user cart
 * Get the cart of a specific user
 *
 * username String The username of the user cart
 * no response value expected for this operation
 **/
exports.findCartByUser = function(username) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

