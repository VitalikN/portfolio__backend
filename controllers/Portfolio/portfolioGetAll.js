const { ctrlWrapper } = require('../../helpers');
const { PortfolioProduct } = require('../../models/portfolio');

const getAllProduct = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;
  const result = await PortfolioProduct.find({}, '-createdAt -updatedAt', {
    skip,
    limit,
  }).populate('owner', 'name email');
  res.status(200).json(result);
};
module.exports = {
  getAllProduct: ctrlWrapper(getAllProduct),
};
