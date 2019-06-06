'use strict';

let sqlDb;

exports.bookAuthorsDbSetup = function(database) {
  sqlDb = database;
  console.log("Checking if book authors table exists");
  return database.schema.hasTable("bookAuthors").then(exists => {

    if (!exists) {
      console.log("It doesn't so we create it");
      return database.schema.createTable("bookAuthors", table => {
        table.increments('ISBN');
        table.text("AuthorId");
        table.foreign("ISBN").references("Book.ISBN");
        table.foreign("AuthorId").references("Author.Id");
      });
    }
    
  });
};