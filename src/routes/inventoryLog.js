const express = require('express');
const prisma = require('../prismaClient');
const { verifyToken, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

router.post('/', verifyToken, authorizeRoles('admin', 'responsable'), async (req, res) => {
  const { productId, delta, reason } = req.body;
  try {
    const log = await prisma.inventoryLog.create({
      data: { productId, delta, reason }
    });
    res.json(log);
  } catch (e) {
    res.status(400).json({ error: 'Failed to create inventory log' });
  }
});

router.get('/:productId', verifyToken, async (req, res) => {
  const productId = Number(req.params.productId);
  const logs = await prisma.inventoryLog.findMany({
    where: { productId },
    orderBy: { createdAt: 'desc' }
  });
  res.json(logs);
});

module.exports = router;
