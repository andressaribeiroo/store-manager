const SalesService = require('../services/salesService');

async function getAll(_req, res) {
  const sales = await SalesService.getAll();
  res.status(200).json(sales);
}

async function getById(req, res) {
  const { id } = req.params;
  const response = await SalesService.getById(Number(id));
  if (response.message) {
    res.status(404).json(response);
  } else {
    res.status(200).json(response);
  }
}

const postSale = async (req, res) => {
  const response = await SalesService.postSale(req.body);
  if (response.message) {
    res.status(404).json(response);
  } else {
    res.status(201).json(response);
  }
};

module.exports = {
  getAll,
  getById,
  postSale,
};
