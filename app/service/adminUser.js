'use strict';
const uuid = require('uuid');
const assert = require('assert');
const Service = require('egg').Service;
const sm3 = require('sm3');
class AdminUserService extends Service {
  constructor(ctx) {
    super(ctx);
    this.model = this.ctx.model.AdminUser;
    this.UserBindRoleModel = this.ctx.model.UserBindRole;
  }
  async create({ userName, password, openid, name, phone, avatar }) {
    assert(userName, '缺少用户名');
    assert(password, '缺少密码');
    // 生成uuid盐值
    const salt = uuid.v1();
    // sm3 加盐加密
    password = sm3(`${password}:${salt}`);
    const obj = await this.model.findOne({ userName });
    if (obj) return { errcode: -1001, errmsg: '用户名已存在', data: '' };
    try {
      await this.model.create({ userName, password, openid, name, phone, salt, avatar });
      return { errcode: 0, errmsg: 'ok', data: 'create' };
    } catch (error) {
      throw error;
    }
  }
  async update({ id, userName, password, openid, name, phone, avatar }) {
    assert(id, '缺少用户ID');
    const user = await this.model.findOne({ _id: id });
    try {
      // 查询用户是否存在
      if (!user) return { errcode: -1001, errmsg: '用户不存在', data: '' };
      // sm3 使用数据库存储的盐值 加密
      password = sm3(`${password}:${user.salt}`);
      await this.model.updateOne({ _id: id }, { userName, password, openid, name, phone, avatar });
      return { errcode: 0, errmsg: 'ok', data: 'update' };
    } catch (error) {
      throw error;
    }
  }
  async delete({ id }) {
    assert(id, '缺少用户ID');
    try {
      const user = await this.model.findOne({ _id: id });
      if (!user) return { errcode: -1001, errmsg: '用户不存在', data: '' };
      await this.model.remove({ _id: id });
      await this.UserBindRoleModel.find({ userId: id }).remove();
      return { errcode: 0, errmsg: 'ok', data: 'delete' };
    } catch (error) {
      throw error;
    }
  }
  async query({ skip, limit, phone, name, userName }) {
    const filter = {};
    if (userName || name || phone) filter.$or = [];
    if (userName) filter.$or.push({ code: { $regex: userName } });
    if (name) filter.$or.push({ name: { $regex: name } });
    if (phone) filter.$or.push({ phone: { $regex: phone } });
    try {
      const total = await this.model.find({ ...filter }, { password: false });
      let res;
      if (skip && limit) {
        res = await this.model.find({ ...filter }, { password: false }).skip(Number(skip) * Number(limit)).limit(Number(limit));
      } else {
        res = await this.model.find({ ...filter }, { password: false });
      }
      return { errcode: 0, errmsg: 'ok', data: res, total: total.length };
    } catch (error) {
      throw error;
    }
  }
  async updatePwd({ id, password, oldpassword }) {
    assert(id, '缺少用ID');
    assert(password, '缺少新密码');
    assert(oldpassword, '缺少原密码');
    const user = await this.model.findOne({ _id: id });
    if (!user) return { errcode: -1001, errmsg: '用户不存在', data: '' };
    oldpassword = sm3(`${password}:${user.salt}`);
    if (user.password !== oldpassword) return { errcode: -1001, errmsg: '原密码不正确', data: '' };
    password = sm3(`${password}:${user.salt}`);
    try {
      const res = await this.model.updateOne({ _id: id }, { password });
      return { errcode: 0, errmsg: 'ok', data: { ...res, password: '' } };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AdminUserService;
