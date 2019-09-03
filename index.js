'use strict';

require('dotenv').config();

var fs = require('fs'),
    path = require('path'),
    http = require('http');

var app = require('express')();
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var serveStatic = require("serve-static");
let cookieSession = require("cookie-session");
let cookieParser = require("cookie-parser");
var serverPort = process.env.PORT || 8080;

console.log(process.env.DATABASE_URL);

let { setupDataLayer } = require("./other/service/DataLayer");

// swaggerRouter configuration
var options = {
  swaggerUi: path.join(__dirname, './other/swagger.json'),
  controllers: path.join(__dirname, './other/controllers'),
  useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

var uiOptions = {
  swaggerUi: '/backend/swaggerui'
}

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.join(__dirname,'other/api/swagger/spec.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);


// Cookie
app.use(cookieParser());
app.use(cookieSession({ name: "session", keys: ["abc", "def"] }));

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi(uiOptions));

  app.use(serveStatic(__dirname + "/public"));

  app.use('/seminars/seminar/*', function(req, res, next){
    res.sendFile(path.join(__dirname + '/public/pages/singles/seminar.html'));
  });

  app.use('/events/event/*', function(req, res, next){
    res.sendFile(path.join(__dirname + '/public/pages/singles/event.html'));
  });

  app.use('/events/types', function(req, res, next){
    res.sendFile(path.join(__dirname + '/public/pages/listing/listing.html'));
  });

  app.use('/performers/performer/*', function(req, res, next){
    res.sendFile(path.join(__dirname + '/public/pages/singles/performer.html'));
  });

  app.use('/events/today', function(req, res, next){
    res.sendFile(path.join(__dirname + '/public/pages/groups/today.html'))
  });

  app.use('/calendar', function(req, res, next){
    res.sendFile(path.join(__dirname + '/public/pages/groups/calendar.html'));
  });

  app.use('/seminars', function(req, res, next){
    res.sendFile(path.join(__dirname + '/public/pages/listing/listing.html'));
  });
  
  app.use('/events', function(req, res, next){
    res.sendFile(path.join(__dirname + '/public/pages/listing/listing.html'));
  });

  app.use('/performers', function(req, res, next){
    res.sendFile(path.join(__dirname + '/public/pages/listing/listing.html'));
  });

  app.use('/account/login', function(req, res, next){
    res.sendFile(path.join(__dirname + '/public/pages/account/login.html'));
  });

  app.use('/account/register', function(req, res, next){
    res.sendFile(path.join(__dirname + '/public/pages/account/register.html'));
  });  

  app.use('/account/reservation', function(req, res, next){
    res.sendFile(path.join(__dirname + '/public/pages/account/reservation.html'));
  });  

  app.use('/account/reservations', function(req, res, next){
    res.sendFile(path.join(__dirname + '/public/pages/account/reservations.html'));
  }); 

  app.use('/contact-us', function(req, res, next){
    res.sendFile(path.join(__dirname + '/public/pages/singles/contact-us.html'));
  });

  app.use('/info/reservation', function(req, res, next){
    res.sendFile(path.join(__dirname + '/public/pages/singles/reservation-info.html'));
  });

  app.use('/info', function(req, res, next){
    res.sendFile(path.join(__dirname + '/public/pages/singles/festival-info.html'));
  });

  app.use('/notfound', function(req, res, next){
    res.sendFile(path.join(__dirname + '/public/pages/errors/404.html'));
  });  

  app.use('/backend/spec.yaml', function(req, res, next){
    res.sendFile(path.join(__dirname + '/other/api/swagger/spec.yaml'));
  });

  app.use('/backend/app.zip', function(req, res, next){
    res.sendFile(path.join(__dirname + '/public/assets/downloads/app.zip'));
  });

  app.use('/backend/*', function(req, res, next){
    res.sendFile(path.join(__dirname + '/public/pages/backend/main.html'));
  });

  app.use('/backend', function(req, res, next){
    res.sendFile(path.join(__dirname + '/public/pages/backend/main.html'));
  });

  app.use('*', function(req, res, next){
    res.sendFile(path.join(__dirname + '/public/pages/errors/404.html'));
  });

  setupDataLayer().then(() => {
    // Start the server
    http.createServer(app).listen(serverPort, function() {
      console.log(
        "Your server is listening on port %d (http://localhost:%d)",
        serverPort,
        serverPort
      );

      console.log(
        "Swagger-ui is available on http://localhost:%d/docs",
        serverPort
      );
    });
  });

});
