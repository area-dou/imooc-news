// vuex 状态管理
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	// 流程 调用vuex中action中的方法，然后commit（提交）mutations的方法去改变state里的数据
	// 数据源
	state: {
		historyLists: uni.getStorageSync("__history") || []
	},
	// 可以改变数据源的数据
	mutations: {
		SET_HISTORY_LISTS(state, list) {
			state.historyLists = list
		},
		CLEAR_HISTORY(state) {
			state.historyLists = []
		}
	},
	// 修改mutations 里的方法，处理异步 commit调用mutations里的方法
	actions: {
		set_history({commit, state}, history) {
			let list = state.historyLists
			list.unshift(history)
			uni.setStorageSync("__history",list)
			commit('SET_HISTORY_LISTS', list)
		},
		clearHistory({commit}) {
			uni.removeStorageSync("__history")
			commit('CLEAR_HISTORY')
		}
	}
	
})
export default store
