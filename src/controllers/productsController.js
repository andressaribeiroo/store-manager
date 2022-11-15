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
async function insertProduct(req, res) {
  const { name } = req.body;
  const newProduct = await productsService.insertProduct(name);
  return res.status(201).json(newProduct);
}

async function updateProduct(req, res) {
  const { name } = req.body;
  const { id } = req.params;
  const response = await productsService.updateProduct(name, id);

  if (response.message) {
    res.status(404).json(response);
  } else {
    res.status(200).json(response);
  }
}

async function deleteProduct(req, res) {
  const { id } = req.params;
  const response = await productsService.deleteProduct(id);

  if (response) {
    res.status(404).json(response);
  } else {
    res.sendStatus(204);
  }
}

module.exports = {
  getAll,
  getById,
  insertProduct,
  updateProduct,
  deleteProduct,
};