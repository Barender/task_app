require('dotenv').config();

const DEFAULT_PORT = 5001;

const config = {
  NODE_ENV: process.env.NODE_ENV,
  DB_URL: process.env.DB_URL,
  PORT: process.env.PORT || DEFAULT_PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  BASE_PATH: process.env.BASE_PATH,
  ACCESS_TOKEN: process.env.ACCESS_TOKEN,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN,
  JWT_REFRESH_EXPIRATION_DAYS: process.env.JWT_REFRESH_EXPIRATION_DAYS,
  JWT_ACCESS_EXPIRATION_TIME: process.env.JWT_ACCESS_EXPIRATION_TIME,
  FRONTEND_HOST: process.env.FRONTEND_HOST,
  ALLOWED_ORIGINS: [process.env.CLIENT_URL],
  API_KEY: process.env.API_KEY
};

module.exports = config;
