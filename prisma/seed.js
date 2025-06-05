const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Crear áreas
  const areaSoporte = await prisma.area.create({
    data: {
      name: 'Soporte Técnico',
      description: 'Equipo de soporte interno'
    }
  });

  const areaIT = await prisma.area.create({
    data: {
      name: 'Departamento IT',
      description: 'Infraestructura y redes'
    }
  });

  // Crear usuarios
  const admin = await prisma.user.create({
    data: {
      username: 'admin',
      email: 'admin@mail.com',
      password: '$2b$10$VryLLZT1AHtUGKLYLX.2YeAFeyqGWmtmmQmPCDUfQzURzakEk6snG', // "admin123"
      role: 'admin',
    }
  });

  const anotherAdmin = await prisma.user.create({
  data: {
    username: 'admin2',
    email: 'admin2@mail.com',
    password: '$2b$10$GdVrPIgu7W57P3sY/.o69OV8GnNgF/pLtAhj26UC6UJz1vqKXPyLO', // "admin123"
    role: 'admin',
  }
});


  const responsable = await prisma.user.create({
    data: {
      username: 'responsable',
      email: 'resp@mail.com',
      password: '$2b$10$GdVrPIgu7W57P3sY/.o69OV8GnNgF/pLtAhj26UC6UJz1vqKXPyLO', // "admin123"
      role: 'responsable',
      area: {
        connect: { id: areaIT.id }
      }
    }
  });

  // Crear productos
  const producto1 = await prisma.product.create({
    data: {
      code: 'P001',
      name: 'Laptop Dell',
      price: 1500,
      discount: 10,
      unit: 'unidad',
      location: 'Depósito 1',
      model: 'XPS 13',
      brand: 'Dell',
      purchaseDate: new Date(),
      status: 'activo',
      areaId: areaIT.id,
      categoryId: 1,
      providerId: 1
    }
  });

  const producto2 = await prisma.product.create({
    data: {
      code: 'P002',
      name: 'Monitor LG 24"',
      price: 250,
      discount: 0,
      unit: 'unidad',
      location: 'Depósito 2',
      model: 'UltraGear',
      brand: 'LG',
      purchaseDate: new Date(),
      status: 'activo',
      areaId: areaSoporte.id,
      categoryId: 1,
      providerId: 1
    }
  });

  // Logs de inventario
  await prisma.inventoryLog.createMany({
    data: [
      { productId: producto1.id, delta: -3, reason: 'Préstamo a usuario' },
      { productId: producto1.id, delta: 10, reason: 'Reposición inventario' },
      { productId: producto2.id, delta: -1, reason: 'Reubicación' },
    ]
  });

  console.log('🚀 Datos de prueba cargados con éxito.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
