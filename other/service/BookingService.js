'use strict';

let sqlDb;

exports.bookingDbSetup = function(database) {
  sqlDb = database;
  console.log("Checking if booking table exists");
  return database.schema.hasTable("booking").then(exists => {

    if (!exists) {
      console.log("It doesn't so we create it");
      return database.schema.createTable("booking", table => {
        table.integer("eventId");
        table.integer("userId");
        table.foreign("userId").references("User.Id");
        table.foreign("eventId").references("event.id");
      });
    }
    
  });
};

/**
 * Get the user bookings
 * Get all bookings of a specific user
 *
 * userId Stirng Id of logged user
 **/
exports.findByUser = function(userId) {
  return sqlDb("booking")
        .where("userId", userId);
}


/**
 * Add reservation
 * Add a reservation to an event for the current user
 *
 * userId Integer The user ID
 * eventId Integer The event ID
 **/
exports.add = function(userId, eventId) {
  return sqlDb("booking")
        .insert({userId: userId, eventId: eventId});
}

