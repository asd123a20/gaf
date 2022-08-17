'use strict';

const assert = require('assert');
const Service = require('egg').Service;
class MenuService extends Service {
  constructor(ctx) {
    super(ctx);
    this.model = this.ctx.model.AdminMenu;
  }
  async create({ module, path, title, code, parentCode, icon, sort }) {
    const role = await this.model.findOne({ code });
    if (role) return { errcode: -1001, errmsg: '编码已存在' };
    try {
      await this.model.create({ module, path, title, code, parentCode, icon, sort });
      return { errcode: 0, errmsg: '', data: '' };
    } catch (error) {
      throw error;
    }
  }
  async update({ id, module, path, title, code, parentCode, icon, sort }) {
    assert(id, '缺少ID');
    try {
      const user = await this.model.findOne({ _id: id });
      if (!user) return { errcode: -1001, errmsg: '菜单不存在', data: '' };
      await this.model.updateOne({ _id: id }, { module, path, title, code, parentCode, icon, sort });
      return { errcode: 0, errmsg: '', data: 'update' };
    } catch (error) {
      throw error;
    }
  }
  async delete({ id }) {
    assert(id, '缺少ID');
    try {
      const role = await this.model.findOne({ _id: id });
      if (!role) return { errcode: -1001, errmsg: '菜单不存在', data: '' };
      const children = await this.model.find({ parentCode: role.code });
      if (children.length > 0) return { errcode: -1001, errmsg: '存在子级菜单不能删除', data: '' };
      await this.model.deleteOne({ _id: id });
      return { errcode: 0, errmsg: 'ok', data: 'delete' };
    } catch (error) {
      throw error;
    }
  }
  async query({ skip, limit, parentCode, module, title }) {
    const filter = {};
    if (title || parentCode || module) filter.$or = [];
    if (parentCode) filter.$or.push({ parentCode });
    if (module) filter.$or.push({ module });
    if (title) filter.$or.push({ title: { $regex: title } });
    try {
      let res;
      if (skip && limit) {
        res = await this.model.find().sort({ sort: -1 }).skip(Number(skip) * Number(limit))
          .limit(Number(limit));
      } else {
        res = await this.model.find();
      }
      const menus = require('../../config/menu');
      return { errcode: 0, errmsg: 'ok', data: res.length > 0 ? res : menus.data };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = MenuService;
