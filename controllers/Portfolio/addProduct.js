const { ctrlWrapper } = require('../../helpers');
const { PortfolioProduct } = require('../../models/portfolio');

const addProduct = async (req, res) => {
  const { _id: owner } = req.admin;

  const imgURLs = req.files['img'].map((file) => file.path);

  const product = await PortfolioProduct.create({
    ...req.body,
    owner,
    img: imgURLs,
  });

  res.status(201).json(product);
};
module.exports = { addProduct: ctrlWrapper(addProduct) };
