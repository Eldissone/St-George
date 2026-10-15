const { AppError } = require('../../../../shared/errors/AppError');
class ProductController {
  constructor({ listProducts, createProduct, repository }) { Object.assign(this, { listProducts, createProduct, repository }); }
  list = async (req, res) => res.json({ data: await this.listProducts.execute() });
  bySlug = async (req, res) => {
    const product = await this.repository.findPublishedBySlug(req.params.slug);
    if (!product) throw new AppError('Product not found.', 404, 'NOT_FOUND');
    res.json({ data: product });
  };
  create = async (req, res) => res.status(201).json({ data: await this.createProduct.execute(req.body) });
}
module.exports = { ProductController };
