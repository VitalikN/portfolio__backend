const { ctrlWrapper } = require('../../helpers');

const getCurrent = async (req, res) => {
  const { name, email } = req.user || req.admin;
  res.json({
    name,
    email,
  });
};

module.exports = {
  getCurrent: ctrlWrapper(getCurrent),
};
