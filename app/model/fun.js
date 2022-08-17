'use strict';
const Schema = require('mongoose').Schema;
const SchemaDefine = {
  moduleCode: { type: String, required: false },
  name: { type: String, required: false },
  path: { type: String, required: false },
};
const schema = new Schema(SchemaDefine);
module.exports = app => {
  const { mongoose } = app;
  return mongoose.model('fun', schema, 'fun');
};
