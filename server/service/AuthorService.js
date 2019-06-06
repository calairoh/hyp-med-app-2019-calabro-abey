'use strict';

let sqlDb;

exports.authorsDbSetup = function(database) {
  sqlDb = database;
  console.log("Checking if authors table exists");
  return database.schema.hasTable("author").then(exists => {

    if (!exists) {
      console.log("It doesn't so we create it");
      return database.schema.createTable("author", table => {
        table.increments('Id');
        table.text("NameSurname");
        table.text("Photo");
        table.text("Bio");
        table.primary("Id");
      });
    }
    
  });
};

/**
 * Get all authors
 * Return all authors in the DB
 *
 * offset Integer Start offset (optional)
 * lenght Integer Result lenght (optional)
 * returns Author
 **/
exports.getAuthors = function(offset,lenght) {
  return sqlDb("author")
        .offset(offset)
        .limit(lenght)
        .then();
}


/**
 * Get authors by name
 * Return all authors by a specific name
 *
 * name String The name to filter by
 * offset Integer Start offset (optional)
 * lenght Integer Result lenght (optional)
 * returns Author
 **/
exports.getAuthorsByName = function(name,offset,lenght) {
  return sqlDb("author")
        .where("NameSurname", "like", "%" + name + "%")
        .offset(offset)
        .limit(lenght);
}

