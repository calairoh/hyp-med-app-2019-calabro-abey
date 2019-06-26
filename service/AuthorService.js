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

/**
 * Get authors by book
 * Return all authors that wrote a specific book
 *
 * ISBN The book ISBN to search for
 * returns Authors
 **/
exports.getAuthorsByBook = function(ISBN) {
  return sqlDb("author")
        .select("Id", "NameSurname", "Photo", "Bio")
        .innerJoin("bookAuthors", 'author.Id', 'bookAuthors.AuthorId')
        .where('bookAuthors.ISBN', ISBN);
}

