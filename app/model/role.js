'use strict';
const Schema = require('mongoose').Schema;
const SchemaDefine = {
  name: { type: String, required: true },
  code: { type: String, required: true },
};
const schema = new Schema(SchemaDefine);
module.exports = app => {
  const { mongoose } = app;
  return mongoose.model('role', schema, 'role');
};
