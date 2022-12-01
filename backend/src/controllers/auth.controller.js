const httpStatus = require('http-status');
const config = require('../config/config.js');
const User = require('../models/User.model.js');
const CustomError = require('../globals/utility/CustomError.js');
const tokenService = require('../services/token.service.js');
const asyncHandler = require('../globals/middlewares/asyncHandler.js');

// @desc    Signin user
// @route   POST /api/v1/auth/signin
// @access  Public
const userSignin = asyncHandler(async (req, res, next) => {
  const { apiKey, name } = req.body;

  if (apiKey === config.API_KEY) {
    // create if no user exists
    const users = await User.find({});
    if (users.length > 0) {
      // Check user exists
      const user = await User.findOne({ name });
      if (!user) return next(new CustomError(httpStatus.NOT_FOUND, 'No user found'));

      // verify api key
      if (!apiKey) return next(new CustomError(httpStatus.BAD_REQUEST, 'No api key provided'));

      // Generate token
      const tokens = await tokenService.generateAuthToken(user);
      // Final result
      res.status(httpStatus.OK).json({ success: true, result: { user, ...tokens } });
    } else {
      // create a user id database is empty
      const user = await User.create({ name });

      // Generate token
      const tokens = await tokenService.generateAuthToken(user);
      // Final result
      res.status(httpStatus.OK).json({ success: true, result: { user, ...tokens } });
    }
  } else {
    return next(new CustomError(httpStatus.BAD_REQUEST, 'Api key provided is incorrect'));
  }
});

// @desc    Signout user
// @route   POST /api/v1/auth/signout
// @access  Private
const userSignout = asyncHandler(async (req, res, next) => {
  const { refreshToken } = req.body;

  // Validate token
  const isValidToken = await tokenService.verifyToken(refreshToken, config.REFRESH_TOKEN);
  if (!isValidToken) return next(new CustomError(httpStatus.BAD_REQUEST, 'This request is invalid'));

  // Update record
  await tokenService.removeSavedToken(refreshToken);

  // Final result
  res.status(httpStatus.ACCEPTED).json({ success: true, result: 'Logout successful' });
});

// @desc    Get user information
// @route   POST /api/v1/auth/user
// @access  Private
const getUser = asyncHandler(async (req, res, next) => {
  const user = req.user;

  // Final result
  res.status(httpStatus.OK).json({
    success: true,
    result: user
  });
});

const authController = {
  userSignin,
  userSignout,
  getUser
};
module.exports = authController;
