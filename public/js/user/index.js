$(function(){

	/**
	 * 全局变量
	 */
	var userList = $('.user-list');

	init();

	/**
	 * 初始化方法
	 */
	function init(){
		bindEvent();
	}

	/**
	 * 事件绑定
	 */
	function bindEvent(){	
		userList
			.on('click','.del-info',delInfo)
			.on('click','.edit-info',getInfo)
	}

	/**
	 * 删除用户信息
	 */
	function delInfo(){
		var parentTr = $(this).parent().parent(),
		    userId = parentTr.find('.user-id').text();

		$.ajax({
			url: '/user/userlist',
			type: 'post',
			data:{
				userId: userId
			}
		})
		.done(function(res){
			if(res.status == 0){
				parentTr.remove();
				console.log('删除成功')
			}
		})
		.fail(function(res){
			console.log('删除失败')
		})
	}

	/**
	 * 获取单个用户信息
	 */
	function getInfo(){
		var parentTr = $(this).parent().parent(),
		    userId = parentTr.find('.user-id').text();
		
		window.location.href = "useredit?id="+userId;
	}

})