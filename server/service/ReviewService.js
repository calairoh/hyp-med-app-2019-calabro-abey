'use strict';

let sqlDb;

exports.reviewsDbSetup = function(database) {
  sqlDb = database;
  console.log("Checking if reviews table exists");
  return database.schema.hasTable("review").then(exists => {

    if (!exists) {
      console.log("It doesn't so we create it");
      return database.schema.createTable("review", table => {
        table.increments('Id');
        table.text("UserId");
        table.text("ISBN");
        table.integer("Rate");
        table.integer("Content");
        table.datetime("DateTime");
        table.foreign("ISBN").references("Book.ISBN");
        table.foreign("UserId").references("User.Id");
        table.primary("Id");
      });
    }
    
  });
};

/**
 * Create review
 * Add a review for a specific book
 *
 * user Review The review object
 * no response value expected for this operation
 **/
exports.createReview = function(user) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * All the reviews of a book
 * Return all reviews of a specific book
 *
 * iSBN String The book ISBN to filter by
 * offset Integer Start offset (optional)
 * lenght Integer Result lenght (optional)
 * returns Review
 **/
exports.getReviewsByBook = function(iSBN,offset,lenght) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "date" : "2000-01-23",
  "rate" : 1,
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
  "id" : 0,
  "user" : {
    "firstName" : "firstName",
    "lastName" : "lastName",
    "country" : "country",
    "password" : "password",
    "address" : "address",
    "city" : "city",
    "phone" : "phone",
    "postalCode" : "postalCode",
    "id" : 6,
    "email" : "email",
    "username" : "username"
  },
  "content" : "content"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

