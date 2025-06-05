const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../prismaClient');
const router = express.Router();

// 📌 REGISTRO
router.post('/register', async (req, res) => {
  const { username, email, password, role, areaId } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword, role, areaId }
    });
    res.json({ id: user.id, username: user.username });
  } catch (e) {
    res.status(400).json({ error: 'User already exists or invalid data' });
  }
});

// 📌 LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    console.log('❌ Usuario NO encontrado:', email);
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  console.log('🔍 Usuario encontrado:', user.email);
  console.log('🧂 Hashed en DB:', user.password);
  console.log('🛂 Password ingresada:', password);

  const match = await bcrypt.compare(password, user.password);
  console.log('✅ ¿Coinciden?:', match);

  if (!match) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign(
    { id: user.id, role: user.role, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.json({ token, role: user.role, username: user.username });
});

module.exports = router;
