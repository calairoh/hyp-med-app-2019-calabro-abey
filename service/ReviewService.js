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
    return sqlDb("review").insert({userId: user.user.Id}, 
                          {ISBN: user.book.ISBN}, 
                          {rate: user.rate}, 
                          {content: user.content},
                          {datetime: Date.now()});
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
  return sqlDb("review")
        .where("ISBN", iSBN)
        .offset(offset)
        .lenght(lenght);
}

