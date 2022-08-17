'use strict';

const assert = require('assert');
const Service = require('egg').Service;
class FunService extends Service {
  constructor(ctx) {
    super(ctx);
    this.model = this.ctx.model.Fun;
  }
  async create({ moduleCode, name, path }) {
    assert(name, '缺少名称');
    assert(path, '缺少路径');
    assert(moduleCode, '缺少模块编码');
    const fun = await this.model.findOne({ path });
    if (fun) return { errcode: -1001, errmsg: '路径已存在' };
    try {
      await this.model.create({ moduleCode, name, path });
      return { errcode: 0, errmsg: '', data: '' };
    } catch (error) {
      throw error;
    }
  }
  async update({ id, moduleCode, name, path }) {
    assert(id, '缺少ID');
    try {
      const fun = await this.model.findOne({ _id: id });
      if (!fun) return { errcode: -1001, errmsg: '功能不存在', data: '' };
      await this.model.updateOne({ _id: id }, { moduleCode, name, path });
      return { errcode: 0, errmsg: '', data: 'update' };
    } catch (error) {
      throw error;
    }
  }
  async delete({ id }) {
    assert(id, '缺少ID');
    try {
      const fun = await this.model.findOne({ _id: id });
      if (!fun) return { errcode: -1001, errmsg: '功能不存在', data: '' };
      await this.model.deleteOne({ _id: id });
      return { errcode: 0, errmsg: 'ok', data: 'delete' };
    } catch (error) {
      throw error;
    }
  }
  async query({ skip, limit, moduleCode, name }) {
    const filter = {};
    if (name || moduleCode) filter.$or = [];
    if (moduleCode) filter.$or.push({ moduleCode: { $regex: moduleCode } });
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
module.exports = FunService;
