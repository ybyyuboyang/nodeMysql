var express = require('express'),
	router = express.Router(),
	cotrolUser = require('../../controller/user/index.js');

/**
 * 用户列表路由
 */
router.route('/userlist')

	// 获取用户列表
	.get(function(req, res){
		cotrolUser.getUserList(
			function(data, pageArr, curPage){
				res.render('user/user_list',{
					title: '用户列表',
					data: data,
					pageCount: pageArr,
					curPage: curPage
				})
			}
		, req)
	})

	// 删除用户
	.post(function(req, res) {
		cotrolUser.delUserInfo(function(status){
			res.json({
				status: status
			})
		}, req)
	});

/**
 * 添加用户路由
 */
router.route('/userinsert')

	// 获取添加用户模板
	.get(function(req, res) {
		res.render('user/user_insert',{
			title:'添加用户',
			data: {
				message:''
			}
		})
	})

	// 添加用户信息
	.post(function(req, res) {
		cotrolUser.saveUser(function(message){
			res.render('user/user_insert',{
				title:'添加用户',
				data: {
					message:message
				}
			})
		}, req)
	});

/**
 * 修改用户信息路由
 */
router.route('/useredit')

	// 获取修改用户信息模板，插入对应数据
	.get(function(req, res) {
		cotrolUser.getOneUser(function(data){
			res.render('user/user_edit',{
				title:'修改用户信息',
				data: data
			})
		}, req)
	})

	// 修改用户信息
	.post(function(req, res) {
		cotrolUser.editUserinfo(function(data, pageArr, curPage){
			res.render('user/user_list',{
				title: '用户列表',
				data: data,
				pageCount: pageArr,
				curPage: curPage
			});	
		}, req)
	});

module.exports = router;

























