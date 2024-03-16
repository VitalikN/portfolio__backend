const { Admin } = require('../../models/admin');
const { ctrlWrapper, HttpError } = require('../../helpers');

const bcrypt = require('bcrypt');

const register = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email }, '-createdAt -updatedAt');

  if (admin) throw HttpError(409, 'Email already in use');

  const hashPassword = await bcrypt.hash(password, 10);

  const newAdmin = await Admin.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    email: newAdmin.email,
    name: newAdmin.name,
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
