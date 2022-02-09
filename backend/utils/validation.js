const { validationResult } = require('express-validator');

const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error) => `${error.msg}`);

    const err = Error('Bad request.');
    err.errors = errors;
    err.status = 400;
    err.title = 'Bad request.';
    next(err);
  }
  next();
};


const resourceNotFound = (id, resource = 'Resource') => {
  const err = new Error(`${resource} with an id of ${id} could not be found.`);
  err.title = `${resource} with an id of ${id} could not be found.`;
  err.errors = ['Resource not found'];
  err.status = 404;
  return err;
}

module.exports = { handleValidationErrors, resourceNotFound };