## Backend - Node.js + Express + PostgreSQL

---

## Requisitos Previos  
- Node.js v16+ instalado  
- PostgreSQL corriendo (puerto 5432 por defecto)  
- Prisma CLI (se instala automáticamente con npm)

---

## Instalación

1. Instalar dependencias:


npm install
Crear un archivo .env en la raíz del proyecto con las variables:

DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/tu_basedatos?schema=public
JWT_SECRET=tu_secreto_super_seguro


## Crear la base de datos (si no existe) desde tu gestor PostgreSQL

Ejecutar migraciones para crear las tablas:

npx prisma migrate dev --name init

## Ejecutar un seed para pruebas

npm run seed

## Levantar el servidor:

node src/server.js