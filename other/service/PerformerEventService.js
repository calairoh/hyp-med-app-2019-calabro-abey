'use strict';

let sqlDb;

exports.performerEventDbSetup = function(database) {
  sqlDb = database;
  console.log("Checking if performer events table exists");
  return database.schema.hasTable("performerEvent").then(exists => {

    if (!exists) {
      console.log("It doesn't so we create it");
      return database.schema.createTable("performerEvent", table => {
        table.integer('eventId');
        table.integer("performerId");
        //table.foreign("eventId").references("event.id");
        //table.foreign("performerId").references("performer.id");
      });
    }    
  });
};