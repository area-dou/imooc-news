'use strict';
// 获取数据库引用
const db = uniCloud.database()

exports.main = async (event, context) => {
	const list = await db.collection('article')
	.field({
		// true 返回这个字段，false 表示不返回
		content: false
	})
	.get()
	
	//返回数据给客户端
	return {
		code: 200,
		msg: '请求数据成功',
		data: list.data
	}
};
