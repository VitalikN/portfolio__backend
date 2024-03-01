const { ctrlWrapper } = require('../../helpers');
const { PortfolioProduct } = require('../../models/portfolio');

const getAllProduct = async (req, res) => {
  const result = await PortfolioProduct.find();
  res.status(200).json(result);
};
module.exports = {
  getAllProduct: ctrlWrapper(getAllProduct),
};
