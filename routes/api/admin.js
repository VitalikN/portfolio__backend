const express = require('express');
const { validateBody } = require('../../middlewares');
const { schemas } = require('../../models/admin');

const { authRegister, authLogin } = require('../../controllers/auth');
const router = express.Router();

router.post(
  '/register',
  validateBody(schemas.registerSchema),
  authRegister.registerAdmin
);
router.post('/login', validateBody(schemas.loginSchema), authLogin.loginAdmin);

module.exports = router;
