const express = require('express');
const prisma = require('../prismaClient');
const { verifyToken, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

router.get('/', verifyToken, authorizeRoles('admin'), async (req, res) => {
  const users = await prisma.user.findMany({ include: { area: true } });
  res.json(users);
});

router.get('/responsables', authenticateToken, async (req, res) => {
  try {
    const responsables = await prisma.user.findMany({
      where: { role: 'responsable' },
      select: {
        id: true,
        username: true
      }
    });

    res.json(responsables);
  } catch (err) {
    console.error('Error al obtener responsables:', err);
    res.status(500).json({ message: 'Error al cargar responsables' });
  }
});


router.post('/', verifyToken, authorizeRoles('admin'), async (req, res) => {
  const { username, email, password, role, areaId } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword, role, areaId }
    });
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: 'Could not create user' });
  }
});

module.exports = router;
