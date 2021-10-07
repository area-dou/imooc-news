<template>
	<view class="home">
		<!-- 自定义导航栏组件 -->
		<navbar></navbar>
		<tab :list="tabList" :tabIndex="tabIndex" @tab="tab"></tab>
		<view class="home-list">
			<list :tab="tabList" :activeIndex="activeIndex" @change="change"></list>
		</view>
		<!-- 		<list-scroll>
			<list-card mode="base"></list-card>
			<list-card mode="image"></list-card>
			<list-card mode="column"></list-card>
		</list-scroll> -->
	</view>
</template>

<script>
	// easycom将其精简为一步。 局部引入
	// 只要组件安装在项目的components目录下，并符合components/组件名称/组件名称.vue目录结构。
	// import navbar from '@/components/navbar/navbar.vue'
	export default {
		// components: {
		// 	navbar
		// },
		data() {
			return {
				title: 'Hello',
				tabList: [],
				tabIndex: 0,
				activeIndex: 0
			}
		},
		onLoad() {
			uni.$on('labelChange',(res)=> {
				this.tabList = []
				this.tabIndex = 0
				this.activeIndex = 0
				this.getLabel()
			})
			this.getLabel()
		},
		methods: {
			change(current) {
				this.tabIndex = current
				this.activeIndex = current
				// console.log('当前current的值：',current)
			},
			tab( {data, index} ) {
				// console.log('接收到的————数据  ', data)
				// console.log('接收到的————索引  ', index)
				this.activeIndex = index
			},
			getLabel() {
				// 调用云函数方法
				// console.log(this.$api)
				this.$api.get_label().then((res) => {
					const {
						data
					} = res
					// console.log('标签', data)
					data.unshift({
						name: '全部'
					})
					this.tabList = data
					// console.log(this.tabList)
				})

			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;

		.home {
			display: flex;
			flex-direction: column;
			flex: 1;
			border: 1px solid red;
			overflow: hidden;

			.home-list {
				flex: 1;
				box-sizing: border-box;
			}
		}
	}
</style>
