const { Router } = require('express');
const productsController = require('../controllers/productsController');
const productValidate = require('../middlewares/validationProduct');

const route = Router();

route.get('/', productsController.getAll);

route.get('/:id', productsController.getById);

route.post('/', productValidate, productsController.insertProduct);

route.put('/:id', productValidate, productsController.updateProduct);

route.delete('/:id', productsController.deleteProduct);

module.exports = route;