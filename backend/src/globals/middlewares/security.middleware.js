const hpp = require('hpp');
const cors = require('cors');
const xss = require('xss-clean');
const helmet = require('helmet');
const passport = require('passport');
const httpStatus = require('http-status');
const compression = require('compression');
const { json, urlencoded } = require('express');
const config = require('../../config/config.js');
const mongoSanitize = require('express-mongo-sanitize');
const CustomError = require('../utility/customError.js');

const securityMiddleware = (app) => {
  // http parameters pollution security
  app.use(hpp());
  // set security HTTP headers
  app.use(helmet());
  // sanitize request data
  app.use(xss());
  app.use(mongoSanitize());
  // gzip compression
  app.use(compression());
  // parse json request body
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  // reducing fingerprint
  app.disable('x-powered-by');
  // enable cors
  app.use(
    cors({
      origin: (origin, callback) => {
        if (config.ALLOWED_ORIGINS) {
          callback(null, true);
        } else {
          callback(new CustomError(httpStatus.FORBIDDEN, 'Invalid access blocked by CORS'));
        }
      },
      credentials: true,
      optionsSuccessStatus: 200,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
    })
  );
  // jwt authentication
  app.use(passport.initialize());
};

module.exports = securityMiddleware;
