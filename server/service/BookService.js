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
  return sqlDb("book")
    .where('Title', 'like', '%' + title + '%')
    .offset(offset)
    .limit(lenght)
    .then(data => {
      return data.map(e => {
        let arrayGenres = e.Genres.split(',');
        let arrayThemes = e.Themes.split(',');
        e.Genres = [];
        e.Themes = [];

        for(let i = 0; i < arrayGenres.length; i++)
          e.Genres.push({
            name: arrayGenres[i]
          });

        for(let i = 0; i < arrayThemes.length; i++)
          e.Themes.push({
            name: arrayThemes[i]
          });

        return e;
      });
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
  return sqlDb("book")
        .innerjoin("bookAuthors", 'book.ISBN', 'bookAuthors.ISBN')
        .where('bookAuthors.AuthorId', authors)
        .offset(offset)
        .limit(lenght)
        .then(data => {
          return data.map(e => {
            let arrayGenres = e.Genres.split(',');
            let arrayThemes = e.Themes.split(',');
            e.Genres = [];
            e.Themes = [];
    
            for(let i = 0; i < arrayGenres.length; i++)
              e.Genres.push({
                name: arrayGenres[i]
              });
    
            for(let i = 0; i < arrayThemes.length; i++)
              e.Themes.push({
                name: arrayThemes[i]
              });
    
            return e;
          });
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
  let queryWhere = "";
  genres = genres[0].split(",");

  for(let i = 0; i < genres.length; i++) {
    queryWhere += '"Genres" like ' + "'%{0}%'".replace('{0}', genres[i]);

    if(i < genres.length - 1)
      queryWhere += ' and ';
  }

  return sqlDb("book")
        .whereRaw(queryWhere)
        .offset(offset)
        .limit(lenght)
        .then(data => {
          return data.map(e => {
            let arrayGenres = e.Genres.split(',');
            let arrayThemes = e.Themes.split(',');
            e.Genres = [];
            e.Themes = [];
    
            for(let i = 0; i < arrayGenres.length; i++)
              e.Genres.push({
                name: arrayGenres[i]
              });
    
            for(let i = 0; i < arrayThemes.length; i++)
              e.Themes.push({
                name: arrayThemes[i]
              });
    
            return e;
          });
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
  let queryWhere = "";
  themes = themes[0].split(",");

  for(let i = 0; i < themes.length; i++) {
    queryWhere += '"Themes" like ' + "'%{0}%'".replace('{0}', themes[i]);

    if(i < themes.length - 1)
      queryWhere += ' and ';
  }

  return sqlDb("book")
        .whereRaw(queryWhere)
        .offset(offset)
        .limit(lenght)
        .then(data => {
          return data.map(e => {
            let arrayGenres = e.Genres.split(',');
            let arrayThemes = e.Themes.split(',');
            e.Genres = [];
            e.Themes = [];
    
            for(let i = 0; i < arrayGenres.length; i++)
              e.Genres.push({
                name: arrayGenres[i]
              });
    
            for(let i = 0; i < arrayThemes.length; i++)
              e.Themes.push({
                name: arrayThemes[i]
              });
    
            return e;
          });
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
  return sqlDb("book")
        .where("ISBN", iSBN)
        .offset(offset)
        .limit(lenght)
        .then(data => {
          return data.map(e => {
            let arrayGenres = e.Genres.split(',');
            let arrayThemes = e.Themes.split(',');
            e.Genres = [];
            e.Themes = [];
    
            for(let i = 0; i < arrayGenres.length; i++)
              e.Genres.push({
                name: arrayGenres[i]
              });
    
            for(let i = 0; i < arrayThemes.length; i++)
              e.Themes.push({
                name: arrayThemes[i]
              });
    
            return e;
          });
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
  return sqlDb("book")
        .offset(offset)
        .limit(lenght)
        .then(data => {
          return data.map(e => {
            let arrayGenres = e.Genres.split(',');
            let arrayThemes = e.Themes.split(',');
            e.Genres = [];
            e.Themes = [];
    
            for(let i = 0; i < arrayGenres.length; i++)
              e.Genres.push({
                name: arrayGenres[i]
              });
    
            for(let i = 0; i < arrayThemes.length; i++)
              e.Themes.push({
                name: arrayThemes[i]
              });
    
            return e;
          });
        });
}

