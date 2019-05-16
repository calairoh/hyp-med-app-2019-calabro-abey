'use strict';

let sqlDb;

exports.eventsDbSetup = function(database) {
  sqlDb = database;
  console.log("Checking if events table exists");
  return database.schema.hasTable("event").then(exists => {

    if (!exists) {
      console.log("It doesn't so we create it");
      return database.schema.createTable("event", table => {
        table.increments('Id');
        table.text("ISBN");
        table.text("Name");
        table.text("Location");
        table.text("Description");
        table.foreign("ISBN").references("book.ISBN");
        table.primary("Id");
      });
    }
    
  });
};

/**
 * Get all events
 * Return all events in the DB
 *
 * offset Integer Start offset (optional)
 * lenght Integer Result lenght (optional)
 * returns Event
 **/
exports.getEvents = function(offset,lenght) {
    return sqlDb("event")
          .innerjoin("book", 'book.ISBN', 'event.ISBN')
          .offset(offset)
          .limit(lenght);
}


/**
 * Get the event by presented book
 * Return all event in which is presented a specific book
 *
 * iSBN String The book ISBN to filter by
 * offset Integer Start offset (optional)
 * lenght Integer Result lenght (optional)
 * returns Event
 **/
exports.getEventsByBook = function(iSBN,offset,lenght) {
  return sqlDb("event")
          .innerjoin("book", 'book.ISBN', 'event.ISBN')
          .where("event.ISBN", iSBN)
          .offset(offset)
          .limit(lenght);
}


/**
 * Get event by name
 * Return all event by a specific name
 *
 * name String The name to filter by
 * offset Integer Start offset (optional)
 * lenght Integer Result lenght (optional)
 * returns Event
 **/
exports.getEventsByName = function(name,offset,lenght) {
  return sqlDb("event")
        .innerjoin("book", "book.ISBN", "event.ISBN")
        .where("event.Name", "like", "%" + name + "%")
        .offset(offset)
        .limit(lenght);
}


