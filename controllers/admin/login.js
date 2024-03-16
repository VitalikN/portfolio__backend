const { Admin } = require('../../models/admin');
const { ctrlWrapper, HttpError } = require('../../helpers');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email }, '-createdAt -updatedAt');
  if (!admin) throw HttpError(401, 'Email or password invalid ');

  const passwordCompare = await bcrypt.compare(password, admin.password);

  if (!passwordCompare) throw HttpError(401, 'Email or password invalid ');

  const payload = {
    id: admin.id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });

  res.json({ token, email: admin.email, name: admin.name });
};

module.exports = {
  login: ctrlWrapper(login),
};
