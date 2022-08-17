'use strict';

const assert = require('assert');
const Service = require('egg').Service;
class TypeService extends Service {
  constructor(ctx) {
    super(ctx);
    this.model = this.ctx.model.Type;
    this.codeModel = this.ctx.model.Dictionary;
  }
  async create({ name, code }) {
    assert(name, '名称不存在');
    assert(code, '编码不存在');
    try {
      const obj = await this.model.findOne({ code });
      if (obj) return { errcode: -1001, errmsg: '编码已存在', data: '' };
      const res = await this.model.create({ name, code });
      return { errcode: 0, errmsg: 'ok', data: res };
    } catch (error) {
      throw error;
    }
  }
  async update({ id, name, code }) {
    assert(id, 'id不存在');
    try {
      await this.model.updateOne({ _id: id }, { name, code });
      return { errcode: 0, errmsg: 'ok', data: '' };
    } catch (error) {
      throw error;
    }
  }
  async delete({ id }) {
    console.log(id);
    assert(id, 'id不存在');
    try {
      const res = await this.model.findOne({ _id: id });
      const codeList = await this.codeModel.find({ parentCode: res.code });
      if (codeList.length > 0) await this.codeModel.remove({ parentCode: res.code });
      await this.model.remove({ _id: id });
      return { errcode: 0, errmsg: 'ok', data: '' };
    } catch (error) {
      throw error;
    }
  }
  async query({ skip, limit, code, name }) {
    const filter = {};
    if (code || name) filter.$or = [];
    if (code) filter.$or.push({ code: { $regex: code } });
    if (name) filter.$or.push({ name: { $regex: name } });
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

module.exports = TypeService;
