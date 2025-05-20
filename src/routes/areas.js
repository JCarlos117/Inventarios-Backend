const express = require('express');
const prisma = require('../prismaClient');
const { verifyToken, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
  const areas = await prisma.area.findMany({
    include: { responsable: true }
  });
  res.json(areas);
});

router.post('/', verifyToken, authorizeRoles('admin'), async (req, res) => {
  const { name, description, responsableId } = req.body;
  try {
    const area = await prisma.area.create({
      data: {
        name,
        description,
        responsable: responsableId ? { connect: { id: responsableId } } : undefined
      }
    });
    res.json(area);
  } catch (e) {
    res.status(400).json({ error: 'Could not create area' });
  }
});

module.exports = router;
