'use strict';

const assert = require('assert');
const Service = require('egg').Service;
class UserBindRoleService extends Service {
  constructor(ctx) {
    super(ctx);
    this.model = this.ctx.model.UserBindRole;
    this.roleModel = this.ctx.model.Role;
  }
  async bind({ source, target, type }) {
    assert(source, '缺少来源');
    assert(target, '缺少目标');
    assert(type, '缺少类型');
    try {
      const bind = await this.model.findOne({ source, target });
      if (bind) return { errcode: -1001, errmsg: '不能重复绑定', data: '' };
      await this.model.create({ source, target, type });
      return { errcode: 0, errmsg: '', data: '' };
    } catch (error) {
      throw error;
    }
  }
  async unbind({ id }) {
    assert(id, '缺少ID');
    try {
      const bind = await this.model.findOne({ _id: id });
      if (!bind) return { errcode: -1001, errmsg: '数据不存在', data: '' };
      await this.model.deleteOne({ _id: id });
      return { errcode: 0, errmsg: 'ok', data: 'unbind' };
    } catch (error) {
      throw error;
    }
  }
  async queryBind({ skip, limit, source, target, type }) {
    const filter = {};
    if (source) filter.source = source;
    if (target) filter.target = target;
    if (type) filter.type = type;
    try {
      const total = await this.model.find({ ...filter });
      let res;
      if (skip && limit) {
        res = await this.model.find({ ...filter }).skip(skip * limit).limit(limit);
      } else {
        res = await this.model.find({ ...filter });
      }
      return { errcode: 0, errmsg: '', data: res, total: total.length };
    } catch (error) {
      throw error;
    }
  }
  async batchBind({ source, targetList, type }) {
    try {
      const res = await Promise.all(
        targetList.filter(async e => {
          const bind = await this.model.findOne({ target: e, source, type });
          if (!bind) await this.model.create({ target: e, source, type });
        })
      );
      return { errcode: 0, errmsg: '', data: res };
    } catch (error) {
      throw error;
    }
  }
  async batchUnBind({ source, targetList, type }) {
    try {
      const res = await Promise.all(
        targetList.filter(async e => {
          const bind = await this.model.findOne({ target: e, source, type });
          if (bind) await this.model.deleteOne({ target: e, source, type });
        })
      );
      return { errcode: 0, errmsg: '', data: res };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserBindRoleService;
