'use strict';

const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');

module.exports = (app) => {
  app.use(bodyParser.urlencoded({ extended: true })); // https://github.com/expressjs/body-parser
  app.use(bodyParser.json()); // https://github.com/expressjs/body-parser
  //initialize a session
  app.use(session({
    secret: 'fsdf*98263^45354%339',
    resave: false,
    saveUnitialized: true,
  }));
  app.use(morgan('dev')); // https://github.com/expressjs/morgan
};

