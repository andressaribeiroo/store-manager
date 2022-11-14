const { Router } = require('express');
const salesController = require('../controllers/salesController');
const { validateProductId, validateQuantity, validateQuantityNumber,
} = require('../middlewares/validationSales');

const route = Router();

route.post('/',
  validateProductId,
  validateQuantity,
  validateQuantityNumber,
  salesController.postSale);

route.get('/', salesController.getAll);

route.get('/:id', salesController.getById);

module.exports = route;