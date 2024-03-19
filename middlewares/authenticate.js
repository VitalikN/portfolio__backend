const { HttpError } = require('../helpers');
const jwt = require('jsonwebtoken');
const { Admin } = require('../models/admin');
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, tokenAdmin] = authorization?.split(' ');
  if (bearer !== 'Bearer') {
    next(HttpError(401));
  }

  try {
    const { _id } = jwt.verify(tokenAdmin, SECRET_KEY);
    const admin = await Admin.findById(_id);

    if (!admin || !admin.tokenAdmin || admin.tokenAdmin !== tokenAdmin) {
      next(HttpError(401));
    }
    req.admin = admin;
    next();
  } catch (error) {
    next(HttpError(401));
  }
};

module.exports = authenticate;
