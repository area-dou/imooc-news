'use strict';
// 获取数据库引用
const db = uniCloud.database()
const $ = db.command.aggregate

exports.main = async (event, context) => {
	const {
		user_id,
		value,
	} = event

	
	const userinfo = await db.collection('user').doc(user_id).get()
	const article_likes_ids = userinfo.data[0].article_likes_ids
	// 聚合：更精细化的去处理数据，求和、分组、指定哪些字段
	const list = await db.collection('article')
		// 获取数据库集合的聚合操作实例
		.aggregate()
		// 追加字段
		.addFields({
			is_like: $.in(['$_id',article_likes_ids])
		})
		// 把指定的字段传递给下一个流水线，指定的字段可以是某个已经存在的字段，也可以是计算出来的新字段。 
		.project({
			content: 0
		})
		.match({
			title: new RegExp(value)
		})
		// 标志聚合操作定义完成，发起实际聚合操作
		.end()

	//返回数据给客户端
	return {
		code: 200,
		msg: '请求数据成功',
		data: list.data
	}
};
