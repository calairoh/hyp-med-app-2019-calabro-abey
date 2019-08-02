const sqlDbFactory = require("knex");

let { seminarsDbSetup } = require("./SeminarService");
let { performersDbSetup } = require("./PerformerService");
let { usersDbSetup } = require("./UserService");
let { bookingDbSetup } = require("./BookingService");
let { eventsDbSetup } = require("./EventService");
let { performerEventDbSetup } = require("./PerformerEventService");

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
  seminarsDbSetup(sqlDb);
  performersDbSetup(sqlDb);
  usersDbSetup(sqlDb);
  genresDbSetup(sqlDb);
  themesDbSetup(sqlDb);
}

async function setupDataLayer() {
  console.log("Setting up data layer");
  
  await strongEntitiesSetup();

  performerEventDbSetup(sqlDb);
  eventsDbSetup(sqlDb);
  reviewsDbSetup(sqlDb);
  return bookingDbSetup(sqlDb);
}

module.exports = { database: sqlDb, setupDataLayer };