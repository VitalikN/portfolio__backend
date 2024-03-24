const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { HandleMongooseError } = require('../helpers');

const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const adminSchema = new Schema(
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
    tokenAdmin: {
      type: 'string',
      default: '',
    },
    avatarURL: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

adminSchema.post('save', HandleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailFormat).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailFormat).required(),
  password: Joi.string().min(6).required(),
});
const schemas = {
  loginSchema,
  registerSchema,
};

const Admin = model('admin', adminSchema);

module.exports = { Admin, schemas };
