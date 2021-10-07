'use strict';
// 获取数据库引用
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	const {
		user_id,
		type
	} = event
	let matchObj = {}
	if (type !== 'all') {
		matchObj = {
			current: true
		}
	}
	let userinfo = await db.collection('user').doc(user_id).get()
	userinfo = userinfo.data[0]
	// label_ids =  ['label._id']
	// 获取 label 表的数据
	// .collection('表名') 获取数据库集合引用  .get()获取纪录数据
	// let label = await db.collection('label').get()
	let label = await db.collection('label')
	.aggregate()
	.addFields({
		current: $.in(['$_id', $.ifNull([userinfo.label_ids, []])])
	})
	.match(matchObj)
	.end()
	
	//返回数据给客户端
	return {
		code: 200,
		msg: 'label数据请求成功',
		data: label.data
	}
};
