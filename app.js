var express = require('express');
var path = require('path');
var port = process.env.PORT || 3000;
var userList = require('./routes/user/index');
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', __dirname + '/views/pages');
app.set('view engine','ejs');
app.use('/', express.static(__dirname + '/public'));
app.use('/user', userList);
app.listen(port);

console.log('started on port:'+port);
