const express = require('express');
const { z } = require('zod');
const { requireAuth, requireRole } = require('../../../../shared/middleware/auth');

const productInput = z.object({
  name: z.string().min(2).max(120), slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  summary: z.string().min(10).max(280), description: z.string().min(10), category: z.string().max(80).optional(),
  imageUrl: z.string().url().optional(), status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional()
});
function productRoutes(controller) {
  const router = express.Router();
  router.get('/', controller.list);
  router.get('/:slug', controller.bySlug);
  router.post('/', requireAuth, requireRole('ADMIN', 'EDITOR'), (req, res, next) => { req.body = productInput.parse(req.body); next(); }, controller.create);
  return router;
}
module.exports = { productRoutes };
