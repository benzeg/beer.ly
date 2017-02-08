/* eslint no-console: 0 */
const express = require('express');
const https = require('https');
const app = express();
const sequelize = require('sequelize');

const ssl = require('./middleware/ssl.js');
const config = require('./config/config');
const api = require('./api/api');
const auth = require('./auth/auth');

// Connect to mySQL server


// Middleware
require('./middleware/middleware')(app);

// API Routing
app.use('/api', api);

// Authentication
app.use('/auth', auth);

require('./middleware/webpack')(app, express);

https.createServer(ssl, app).listen(config.port);

console.info('==> 🍺  flowing on %ss. Open up https://localhost:%s/ in your browser.', config.port, config.port);
