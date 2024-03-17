const express = require('express');
const { validateBody } = require('../../middlewares');
const { schemas } = require('../../models/auth');
const { authRegister, authLogin } = require('../../controllers/auth');
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

module.exports = router;
