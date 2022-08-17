'use strict';
const Controller = require('egg').Controller;

class DictionaryController extends Controller {
  async create() {
    const res = await this.ctx.service.dictionary.create(this.ctx.request.body);
    this.ctx.body = res;
  }
  async update() {
    const res = await this.ctx.service.dictionary.update(this.ctx.request.body);
    this.ctx.body = res;
  }
  async delete() {
    const res = await this.ctx.service.dictionary.delete(this.ctx.params);
    this.ctx.body = res;
  }
  async query() {
    const res = await this.ctx.service.dictionary.query(this.ctx.query);
    this.ctx.body = res;
  }
}

module.exports = DictionaryController;
