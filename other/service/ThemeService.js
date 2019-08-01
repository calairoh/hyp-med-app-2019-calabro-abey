'use strict';

let sqlDb;

exports.themesDbSetup = function(database){
  sqlDb = database;
}

/**
 * Get all themes
 * Return all themes in the DB
 *
 * offset Integer Start offset (optional)
 * lenght Integer Result lenght (optional)
 * returns Theme
 **/
exports.getThemes = function(offset,lenght) {
  return sqlDb("book")
          .select("Themes")
          .then(data => {
            var themesResult = new Set();
            for(let j = 0; j < data.length; j++){
              let stringThemes = data[j].Themes.split(',');
              for(let i = 0; i < stringThemes.length; i++){
                let stringTheme = stringThemes[i].replace(/\s/g, '');
                if(!themesResult.has(stringTheme)){
                  themesResult.add(stringTheme);
                }
              }                
            }

            let result = [];
            for(let item of themesResult)
              if(item != "")
                result.push({name: item});

            return result;            
          });
}


/**
 * Get genres by theme
 * Return all themes by a specific name
 *
 * name String The name to filter by
 * offset Integer Start offset (optional)
 * lenght Integer Result lenght (optional)
 * returns Theme
 **/
exports.getThemesByName = function(name,offset,lenght) {
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

