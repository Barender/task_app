const express = require('express');
const roles = require('../globals/permissions/roles.js');
const validate = require('../globals/validations/validator.js');
const protect = require('../globals/middlewares/auth.middleware.js');
const check = require('../globals/validations/check.js');
const taskController = require('../controllers/task.controller.js');

const router = express.Router();

router.delete('/:id', protect.authorize, protect.allowedRoles(roles.ADMIN), taskController.deleteTask);
router.get('/', protect.authorize, protect.allowedRoles(roles.ADMIN), taskController.getTasks);
router.post('/', protect.authorize, validate(check.createTask), protect.allowedRoles(roles.ADMIN), taskController.createTask);
router.put('/:id', protect.authorize, validate(check.updatetask), protect.allowedRoles(roles.ADMIN), taskController.updateTask);
router.get('/dashboard', protect.authorize, protect.allowedRoles(roles.ADMIN), taskController.dashboardTasks);

module.exports = router;
