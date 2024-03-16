const express = require('express');
const { validateBody } = require('../../middlewares');
const { schemas } = require('../../models/admin');
const { register, login } = require('../../controllers/admin');
const router = express.Router();

router.post(
  '/register',
  validateBody(schemas.registerSchema),
  register.register
);
router.post('/login', validateBody(schemas.loginSchema), login.login);

module.exports = router;
