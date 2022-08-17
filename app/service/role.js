'use strict';

const assert = require('assert');
const Service = require('egg').Service;
class RoleService extends Service {
  constructor(ctx) {
    super(ctx);
    this.model = this.ctx.model.Role;
    this.UserBindRoleModel = this.ctx.model.UserBindRole;
    this.RoleBindMenuModel = this.ctx.model.RoleBindMenu;
  }
  async create({ name, code }) {
    assert(name, '缺少名称');
    assert(code, '缺少编码');
    const role = await this.model.findOne({ code });
    if (role) return { errcode: -1001, errmsg: '编码已存在' };
    try {
      const res = await this.model.create({ name, code });
      return { errcode: 0, errmsg: '', data: res };
    } catch (error) {
      throw error;
    }
  }
  async update({ id, name }) {
    assert(id, '缺少ID');
    try {
      const user = await this.model.findOne({ _id: id });
      if (!user) return { errcode: -1001, errmsg: '角色不存在', data: '' };
      await this.model.updateOne({ _id: id }, { name });
      return { errcode: 0, errmsg: '', data: 'update' };
    } catch (error) {
      throw error;
    }
  }
  async delete({ id }) {
    assert(id, '缺少ID');
    try {
      const role = await this.model.findOne({ _id: id });
      if (!role) return { errcode: -1001, errmsg: '角色不存在', data: '' };
      await this.UserBindRoleModel.find({ roleCode: role.code }).remove();
      await this.RoleBindMenuModel.find({ roleCode: role.code }).remove();
      await this.model.deleteOne({ _id: id });
      return { errcode: 0, errmsg: 'ok', data: 'delete' };
    } catch (error) {
      throw error;
    }
  }
  async query({ skip, limit, name, code }) {
    const filter = {};
    if (name || code) filter.$or = [];
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
module.exports = RoleService;
