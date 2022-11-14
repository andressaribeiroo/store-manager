function validateProductId(req, res, next) {
  const productId = req.body.every((product) => product.productId);
  if (!productId) return res.status(400).json({ message: '"productId" is required' });

  return next();
}

function validateQuantity(req, res, next) {
  const quantity = req.body
    .every((product) => product.quantity || Number(product.quantity) === 0);
  if (!quantity) return res.status(400).json({ message: '"quantity" is required' });

  return next();
}

function validateQuantityNumber(req, res, next) {
  const quantityNumber = req.body.every((product) => Number(product.quantity) > 0);
  if (!quantityNumber) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  return next();
}

module.exports = {
  validateProductId,
  validateQuantity,
  validateQuantityNumber,
};