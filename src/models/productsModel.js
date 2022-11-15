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

async function insert(name) {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUE (?)',
    [name],
  );
  return insertId;
}

async function updateProduct(name, id) {
  await connection.execute(`UPDATE products
  SET name = ?
  WHERE id = ?;`,
  [name, id]);
}

module.exports = {
  getAll,
  getById,
  insert,
  updateProduct,
};