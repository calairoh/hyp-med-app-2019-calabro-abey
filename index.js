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

let { setupDataLayer } = require("./service/DataLayer");

// swaggerRouter configuration
var options = {
  swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './controllers'),
  useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.join(__dirname,'api/swagger/swagger.yaml'), 'utf8');
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
  app.use(middleware.swaggerUi());

  app.use(serveStatic(__dirname + "/www"));

  app.use('/books/book/*', function(req, res, next){
    res.sendFile(path.join(__dirname + '/www/products/book.html'));
  });

  app.use('/events/event/*', function(req, res, next){
    res.sendFile(path.join(__dirname + '/www/products/event.html'));
  });

  app.use('/authors/author/*', function(req, res, next){
    res.sendFile(path.join(__dirname + '/www/products/event.html'));
  });

  app.use('/books', function(req, res, next){
    res.sendFile(path.join(__dirname + '/www/listing/listing.html'));
  });
  
  app.use('/events', function(req, res, next){
    res.sendFile(path.join(__dirname + '/www/listing/listing.html'));
  });

  app.use('/authors', function(req, res, next){
    res.sendFile(path.join(__dirname + '/www/listing/listing.html'));
  });

  app.use('/account/login', function(req, res, next){
    res.sendFile(path.join(__dirname + '/www/account/login.html'));
  });

  app.use('/account/register', function(req, res, next){
    res.sendFile(path.join(__dirname + '/www/account/register.html'));
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
