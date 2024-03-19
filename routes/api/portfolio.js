const express = require('express');
const { getAll, add } = require('../../controllers/Portfolio');
const { validateBody, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/portfolio');
const router = express.Router();

router.get('/', getAll.getAllProduct);

router.post('/', authenticate, validateBody(schemas.addSchema), add.addProduct);

module.exports = router;
