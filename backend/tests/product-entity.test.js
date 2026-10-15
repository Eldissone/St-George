const test = require('node:test');
const assert = require('node:assert/strict');
const { createProduct } = require('../src/modules/products/domain/entities/Product');

test('normalizes a valid product entity', () => {
  const product = createProduct({ name: ' Produto St. George ', slug: 'produto-st-george', summary: 'Resumo', description: 'Descrição' });
  assert.equal(product.name, 'Produto St. George');
  assert.equal(product.slug, 'produto-st-george');
});
test('rejects invalid product slugs', () => assert.throws(() => createProduct({ name: 'Produto', slug: 'Produto Inválido' })));
