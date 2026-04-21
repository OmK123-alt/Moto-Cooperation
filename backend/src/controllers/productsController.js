const { listProducts, replaceProducts } = require('../models/productsModel');

async function getProducts(_req, res) {
  const products = await listProducts();
  res.json({ products });
}

async function saveProducts(req, res) {
  const products = Array.isArray(req.body?.products) ? req.body.products : [];
  await replaceProducts(products);
  res.json({ success: true, count: products.length });
}

module.exports = {
  getProducts,
  saveProducts
};
