const { ctrlWrapper, HttpError } = require('../../helpers');
const { Admin } = require('../../models/admin');
const { User } = require('../../models/auth');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const login = async (req, res, model) => {
  const { email, password } = req.body;
  const entity = await model.findOne({ email }, '-createdAt -updatedAt');

  if (!entity) throw HttpError(401, 'Email or password invalid');

  const passwordCompare = await bcrypt.compare(password, entity.password);

  if (!passwordCompare) throw HttpError(401, 'Email or password invalid');
  const payload = {
    id: entity.id,
  };

  const tokenKey = model === User ? 'token' : 'tokenAdmin';

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });

  res.json({ [tokenKey]: token, email: entity.email, name: entity.name });
};

module.exports = {
  loginUser: ctrlWrapper(async (req, res) => {
    await login(req, res, User);
  }),
  loginAdmin: ctrlWrapper(async (req, res) => {
    await login(req, res, Admin);
  }),
};
