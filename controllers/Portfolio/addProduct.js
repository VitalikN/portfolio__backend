const { ctrlWrapper } = require('../../helpers');
const { PortfolioProduct } = require('../../models/portfolio');

const addProduct = async (req, res) => {
  const product = await PortfolioProduct.create({ ...req.body });

  res.status(201).json(product);
};
module.exports = { addProduct: ctrlWrapper(addProduct) };
