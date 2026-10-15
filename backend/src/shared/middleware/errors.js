const { ZodError } = require('zod');

function notFound(req, res) {
  res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Resource not found.' } });
}

function errorHandler(error, req, res, next) { // eslint-disable-line no-unused-vars
  if (error instanceof ZodError) {
    return res.status(422).json({ error: { code: 'VALIDATION_ERROR', message: 'Invalid data.', details: error.flatten() } });
  }
  const status = error.statusCode || 500;
  if (status >= 500) console.error(error);
  return res.status(status).json({ error: { code: error.code || 'INTERNAL_ERROR', message: error.message || 'Unexpected error.' } });
}

module.exports = { notFound, errorHandler };
