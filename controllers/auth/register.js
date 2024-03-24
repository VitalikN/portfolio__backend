const { ctrlWrapper, HttpError } = require('../../helpers');
const { Admin } = require('../../models/admin');
const { User } = require('../../models/auth');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');

const register = async (req, res, model) => {
  const { email, password } = req.body;
  const user = await model.findOne({ email }, '-createdAt -updatedAt');

  if (user) throw HttpError(409, 'Email already in use');

  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email);

  const newUser = await model.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  });
};
module.exports = {
  registerUser: ctrlWrapper(async (req, res) => {
    await register(req, res, User);
  }),
  registerAdmin: ctrlWrapper(async (req, res) => {
    await register(req, res, Admin);
  }),
};
