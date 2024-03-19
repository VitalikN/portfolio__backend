const { ctrlWrapper } = require('../../helpers');
const { PortfolioProduct } = require('../../models/portfolio');

const addProduct = async (req, res) => {
  const { _id: owner } = req.admin;

  const product = await PortfolioProduct.create({ ...req.body, owner });

  res.status(201).json(product);
};
module.exports = { addProduct: ctrlWrapper(addProduct) };
