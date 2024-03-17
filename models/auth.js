const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { HandleMongooseError } = require('../helpers');

const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const authSchema = new Schema(
  {
    name: {
      type: 'string',
      required: true,
    },

    email: {
      type: 'string',
      unique: true,
      match: emailFormat,
      required: true,
    },
    password: {
      type: 'string',
      minLength: 6,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);
const authRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailFormat).required(),
  password: Joi.string().min(6).required(),
});
const authLoginSchema = Joi.object({
  email: Joi.string().pattern(emailFormat).required(),
  password: Joi.string().min(6).required(),
});
const schemas = {
  authRegisterSchema,
  authLoginSchema,
};
authSchema.post('save', HandleMongooseError);

const User = model('user', authSchema);

module.exports = {
  User,
  schemas,
};
