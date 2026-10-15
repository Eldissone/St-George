const crypto = require('crypto');
const express = require('express');
const bcrypt = require('bcryptjs');
const { z } = require('zod');
const { prisma } = require('../../../../config/database');
const { sessionSecret, nodeEnv } = require('../../../../config/env');
const { AppError } = require('../../../../shared/errors/AppError');

function sign(payload) { return crypto.createHmac('sha256', sessionSecret).update(payload).digest('base64url'); }
function authRoutes() {
  const router = express.Router();
  router.post('/session', async (req, res) => {
    const input = z.object({ email: z.string().email(), password: z.string().min(8).max(200) }).parse(req.body);
    const user = await prisma.user.findUnique({ where: { email: input.email.toLowerCase() } });
    if (!user || !(await bcrypt.compare(input.password, user.passwordHash))) throw new AppError('Invalid email or password.', 401, 'INVALID_CREDENTIALS');
    const payload = Buffer.from(JSON.stringify({ id: user.id, role: user.role, exp: Date.now() + 8 * 60 * 60 * 1000 })).toString('base64url');
    res.cookie('sg_session', `${payload}.${sign(payload)}`, { httpOnly: true, secure: nodeEnv === 'production', sameSite: 'lax', maxAge: 8 * 60 * 60 * 1000, path: '/' });
    res.json({ data: { name: user.name, role: user.role } });
  });
  router.delete('/session', (req, res) => { res.clearCookie('sg_session', { path: '/' }); res.status(204).end(); });
  return router;
}
module.exports = { authRoutes };
