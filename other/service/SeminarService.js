'use strict';

let sqlDb;

exports.seminarsDbSetup = function(database) {
  sqlDb = database;
  console.log("Checking if seminars table exists");
  return database.schema.hasTable("seminar").then(exists => {

    if (!exists) {
      console.log("It doesn't so we create it");
      return database.schema.createTable("seminar", table => {
        table.increments("id");
        table.text("name");
        table.date("start");
        table.date("end");
        table.text("location");
        table.text("description");
      });
    }
    
  });
};

/**
 * Get seminar by ID
 * Return seminar by ID
 *
 * ID String The seminar ID
 * returns Seminar
 **/
exports.getByID = function(id) {
  return sqlDb("seminar")
    .where('id', id);
}

/**
 * Get seminar by name
 * Return all the seminars that match the passed name
 *
 * name String The name to filter by
 * offset Integer The number of objects to skip (optional)
 * limit Integer The number of objects to take (optional)
 * returns Seminars
 **/
exports.findByName = function(name, offset, limit) {
  return sqlDb("seminar")
    .where('name', 'like', '%' + name + '%')
    .offset(offset)
    .limit(limit);
}

/**
 * Get seminar by event
 * Return all the seminars that match the passed name
 *
 * ID Integer The event ID
 * offset Integer The number of objects to skip (optional)
 * limit Integer The number of objects to take (optional)
 * returns Seminars
 **/
exports.findByEvent = function(id, offset, limit) {
  return sqlDb("seminar")
    .innerjoin("event", "event.seminarId", "seminar.id")
    .where('event.id', id)
    .offset(offset)
    .limit(limit);
}

/**
 * Get all seminars
 * Return all seminars in the store
 *
 * offset Integer The number of objects to skip (optional)
 * limit Integer The number of objects to take (optional)
 * returns Seminars
 **/
exports.getAll = function(offset, limit) {
  return sqlDb("seminar")
        .offset(offset)
        .limit(limit);
}

