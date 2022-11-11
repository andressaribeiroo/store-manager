const connection = require('./db/connection');

async function getAll() {
  const [products] = await connection.execute(
    'SELECT * FROM products',
  );

  return products;
}

async function getById(id) {
  const [product] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );

  return product[0];
}

module.exports = {
  getAll,
  getById,
};