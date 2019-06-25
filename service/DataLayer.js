const sqlDbFactory = require("knex");

let { booksDbSetup } = require("./BookService");
let { authorsDbSetup } = require("./AuthorService");
let { usersDbSetup } = require("./UserService");
let { cartDbSetup } = require("./CartService");
let { eventsDbSetup } = require("./EventService");
let { reviewsDbSetup } = require("./ReviewService");
let { bookAuthorsDbSetup } = require("./AuthorBookService");
let { genresDbSetup } = require("./GenreService"); 
let { themesDbSetup } = require("./ThemeService");

console.log(process.env.DATABASE_URL);

var sqlDb = sqlDbFactory({
  client: process.env.CLIENT,
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'standard',
    database: 'library'
  },
  ssl: true,
  debug: true
});

async function strongEntitiesSetup(){
  booksDbSetup(sqlDb);
  authorsDbSetup(sqlDb);
  usersDbSetup(sqlDb);
  genresDbSetup(sqlDb);
  themesDbSetup(sqlDb);
}

async function setupDataLayer() {
  console.log("Setting up data layer");
  
  await strongEntitiesSetup();

  bookAuthorsDbSetup(sqlDb);
  eventsDbSetup(sqlDb);
  reviewsDbSetup(sqlDb);
  return cartDbSetup(sqlDb);
}

module.exports = { database: sqlDb, setupDataLayer };