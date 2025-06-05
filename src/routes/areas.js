const express = require('express');
const router = express.Router();
const prisma = require('../prismaClient');
const { authenticateToken } = require('../middleware/auth');

router.post('/', authenticateToken, async (req, res) => {
  const { name, description, responsableId } = req.body;

  if (!name || !responsableId) {
    return res.status(400).json({ message: "Faltan campos obligatorios" });
  }

  try {
    const area = await prisma.area.create({
      data: {
        name,
        description,
        responsableId: parseInt(responsableId)
      }
    });

    res.status(201).json(area);
  } catch (error) {
    console.error("Error al crear área:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;
