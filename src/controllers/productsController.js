const productsService = require('../services/productsServices');

async function getAll(_req, res) {
  const products = await productsService.getAll();
  return res.status(200).json(products);
}

async function getById(req, res) {
  const { id } = req.params;
  const response = await productsService.getById(Number(id));

  if (response.message) {
    res.status(404).json(response);
  } else {
    res.status(200).json(response);
  }
}

module.exports = {
  getAll,
  getById,
};