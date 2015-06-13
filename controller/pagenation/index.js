var	User = require('../../models/user.js');

function pageNation(){};

pageNation.getPageParams = function getPageParams(startIndex, pageSize, pageCount, curPage){
	if(startIndex == 1){
		startIndex = 0
	}else{
		startIndex = (startIndex - 1) * pageSize
	}

	var params = {
		startIndex: startIndex,
		pageSize: pageSize
	}
	return params
};

pageNation.getPageArr = function getPageArr(pageSize, pageCount, recordCount){
	var pageArr = [];
	
	pageCount = recordCount[0]['count(id)']/pageSize;
	for(var i = 1;i<pageCount+1;i++){
		pageArr.push(i);
	}
	return pageArr;
}



module.exports = pageNation;