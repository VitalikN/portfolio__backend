const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { HandleMongooseError } = require('../helpers');

const typeList = [
  'Onepage',
  'Landing Page',
  'Website with Admin Panel',
  'Online Store',
];
const portfolioSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: typeList,
      required: true,
    },
    // img: {
    //   type: String,
    //   required: [true, 'images is required'],
    // },
    url: {
      type: String,
      required: true,
    },
  },

  { versionKey: false, timestamps: true }
);

const addSchema = Joi.object({
  title: Joi.string().required(),
  category: Joi.string()
    .valid(...typeList)
    .required(),
  url: Joi.string().required(),
});

const schemas = {
  addSchema,
};

portfolioSchema.post('save', HandleMongooseError);

const PortfolioProduct = model('portfolioProduct', portfolioSchema);

module.exports = { PortfolioProduct, schemas };
