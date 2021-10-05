'use strict';
// 获取数据库引用
const db = uniCloud.database()
const $ = db.command.aggregate

exports.main = async (event, context) => {
	const {
		user_id,
		name,
		page= 1, // 第几页 默认值
		pageSize=10 // 默认值
	} = event
	let matchObj = {}
	if (name !== '全部'){
		matchObj = {
			classify: name
		}
	}
	
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
		// 根据条件过滤文档，并且把符合条件的文档传递给下一个流水线阶段。
		.match(matchObj)
		// 把指定的字段传递给下一个流水线，指定的字段可以是某个已经存在的字段，也可以是计算出来的新字段。 
		.project({
			content: 0
		})
		// 指定一个正整数，跳过对应数量的文档，输出剩下的文档
		.skip(pageSize*(page-1))
		// 限制输出到下一阶段的记录数
		.limit(pageSize)
		// 标志聚合操作定义完成，发起实际聚合操作
		.end()


	// 接收分类，通过分类去筛选数据
	// const list = await db.collection('article')
	// .field({
	// 	// true 返回这个字段，false 表示不返回
	// 	content: false
	// })
	// .get()

	//返回数据给客户端
	return {
		code: 200,
		msg: '请求数据成功',
		data: list.data
	}
};
