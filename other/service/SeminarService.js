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
        table.text("image");
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
exports.getSeminarByID = function(id) {
  return sqlDb("seminar")
    .where('id', id);
}

/**
 * Get all seminars
 * Return all seminars in the store
 *
 * offset Integer The number of objects to skip (optional)
 * limit Integer The number of objects to take (optional)
 * returns Seminars
 **/
exports.getAllSeminars = function(offset, limit) {
  return sqlDb("seminar")
        .offset(offset)
        .limit(limit);
}

