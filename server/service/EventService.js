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
        table.text("Location");
        table.text("Description");
        table.foreign("ISBN").references("Book.ISBN");
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
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "date" : "2000-01-23",
  "book" : {
    "themes" : [ {
      "name" : "name"
    }, {
      "name" : "name"
    } ],
    "editor" : "Mondadori",
    "ePrice" : 5.962134,
    "pageNumber" : 6,
    "ISBN" : "ISBN",
    "releaseDate" : "2000-01-23",
    "genres" : [ {
      "name" : "name"
    }, {
      "name" : "name"
    } ],
    "price" : 1.4658129,
    "language" : "english",
    "synopsis" : "synopsis",
    "title" : "Harry Potter",
    "authors" : [ {
      "photo" : "photo",
      "bio" : "bio",
      "id" : 0
    }, {
      "photo" : "photo",
      "bio" : "bio",
      "id" : 0
    } ]
  },
  "name" : "name",
  "description" : "description",
  "location" : "location",
  "id" : 0
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
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
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "date" : "2000-01-23",
  "book" : {
    "themes" : [ {
      "name" : "name"
    }, {
      "name" : "name"
    } ],
    "editor" : "Mondadori",
    "ePrice" : 5.962134,
    "pageNumber" : 6,
    "ISBN" : "ISBN",
    "releaseDate" : "2000-01-23",
    "genres" : [ {
      "name" : "name"
    }, {
      "name" : "name"
    } ],
    "price" : 1.4658129,
    "language" : "english",
    "synopsis" : "synopsis",
    "title" : "Harry Potter",
    "authors" : [ {
      "photo" : "photo",
      "bio" : "bio",
      "id" : 0
    }, {
      "photo" : "photo",
      "bio" : "bio",
      "id" : 0
    } ]
  },
  "name" : "name",
  "description" : "description",
  "location" : "location",
  "id" : 0
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
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
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "date" : "2000-01-23",
  "book" : {
    "themes" : [ {
      "name" : "name"
    }, {
      "name" : "name"
    } ],
    "editor" : "Mondadori",
    "ePrice" : 5.962134,
    "pageNumber" : 6,
    "ISBN" : "ISBN",
    "releaseDate" : "2000-01-23",
    "genres" : [ {
      "name" : "name"
    }, {
      "name" : "name"
    } ],
    "price" : 1.4658129,
    "language" : "english",
    "synopsis" : "synopsis",
    "title" : "Harry Potter",
    "authors" : [ {
      "photo" : "photo",
      "bio" : "bio",
      "id" : 0
    }, {
      "photo" : "photo",
      "bio" : "bio",
      "id" : 0
    } ]
  },
  "name" : "name",
  "description" : "description",
  "location" : "location",
  "id" : 0
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

