require('dotenv').config();
const bcrypt = require('bcryptjs');
const { prisma } = require('../src/config/database');
async function main() {
  const email = (process.env.ADMIN_EMAIL || '').toLowerCase(); const password = process.env.ADMIN_PASSWORD || '';
  if (!email || password.length < 12) throw new Error('Set ADMIN_EMAIL and an ADMIN_PASSWORD of at least 12 characters.');
  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.user.upsert({ where: { email }, update: { passwordHash, role: 'ADMIN' }, create: { email, passwordHash, role: 'ADMIN', name: 'Administrator' } });
  console.log(`Administrator ready: ${email}`);
}
main().catch(error => { console.error(error.message); process.exitCode = 1; }).finally(() => prisma.$disconnect());
