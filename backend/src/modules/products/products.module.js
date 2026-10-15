const { prisma } = require('../../config/database');
const { PrismaProductRepository } = require('./infrastructure/repositories/PrismaProductRepository');
const { ListProducts } = require('./application/use-cases/ListProducts');
const { CreateProduct } = require('./application/use-cases/CreateProduct');
const { ProductController } = require('./presentation/http/product.controller');
const { productRoutes } = require('./presentation/http/product.routes');

function buildProductModule() {
  const repository = new PrismaProductRepository(prisma);
  const controller = new ProductController({ repository, listProducts: new ListProducts(repository), createProduct: new CreateProduct(repository) });
  return productRoutes(controller);
}
module.exports = { buildProductModule };
