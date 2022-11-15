const productsModel = require('../models/productsModel');

async function getAll() {
  const products = await productsModel.getAll();
  return products;
}

async function getById(id) {
  const product = await productsModel.getById(id);
  if (product) return product;
  return { message: 'Product not found' };
}

async function insertProduct(name) {
  const response = await productsModel.insert(name);
  return { id: response, name };
}

const updateProduct = async (name, saleId) => {
  const product = await productsModel.getById(saleId);
  if (!product) return { message: 'Product not found' };
  await productsModel.updateProduct(name, saleId);
  return {
    name,
    id: saleId,
  };
};

module.exports = {
  getAll,
  getById,
  insertProduct,
  updateProduct,
};