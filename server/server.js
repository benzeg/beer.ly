/* eslint no-console: 0 */
const express = require('express');
const https = require('https');
const app = express();
const db = require('./../db/index.js');

const ssl = require('./middleware/ssl.js');
const config = require('./config/config');
const api = require('./api/api');
const auth = require('./auth/auth');

// Connect to mysql
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'beerly'
});

connection.connect();

module.exports = connection;

// Middleware
require('./middleware/middleware')(app);

// API Routing
app.use('/api', api);

// Authentication
app.use('/auth', auth);

require('./middleware/webpack')(app, express);

https.createServer(ssl, app).listen(config.port);

console.info('==> 🍺  flowing on %ss. Open up https://localhost:%s/ in your browser.', config.port, config.port);
