'use strict';

let sqlDb;

exports.booksDbSetup = function(database) {
  sqlDb = database;
  console.log("Checking if books table exists");
  return database.schema.hasTable("book").then(exists => {

    if (!exists) {
      console.log("It doesn't so we create it");
      return database.schema.createTable("book", table => {
        table.text("ISBN");
        table.text("Title");
        table.text("Editor");
        table.date("ReleaseDate");
        table.text("Synopsis");
        table.text("Language");
        table.text("Genres");
        table.text("Themes");
        table.integer("PageNumber");
        table.float("Price");
        table.float("ePrice");
        table.primary("ISBN");
      });
    }
    
  });
};

/**
 * Finds book by title
 * Only one title can be provide for a request
 *
 * title String Title value that need to be considered for filter
 * offset Integer Start offset (optional)
 * lenght Integer Result lenght (optional)
 * returns List
 **/
exports.findBookByTitle = function(title,offset,lenght) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
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
}, {
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
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Finds books by author
 * Author can be provied by his Id. You can provide only one author for a request
 *
 * authors Integer Author to filter by
 * offset Integer Start offset (optional)
 * lenght Integer Result lenght (optional)
 * returns List
 **/
exports.findBooksByAuthor = function(authors,offset,lenght) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
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
}, {
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
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Finds books by genres
 * Muliple genres can be provided with comma separated strings. Use         genre1, genre2, genre3 for testing.
 *
 * genres List Genres to filter by
 * offset Integer Start offset (optional)
 * lenght Integer Result lenght (optional)
 * returns List
 **/
exports.findBooksByGenre = function(genres,offset,lenght) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
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
}, {
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
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Finds books by themes
 * Muliple themes can be provided with comma separated strings. Use         theme1, theme2, theme3 for testing.
 *
 * themes List Themes to filter by
 * offset Integer Start offset (optional)
 * lenght Integer Result lenght (optional)
 * returns List
 **/
exports.findBooksByTheme = function(themes,offset,lenght) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
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
}, {
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
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Find book by ISBN
 * Returns a single book
 *
 * iSBN String ISBN of book to return
 * offset Integer Start offset (optional)
 * lenght Integer Result lenght (optional)
 * returns Book
 **/
exports.getBookByISBN = function(iSBN,offset,lenght) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
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
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get all books
 * Return all books in the DB
 *
 * offset Integer Start offset (optional)
 * lenght Integer Result lenght (optional)
 * returns Book
 **/
exports.getBooks = function(offset,lenght) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
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
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

