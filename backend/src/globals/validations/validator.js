const httpStatus = require('http-status');

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ success: false, message: error.details[0].message });
  } else {
    next();
  }
};

module.exports = validate;
