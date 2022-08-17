'use strict';
const Schema = require('mongoose').Schema;
const SchemaDefine = {
  source: { type: String, required: true },
  target: { type: String, required: true },
  // user-role, role-menu, role-fun
  type: { type: String, required: true },
};
const schema = new Schema(SchemaDefine);
module.exports = app => {
  const { mongoose } = app;
  return mongoose.model('bind', schema, 'bind');
};
