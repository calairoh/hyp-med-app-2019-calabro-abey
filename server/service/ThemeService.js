'use strict';


/**
 * Get all themes
 * Return all themes in the DB
 *
 * offset Integer Start offset (optional)
 * lenght Integer Result lenght (optional)
 * returns Theme
 **/
exports.getThemes = function(offset,lenght) {
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

