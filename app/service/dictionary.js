'use strict';

const assert = require('assert');
const Service = require('egg').Service;
class DictionaryService extends Service {
  constructor(ctx) {
    super(ctx, 'dictionary');
    this.model = this.ctx.model.Dictionary;
    this.TypeModel = this.ctx.model.Type;
  }
  async create({ name, code, parentCode, value }) {
    assert(name, '名称不存在');
    assert(code, '编码不存在');
    assert(value, '值不存在');
    assert(parentCode, '类型编码不存在');
    try {
      const parent = await this.TypeModel.findOne({ code: parentCode });
      if (!parent) return { errcode: -1001, errmsg: '父级编码不存在', data: '' };
      const obj = await this.model.findOne({ code });
      if (obj) return { errcode: -1001, errmsg: '编码已存在', data: '' };
      const res = await this.model.create({ name, code, parentCode, value });
      return { errcode: 0, errmsg: 'ok', data: res };
    } catch (error) {
      throw error;
    }
  }
  async update({ id, name, value }) {
    assert(id, 'id不存在');
    try {
      await this.model.updateOne({ _id: id }, { name, value });
      return { errcode: 0, errmsg: 'ok', data: '' };
    } catch (error) {
      throw error;
    }
  }
  async delete({ id }) {
    assert(id, 'id不存在');
    try {
      await this.model.remove({ _id: id });
      return { errcode: 0, errmsg: 'ok', data: '' };
    } catch (error) {
      throw error;
    }
  }
  async query({ skip, limit, parentCode, code, name }) {
    const filter = {};
    if (code || name) filter.$or = [];
    if (code) filter.$or.push({ code: { $regex: code } });
    if (name) filter.$or.push({ name: { $regex: name } });
    if (parentCode) filter.parentCode = parentCode;
    try {
      const total = await this.model.find({ ...filter });
      let res;
      if (skip && limit) {
        res = await this.model.find({ ...filter }).skip(Number(skip) * Number(limit)).limit(Number(limit));
      } else {
        res = await this.model.find({ ...filter });
      }
      return { errcode: 0, errmsg: 'ok', data: res, total: total.length };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = DictionaryService;
