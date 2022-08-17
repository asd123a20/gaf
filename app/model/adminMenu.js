'use strict';

const Schema = require('mongoose').Schema;
const SchemaDefine = {
  module: { type: String, required: true },
  path: { type: String, required: true },
  title: { type: String, required: true },
  code: { type: String, required: true },
  parentCode: { type: String, required: true },
  icon: { type: String, required: true },
  sort: { type: Number, required: true },
};
const schema = new Schema(SchemaDefine);
module.exports = app => {
  const { mongoose } = app;
  return mongoose.model('adminMenu', schema, 'adminMenu');
};
