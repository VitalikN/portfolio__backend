const authRegister = require('./register');
const authLogin = require('./login');

const authCurrent = require('./current');

const authLogout = require('./logout');
const update = require('./updateAvatar');

module.exports = {
  authRegister,
  authLogin,
  authCurrent,
  authLogout,
  update,
};
