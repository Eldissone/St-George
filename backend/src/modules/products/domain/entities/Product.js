const { AppError } = require('../../../../shared/errors/AppError');

function createProduct(input) {
  if (!input.name?.trim()) throw new AppError('Product name is required.', 422, 'VALIDATION_ERROR');
  if (!input.slug?.match(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)) throw new AppError('Slug is invalid.', 422, 'VALIDATION_ERROR');
  return { ...input, name: input.name.trim(), slug: input.slug.toLowerCase() };
}

module.exports = { createProduct };
