'use strict';
const Controller = require('egg').Controller;

class AdminUserController extends Controller {
  async create() {
    const res = await this.ctx.service.adminUser.create(this.ctx.request.body);
    this.ctx.body = res;
  }
  async update() {
    const res = await this.ctx.service.adminUser.update(this.ctx.request.body);
    this.ctx.body = res;
  }
  async delete() {
    const res = await this.ctx.service.adminUser.delete(this.ctx.params);
    this.ctx.body = res;
  }
  async query() {
    const res = await this.ctx.service.adminUser.query(this.ctx.query);
    this.ctx.body = res;
  }
  async updatePwd() {
    const res = await this.ctx.service.adminUser.updatePwd(this.ctx.request.body);
    this.ctx.body = res;
  }
}

module.exports = AdminUserController;
