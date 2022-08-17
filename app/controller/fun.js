'use strict';
const Controller = require('egg').Controller;

class FunController extends Controller {
  async create() {
    const res = await this.ctx.service.fun.create(this.ctx.request.body);
    this.ctx.body = res;
  }
  async update() {
    const res = await this.ctx.service.fun.update(this.ctx.request.body);
    this.ctx.body = res;
  }
  async delete() {
    const res = await this.ctx.service.fun.delete(this.ctx.params);
    this.ctx.body = res;
  }
  async query() {
    const res = await this.ctx.service.fun.query(this.ctx.query);
    this.ctx.body = res;
  }
}

module.exports = FunController;
