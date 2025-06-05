const express = require('express');
const router = express.Router();
const prisma = require('../prismaClient');
const { authenticateToken } = require('../middleware/auth');

router.post('/', authenticateToken, async (req, res) => {
  const {
    code,
    name,
    unit,
    price,
    discount,
    location,
    locationDesc,
    model,
    brand,
    purchaseDate,
    status,
    categoryId,
    providerId,
    areaId
  } = req.body;

  try {
    const product = await prisma.product.create({
      data: {
        code,
        name,
        unit,
        price: parseFloat(price),
        discount: discount ? parseFloat(discount) : null,
        location,
        locationDesc,
        model,
        brand,
        purchaseDate: purchaseDate ? new Date(purchaseDate) : null,
        status,
        categoryId: parseInt(categoryId),
        providerId: parseInt(providerId),
        areaId: parseInt(areaId)
      }
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

module.exports = router;
