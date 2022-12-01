const express = require('express');
const roles = require('../globals/permissions/roles.js');
const validate = require('../globals/validations/validator.js');
const authController = require('../controllers/auth.controller.js');
const protect = require('../globals/middlewares/auth.middleware.js');
const check = require('../globals/validations/check.js');

const router = express.Router();

router.post('/signout', validate(check.tokenCheck), authController.userSignout);
router.post('/signin', validate(check.signin), authController.userSignin);
router.get('/user', protect.authorize, protect.allowedRoles(roles.ADMIN), authController.getUser);

module.exports = router;
