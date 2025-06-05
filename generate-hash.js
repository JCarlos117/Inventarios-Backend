// generate-hash.js
const bcrypt = require('bcrypt');

(async () => {
  const password = 'admin123'; // Cambia aquí si deseas otro password
  const hash = await bcrypt.hash(password, 10);
  console.log('🔐 Hash generado para admin123:\n', hash);
})();
