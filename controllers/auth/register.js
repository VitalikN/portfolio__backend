const { ctrlWrapper, HttpError, sendEmail } = require('../../helpers');
const { Admin } = require('../../models/admin');
const { User } = require('../../models/auth');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
// const { v4: uuidv4 } = require('uuid');
// const { PROJECT_URL } = process.env;

const register = async (req, res, model) => {
  const { email, password } = req.body;
  const user = await model.findOne({ email }, '-createdAt -updatedAt');

  if (user) throw HttpError(409, 'Email already in use');

  const hashPassword = await bcrypt.hash(password, 10);
  // const verificationCode = uuidv4();

  // const verifyEmail = {
  //   to: email,
  //   subject: 'Verify email',
  //   html: `<a target="_blank" href="${PROJECT_URL}/api/auth/verify/${verificationCode}">
  //       Click to verify email
  //     </a>`,
  // };
  // await sendEmail(verifyEmail);
  const avatarURL = gravatar.url(email);

  const newUser = await model.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    // verificationCode,
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
