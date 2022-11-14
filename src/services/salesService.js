const SalesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

async function getAll() {
  const sales = await SalesModel.getAll();
  return sales;
}

async function getById(id) {
  const sale = await SalesModel.getById(id);
  if (!sale.length) return { message: 'Sale not found' };
  return sale;
}

async function validateCreate(saleItems) {
  const validateAll = await Promise
    .all(saleItems.map((item) => productsModel.getById(item.productId)));
  const isValid = validateAll.every(Boolean);
  if (!isValid) return false;
  return true;
}

async function postSale(salesItems) {
  const saleValid = await validateCreate(salesItems);
  if (!saleValid) return { message: 'Product not found' };
  const saleId = await SalesModel.create();
  const response = {
    id: saleId,
    itemsSold: salesItems,
  };
  const newSalesItems = salesItems.map((item) => ({ ...item, saleId }));
  await Promise.all(newSalesItems.map((item) => SalesModel.postSaleProduct(item)));
  return response;
}

module.exports = {
  getAll,
  getById,
  postSale,
  validateCreate,

};