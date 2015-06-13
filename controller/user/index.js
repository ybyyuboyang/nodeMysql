var express = require('express'),
	router = express.Router(),
	User = require('../../models/user.js'),
	pageNation = require('../../controller/pagenation/index.js');

// 用户相关controller类
function ctrolUser(){};

/**
 * 获取用户列表
 */
ctrolUser.getUserList = function getUserList(callBack, req){
	var startIndex = req.query['startIndex'] || 1,
		pageSize = 10,
		pageCount,
		curPage = req.query['startIndex'] || 1;

	// 获取model分页类所需参数(调用分页类)
	var params = pageNation.getPageParams(startIndex, pageSize, pageCount, curPage);

	User.getUserList(function(err, data){
		if(err){
			data = [];
		}
		User.recordCount(function(err, recordCount){
			if(err){
				recordCount = [];
			}

			// 获取全部页数(调用分页累)
			var pageArr = pageNation.getPageArr(pageSize, pageCount, recordCount);
			callBack(data, pageArr, curPage);
		})
	}, params);
};

/**
 * 删除用户
 */
 ctrolUser.delUserInfo = function delUserInfo(callBack, req){
	var id = req.body['userId'];

	var userInfo = new User({
		id: id
	});

	userInfo.delUserInfo(function(err, result){
		var status;

		if(err){
			status = 1;
			console.log('删除用户时出错了')
			return;
		}else{
			status = 0;
		}
		callBack(status)
	});
};

/**
 * 添加用户 
 */
ctrolUser.saveUser = function saveUser(callBack, req){
	var name = req.body['name'],
		age = req.body['age'],
		sex = req.body['sex'],
		phone = req.body['phone'],
		job = req.body['job'];

	var userInfo = new User({
		name: name,
		age: age,
		sex: sex,
		phone: phone,
		job: job
	});

	userInfo.saveUser(function (err, result) {
		if (err) {
			console.log('添加用户时出错了')
			return;            
		}   
		var insertId = result.insertId,
			message;

		if(insertId > 0){
			message = 'success';
		}else{
			message = 'error'
		}

		callBack(message) 
	});
}

/**
 * 获取某一个用户信息
 */
 ctrolUser.getOneUser = function getOneUser(callBack, req){
	var id = req.query['id'];

	var userInfo = new User({
		id: id
	});

	userInfo.getOneUser(function(err, data){
		if(err){
			console.log('查询用户时出错了')
			return;
		}
		var data = data[0];

		callBack(data)
	})
}

/**
 * 修改用户信息
 */
ctrolUser.editUserinfo = function editUserinfo(callBack, req){
	var id = req.body['id'],
		name = req.body['name'],
		age = req.body['age'],
		sex = req.body['sex'],
		phone = req.body['phone'],
		job = req.body['job'];
		
	var userInfo = new User({
		id: id,
		name: name,
		age: age,
		sex: sex,
		phone: phone,
		job: job
	});

	userInfo.editUserinfo(function (err, result) {
		if (err) {
			console.log('修改用户时出错了')
			return;            
		}   
		if(result.affectedRows > 0){

			var params = {
				'startIndex': 1,
				'pageSize': 10
			}

			var url = 'user/user_list'

			User.getUserList(function(err, data){
				if(err){
					data = [];
				}
				var startIndex = req.query['startIndex'] || 1,
					pageSize = 10,
					pageCount,
					curPage = req.query['startIndex'] || 1;

				User.recordCount(function(err, recordCount){
					if(err){
						recordCount = [];
					}

					// 获取全部页数(调用分页累)
					var pageArr = pageNation.getPageArr(pageSize, pageCount, recordCount);
					callBack(data, pageArr, curPage);
				})
			}, params);
		}
	}); 
}

module.exports = ctrolUser;





