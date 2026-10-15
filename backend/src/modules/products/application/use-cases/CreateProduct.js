const { createProduct } = require('../../domain/entities/Product');
class CreateProduct {
  constructor(repository) { this.repository = repository; }
  execute(input) { return this.repository.create(createProduct(input)); }
}
module.exports = { CreateProduct };
