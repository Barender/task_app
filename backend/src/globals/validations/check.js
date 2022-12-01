const Joi = require('joi');

// Fields
const name = Joi.string().required().messages({
  'any.required': 'Name is required'
});
const refreshToken = Joi.string().required();
const apiKey = Joi.string().required();
const task = Joi.string();
const isComplete = Joi.boolean();

// SchemaTypes
const signin = Joi.object().keys({ name, apiKey });
const tokenCheck = Joi.object().keys({ refreshToken });
const createTask = Joi.object().keys({ task });
const updatetask = Joi.object().keys({ task, isComplete });

const check = {
  signin,
  tokenCheck,
  createTask,
  updatetask
};

module.exports = check;
