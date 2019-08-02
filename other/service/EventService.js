'use strict';

let sqlDb;

exports.eventsDbSetup = function(database) {
  sqlDb = database;
  console.log("Checking if events table exists");
  return database.schema.hasTable("event").then(exists => {

    if (!exists) {
      console.log("It doesn't so we create it");
      return database.schema.createTable("event", table => {
        table.increments('id');
        table.text("type");
        table.text("image");
        table.text("name");
        table.text("location");
        table.date("date");
        table.string("description");
        table.integer("seminarId");
        table.foreign("seminarId").references("seminar.id");
        table.primary("id");
      });
    }    
  });
};

/**
 * Get all events
 * Return all events in the DB
 *
 * offset Integer The number of objects to skip (optional)
 * limit Integer The number of objects to take (optional)
 * returns Event
 **/
exports.getEvents = function(offset, limit) {
    return sqlDb("event")
          .innerjoin("performerEvent", "performerEvent.eventId", "event.id")
          .innerjoin("performer", "performer.id", "performerEvent.performerId")
          .offset(offset)
          .limit(limit);
}


/**
 * Finds event by name
 * Return all the events that match the passed name
 *
 * name String The name of the event you are looking for
 * offset Integer The number of objects to skip (optional)
 * limit Integer The number of objects to take (optional)
 * returns Event
 **/
exports.findByName = function(name, offset, limit) {
  return sqlDb("event")
          .innerjoin("performerEvent", "performerEvent.eventId", "event.id")
          .innerjoin("performer", "performer.id", "performerEvent.performerId")
          .where("event.name", "like", "%" + name + "%")
          .offset(offset)
          .limit(limit);
}


/**
 * Finds events by date
 * Returns all the events that will be presented in the passed date range
 *
 * start Date The range start date
 * end Date The range end date
 * offset Integer The number of objects to skip (optional)
 * limit Integer The number of objects to take (optional)
 * returns Event
 **/
exports.findByDate = function(start, end ,offset, limit) {
  return sqlDb("event")
        .innerjoin("performerEvent", "performerEvent.eventId", "event.id")
        .innerjoin("performer", "performer.id", "performerEvent.performerId")
        .where("event.date", ">", start)
        .andWhere("event.date", "<", end)
        .offset(offset)
        .limit(limit);
}

/**
 * Finds events by performer
 * Return all events performed by a specific artist
 * 
 * id Integer The performer ID
 * offset Integer The number of objects to skip (optional)
 * limit Integer The number of objects to take (optional)
 * returns Event
 */
exports.findByPerformer = function(id, offset, limit){
  return sqlDb("event")
        .innerjoin("performerEvent", "performerEvent.eventId", "event.id")
        .innerjoin("performer", "performer.id", "performerEvent.performerId")
        .where("performer.id", id)
        .offset(offset)
        .limit(limit);
}

/**
 * Find event by ID
 * Returns the single event with the passed ID
 * 
 * id Integer The event ID
 * returns Event
 */
exports.getByID = function(id){
  return sqlDb("event")
        .innerjoin("performerEvent", "performerEvent.eventId", "event.id")
        .innerjoin("performer", "performer.id", "performerEvent.performerId")
        .where("event.id", id);
}