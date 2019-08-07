'use strict';

let sqlDb;

exports.performersDbSetup = function(database) {
  sqlDb = database;
  console.log("Checking if performers table exists");
  return database.schema.hasTable("performer").then(exists => {

    if (!exists) {
      console.log("It doesn't so we create it");
      return database.schema.createTable("performer", table => {
        table.increments('id');
        table.text("name");
        table.text("surname")
        table.text("photo");
        table.text("bio");
      });
    }
    
  });
};

/**
 * Get all performers
 * Return all performers in the store
 *
 * offset Integer The number of objects to skip (optional)
 * limit Integer The number of objects to take (optional)
 * returns Perfomer
 **/
exports.getAll = function(offset, limit) {
  return sqlDb("performer")
        .offset(offset)
        .limit(limit);
}


/**
 * Get performers by event
 * Return all performers that perform an event
 *
 * id String The event ID
 * offset Integer The number of objects to skip (optional)
 * limit Integer The number of objects to take (optional)
 * returns Perfomer
 **/
exports.findByEvent = function(id, offset, limit) {
  return sqlDb("performer")
        .innerJoin("performerEvent", "performerEvent.performerId", "performer.id")
        .where("performerEvent.eventId", id)
        .offset(offset)
        .limit(limit);
}

/**
 * Get performer by ID
 * Return performer by ID
 *
 * ID The performer ID
 * returns Perfomer
 **/
exports.getByID = function(id) {
  return sqlDb("performer")
        .where('id', id);
}

