'use strict';


/**
 * Get all authors
 * Return all authors in the DB
 *
 * offset Integer Start offset (optional)
 * lenght Integer Result lenght (optional)
 * returns Author
 **/
exports.getAuthors = function(offset,lenght) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "photo" : "photo",
  "bio" : "bio",
  "id" : 0
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
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
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "photo" : "photo",
  "bio" : "bio",
  "id" : 0
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

