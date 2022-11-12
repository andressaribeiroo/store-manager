const { Router } = require('express');
const productsController = require('../controllers/productsController');
const productValidate = require('../middlewares/validationProduct');

const route = Router();

route.get('/', productsController.getAll);

route.get('/:id', productsController.getById);

route.post('/', productValidate, productsController.insertProduct);

module.exports = route;