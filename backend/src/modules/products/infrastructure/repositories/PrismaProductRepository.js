class PrismaProductRepository {
  constructor(prisma) { this.prisma = prisma; }
  listPublished() { return this.prisma.product.findMany({ where: { status: 'PUBLISHED' }, orderBy: { updatedAt: 'desc' } }); }
  findPublishedBySlug(slug) { return this.prisma.product.findFirst({ where: { slug, status: 'PUBLISHED' } }); }
  create(data) { return this.prisma.product.create({ data }); }
  update(id, data) { return this.prisma.product.update({ where: { id }, data }); }
}
module.exports = { PrismaProductRepository };
