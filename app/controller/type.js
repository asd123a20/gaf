'use strict';
const Controller = require('egg').Controller;

class TypeController extends Controller {
  async create() {
    const res = await this.ctx.service.type.create(this.ctx.request.body);
    this.ctx.body = res;
  }
  async update() {
    const res = await this.ctx.service.type.update(this.ctx.request.body);
    this.ctx.body = res;
  }
  async delete() {
    console.log(123);
    const res = await this.ctx.service.type.delete(this.ctx.params);
    this.ctx.body = res;
  }
  async query() {
    const res = await this.ctx.service.type.query(this.ctx.query);
    this.ctx.body = res;
  }
}

module.exports = TypeController;
