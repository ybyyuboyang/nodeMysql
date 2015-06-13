var getConnection = require('../config/configDB.js'),
    connection = getConnection();

function User(user){
    this.id = user.id;
    this.name = user.name;
    this.age = user.age;
    this.sex = user.sex;
    this.phone = user.phone
    this.job = user.job;
};

module.exports = User;

// 添加用户信息
User.prototype.saveUser = function(callback){
    var user = {
        name: this.name,
        age: this.age,
        sex: this.sex,
        phone: this.phone,
        job: this.job
    };

    var insertUser_Sql = "insert into user(id, name, age, sex, phone, job) values(null, ?, ?, ?, ?, ?)";

    connection.query(insertUser_Sql, [user.name, user.age, user.sex, user.phone, user.job], function (err,result) {
        if (err) {
            console.log("insertUser_Sql Error: " + err.message);
            return;
        }
        callback(err,result);                     
    }); 
}

// 获取user表总记录行
User.recordCount = function recordCount(callback){
    var recordCount_Sql = "select count(id) from user";

    connection.query(recordCount_Sql, function (err, data) {
        if (err) {
            console.log("recordCount Error: " + err.message);
            return;
        }
        callback(err,data);                     
    });
};

// 获取分页后用户列表
User.getUserList = function getUserList(callback, params) {
    var getUserList_Sql = "select * from user limit ?,?";
    
    connection.query(getUserList_Sql, [params.startIndex, params.pageSize], function (err, data) {
        if (err) {
            console.log("getUserList Error: " + err.message);
            return;
        }
        callback(err,data);                     
    });        
};

// 获取分业前用户列表
User.getAllUserList = function getAllUserList(callback) {
    var getAllUserList_Sql = "select * from user";
    
    connection.query(getAllUserList_Sql, function (err, data) {
        if (err) {
            console.log("getAllUserList Error: " + err.message);
            return;
        }
        callback(err,data);                     
    });        
};


// 获取单条用户信息 
User.prototype.getOneUser = function getOneUser(callback) {
    var user = {
        id: this.id,
    };

    var getOneUser_Sql = "select * from user where id=?";

    connection.query(getOneUser_Sql, [user.id], function (err, data) {
        if (err) {
            console.log("getOneUser_Sql Error: " + err.message);
            return;
        }
        callback(err,data);                     
    });        
};

// 删除用户信息 
User.prototype.delUserInfo = function delUserInfo(callback) {
    var user = {
        id: this.id,
    };

    var delUserInfo_Sql = "delete from user where id=?";

    connection.query(delUserInfo_Sql, [user.id], function (err, data) {
        if (err) {
            console.log("delUserInfo Error: " + err.message);
            return;
        }
        callback(err,data);                     
    });        
};

// 修改用户信息
User.prototype.editUserinfo = function editUserinfo(callback){
    var user = {
        id: this.id,
        name: this.name,
        age: this.age,
        sex: this.sex,
        phone: this.phone,
        job: this.job
    };

    var editUserinfo_Sql = "update user set name=?, age=?, sex=?, phone=?, job=? where id=?";

    connection.query(editUserinfo_Sql, [user.name, user.age, user.sex, user.phone, user.job, user.id], function (err,result) {
        if (err) {
            console.log("editUserinfo_Sql Error: " + err.message);
            return;
        }
        callback(err,result);                     
    });
}
















