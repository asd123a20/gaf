'use strict';
const Controller = require('egg').Controller;

class AdminMenuController extends Controller {
  async create() {
    const res = await this.ctx.service.adminMenu.create(this.ctx.request.body);
    this.ctx.body = res;
  }
  async update() {
    const res = await this.ctx.service.adminMenu.update(this.ctx.request.body);
    this.ctx.body = res;
  }
  async delete() {
    const res = await this.ctx.service.adminMenu.delete(this.ctx.params);
    this.ctx.body = res;
  }
  async query() {
    const res = await this.ctx.service.adminMenu.query(this.ctx.query);
    this.ctx.body = res;
  }
}

module.exports = AdminMenuController;
