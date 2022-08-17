'use strict';
const Controller = require('egg').Controller;

class BindController extends Controller {
  async bind() {
    const res = await this.ctx.service.bind.bind(this.ctx.request.body);
    this.ctx.body = res;
  }
  async unbind() {
    const res = await this.ctx.service.bind.unbind(this.ctx.query);
    this.ctx.body = res;
  }
  async queryBind() {
    const res = await this.ctx.service.bind.queryBind(this.ctx.query);
    this.ctx.body = res;
  }
  async batchBind() {
    const res = await this.ctx.service.bind.batchBind(this.ctx.request.body);
    this.ctx.body = res;
  }
  async batchUnBind() {
    const res = await this.ctx.service.bind.batchUnBind(this.ctx.request.body);
    this.ctx.body = res;
  }
}

module.exports = BindController;
