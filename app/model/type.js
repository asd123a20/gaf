'use strict';
const Schema = require('mongoose').Schema;
const SchemaDefine = {
  code: { type: String, required: true },
  name: { type: String, required: true },
};
const schema = new Schema(SchemaDefine);
module.exports = app => {
  const { mongoose } = app;
  return mongoose.model('type', schema, 'type');
};
