const connection = require('./db/connection');

async function getAll() {
  const [sales] = await connection.execute(
    `
    SELECT
      s.id AS saleId,
      s.date AS date,
      sp.product_id AS productId,
      sp.quantity AS quantity
    FROM
      sales s
      INNER JOIN sales_products sp ON s.id = sp.sale_id
    ORDER BY
      saleId,
      productId;
    `,
  );

  return sales;
}

async function getById(id) {
  const [sale] = await connection.execute(
    `
    SELECT
      s.date AS date,
      sp.product_id AS productId,
      sp.quantity AS quantity
    FROM
      sales s
      INNER JOIN sales_products sp ON s.id = sp.sale_id
    WHERE
      s.id = ?
    ORDER BY
      productId;
    `,
    [id],
  );

  return sale;
}

async function create() {
  const [{ insertId }] = await connection.execute(`INSERT INTO StoreManager.sales ()
  VALUES ();`);
  return insertId;
}

async function postSaleProduct({ productId, quantity, saleId }) {
  const [{ insertId }] = await connection.execute(`INSERT INTO StoreManager.sales_products 
  (sale_id, product_id, quantity) VALUES (?, ?, ?);`,
    [saleId, productId, quantity]);
  return insertId;
}

module.exports = {
  getAll,
  getById,
  create,
  postSaleProduct,

};