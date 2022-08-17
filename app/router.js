'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 用户
  router.post('/api/gaf/adminUser/create', controller.adminUser.create);
  router.post('/api/gaf/adminUser/update', controller.adminUser.update);
  router.delete('/api/gaf/adminUser/delete/:id', controller.adminUser.delete);
  router.get('/api/gaf/adminUser/query', controller.adminUser.query);
  router.post('/api/gaf/adminUser/updatePwd', controller.adminUser.updatePwd);
  // 角色
  router.post('/api/gaf/role/create', controller.role.create);
  router.post('/api/gaf/role/update', controller.role.update);
  router.delete('/api/gaf/role/delete/:id', controller.role.delete);
  router.get('/api/gaf/role/query', controller.role.query);
  // 菜单
  router.post('/api/gaf/menu/create', controller.adminMenu.create);
  router.post('/api/gaf/menu/update', controller.adminMenu.update);
  router.delete('/api/gaf/menu/delete/:id', controller.adminMenu.delete);
  router.get('/api/gaf/menu/query', controller.adminMenu.query);
  // 绑定
  router.post('/api/gaf/bind/bind', controller.bind.bind);
  router.post('/api/gaf/bind/unbind/:id', controller.bind.unbind);
  router.post('/api/gaf/bind/batchBind', controller.bind.batchBind);
  router.post('/api/gaf/bind/batchUnBind', controller.bind.batchUnBind);
  router.get('/api/gaf/bind/queryBind', controller.bind.queryBind);
  // 功能
  router.post('/api/gaf/fun/create', controller.fun.create);
  router.post('/api/gaf/fun/update', controller.fun.update);
  router.delete('/api/gaf/fun/delete/:id', controller.fun.delete);
  router.get('/api/gaf/fun/query', controller.fun.query);
  // 字典类型
  router.post('/api/gaf/codeType/create', controller.type.create);
  router.post('/api/gaf/codeType/update', controller.type.update);
  router.delete('/api/gaf/codeType/delete/:id', controller.type.delete);
  router.get('/api/gaf/codeType/query', controller.type.query);
  // 字典项
  router.post('/api/gaf/codeDictionary/create', controller.dictionary.create);
  router.post('/api/gaf/codeDictionary/update', controller.dictionary.update);
  router.delete('/api/gaf/codeDictionary/delete/:id', controller.dictionary.delete);
  router.get('/api/gaf/codeDictionary/query', controller.dictionary.query);
};
