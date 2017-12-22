'use strict';

require('./api/data/db.js');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const routes = require('./api/routes');

// Define port to run on //
app.set('port', 3000);

// Add middle-ware to console log every request //
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// Set static directory before defining routes //
app.use(express.static(path.join(__dirname, 'public')));

// Enable parsing of posted forms //
app.use(bodyParser.urlencoded({ extended : false }));

// Add some routing //
app.use('/api', routes);

// Listen for requests //
const server = app.listen(app.get('port'), () => {
  const port = server.address().port;
  console.log(`Server is listening for requests on port ${port}.`);
});
