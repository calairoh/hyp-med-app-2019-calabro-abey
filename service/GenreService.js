'use strict';

let sqlDb;

exports.genresDbSetup = function(database){
  sqlDb = database;
}

/**
 * Get all genres
 * Return all genres in the DB
 *
 * offset Integer Start offset (optional)
 * lenght Integer Result lenght (optional)
 * returns Genre
 **/
exports.getGenres = function(offset,lenght) {
  return sqlDb("book")
          .select("Genres")
          .then(data => {
            var genresResult = new Set();
            for(let j = 0; j < data.length; j++){
              let stringGenres = data[j].Genres.split(',');
              for(let i = 0; i < stringGenres.length; i++){
                let stringGenre = stringGenres[i].replace(/\s/g, '');
                if(!genresResult.has(stringGenre)){
                  genresResult.add(stringGenre);
                }
              }                
            }

            let result = [];
            for(let item of genresResult)
              if(item != "")
                result.push({name: item});

            return result;            
          });
}


/**
 * Get genres by name
 * Return all genres by a specific name
 *
 * name String The name to filter by
 * offset Integer Start offset (optional)
 * lenght Integer Result lenght (optional)
 * returns Genre
 **/
exports.getGenresByName = function(name,offset,lenght) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "name" : "name"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

