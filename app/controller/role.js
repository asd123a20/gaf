'use strict';
const Controller = require('egg').Controller;

class RoleController extends Controller {
  async create() {
    const res = await this.ctx.service.role.create(this.ctx.request.body);
    this.ctx.body = res;
  }
  async update() {
    const res = await this.ctx.service.role.update(this.ctx.request.body);
    this.ctx.body = res;
  }
  async delete() {
    const res = await this.ctx.service.role.delete(this.ctx.params);
    this.ctx.body = res;
  }
  async query() {
    const res = await this.ctx.service.role.query(this.ctx.query);
    this.ctx.body = res;
  }
}

module.exports = RoleController;
