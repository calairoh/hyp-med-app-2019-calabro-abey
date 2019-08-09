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
exports.getAll = function(offset, limit) {
    return sqlDb("event")
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
          .innerJoin("performerEvent", "performerEvent.eventId", "event.id")
          .innerJoin("performer", "performer.id", "performerEvent.performerId")
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
        .innerJoin("performerEvent", "performerEvent.eventId", "event.id")
        .innerJoin("performer", "performer.id", "performerEvent.performerId")
        .where("event.date", ">", start)
        .andWhere("event.date", "<", end)
        .offset(offset)
        .limit(limit);
}


/**
 * Finds event by type
 * Return all the events that have the argument type
 *
 * type The type you are looking for
 * returns Event
 **/
exports.findByType = function(type){
  return sqlDb('event')
        .where('event.type', type);
}

/**
 * Finds event by name
 * Return all the events that match the passed name
 *
 **/
exports.getTypes = function(){
  return sqlDb("event")
        .select("event.type")
        .distinct();
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
        .innerJoin("performerEvent", "performerEvent.eventId", "event.id")
        .innerJoin("performer", "performer.id", "performerEvent.performerId")
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
        .select("event.id", "event.name", "event.date", "event.location", "event.image", "event.description", "event.type", "event.seminarId", { seminarName: "seminar.name"})
        .leftJoin("seminar", "seminar.id", "event.seminarId")
        .where("event.id", id);
}

/**
 * Finds events by seminar
 * Return all events discussed in a specific seminar
 * 
 * id Integer The seminar ID
 * offset Integer The number of objects to skip (optional)
 * limit Integer The number of objects to take (optional)
 * returns Event
 */
exports.findBySeminar = function(id, offset, limit){
  return sqlDb("event")
        .where("event.seminarId", id)
        .offset(offset)
        .limit(limit);
}

function buildEvents(events){
  for(var i = 0; i < events.length; i++){
    var performers = sqlDb("performerEvent")
                    .select('performer.id', 'performer.name', 'performer.surname', 'performer.bio', 'performer.photo')
                    .innerJoin('performer', 'performer.id', 'performerEvent.performerId')
                    .where('eventId', events[i].id);
    
                    console.log(performers);
    for(var j = 0; j < performers.length; j++){
      events.performers.push(performers[j]);
    }
    console.log(events);
  }

  return events;
}