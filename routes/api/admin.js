const express = require('express');
const {
  validateBody,
  authenticate,
  authenticateUser,
} = require('../../middlewares');
const { schemas } = require('../../models/admin');

const {
  authRegister,
  authLogin,
  authCurrent,
  authLogout,
} = require('../../controllers/auth');
const router = express.Router();

router.post(
  '/register',
  validateBody(schemas.registerSchema),
  authRegister.registerAdmin
);
router.post('/login', validateBody(schemas.loginSchema), authLogin.loginAdmin);

router.get('/current', authenticate, authCurrent.getCurrent);

router.post('/logout', authenticate, authLogout.logoutAdmin);

module.exports = router;
