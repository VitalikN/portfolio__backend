const express = require('express');
const { validateBody, authenticateUser } = require('../../middlewares');
const { schemas } = require('../../models/auth');
const {
  authRegister,
  authLogin,
  authCurrent,
  authLogout,
} = require('../../controllers/auth');
const router = express.Router();

router.post(
  '/register',
  validateBody(schemas.authRegisterSchema),
  authRegister.registerUser
);
router.post(
  '/login',
  validateBody(schemas.authLoginSchema),
  authLogin.loginUser
);

router.get('/current', authenticateUser, authCurrent.getCurrent);

router.post('/logout', authenticateUser, authLogout.logoutUser);

module.exports = router;
