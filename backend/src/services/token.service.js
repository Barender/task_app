const moment = require('moment');
const jwt = require('jsonwebtoken');
const config = require('../config/config.js');
const Token = require('../models/token.model.js');

// generate a token
const generateNewToken = (userId, role, expires, type, secret = config.JWT_SECRET) => {
  const payload = {
    id: userId,
    role,
    iat: moment().unix(),
    exp: expires.unix(),
    type
  };
  return jwt.sign(payload, secret);
};

// store token in token collection
const storeToken = async (token, userId, expires, type) => {
  const tokenDoc = await Token.create({
    token,
    user: userId,
    expires: expires.toDate(),
    type
  });
  return tokenDoc;
};

// verify current user token
const verifyToken = async (token, type) => {
  try {
    const payload = jwt.verify(token, config.JWT_SECRET);
    const tokenDoc = await Token.findOne({
      token,
      type,
      user: payload.id
    });

    if (!tokenDoc) return false;
    return tokenDoc;
  } catch (e) {
    return false;
  }
};

// generate auth token
const generateAuthToken = async (user) => {
  // remove any previous token
  await Token.deleteMany({ user: user.id });

  const accessTokenExpires = moment().add(config.JWT_ACCESS_EXPIRATION_TIME, 'minutes');
  const accessToken = generateNewToken(user.id, user.role, accessTokenExpires, config.ACCESS_TOKEN);

  const refreshTokenExpires = moment().add(config.JWT_REFRESH_EXPIRATION_DAYS, 'days');
  const refreshToken = generateNewToken(user.id, user.role, refreshTokenExpires, config.REFRESH_TOKEN);

  await storeToken(refreshToken, user.id, refreshTokenExpires, config.REFRESH_TOKEN);
  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate()
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate()
    }
  };
};

// remove token from collection
const removeSavedToken = async (token) => {
  try {
    const tokenData = await Token.findOneAndRemove({
      token: token,
      type: config.REFRESH_TOKEN
    });
    if (!tokenData) return false;
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = {
  generateNewToken,
  storeToken,
  verifyToken,
  generateAuthToken,
  removeSavedToken
};
