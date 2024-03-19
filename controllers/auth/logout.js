const { ctrlWrapper } = require('../../helpers');
const { Admin } = require('../../models/admin');
const { User } = require('../../models/auth');

const logout = async (req, res, model) => {
  const { _id } = req.admin || req.user;

  const tokenKey = model === User ? 'token' : 'tokenAdmin';
  await model.findByIdAndUpdate(_id, { [tokenKey]: '' });
  console.log(tokenKey);
  res.json({
    message: 'Logout success',
  });
};
module.exports = {
  logoutUser: ctrlWrapper(async (req, res) => {
    await logout(req, res, User);
  }),
  logoutAdmin: ctrlWrapper(async (req, res) => {
    await logout(req, res, Admin);
  }),
};
