'use strict';
// 获取数据库引用
const db = uniCloud.database()

exports.main = async (event, context) => {
	// .collection('表名') 获取数据库集合引用  .get()获取纪录数据
	let label = await db.collection('label').get()
	
	//返回数据给客户端
	return {
		code: 200,
		msg: '数据请求成功',
		data: label.data
	}
};
