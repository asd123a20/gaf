'use strict';
const Schema = require('mongoose').Schema;
const SchemaDefine = {
  value: { type: String, required: true },
  code: { type: String, required: true },
  name: { type: String, required: true },
  parentCode: { type: String, required: true },
};
const schema = new Schema(SchemaDefine);
module.exports = app => {
  const { mongoose } = app;
  return mongoose.model('dictionary', schema, 'dictionary');
};
