<template>
	<swiper class="home-swiper" @change="change" :current="activeIndex">
		<swiper-item v-for="(item,index) in tab" :key="index" class="swiper-item">
			<list-item :list="listCatchData[index]" :load="load[index]" @loadmore="loadmore"></list-item>
		</swiper-item>
	</swiper>
</template>


<script>
	import listItem from './list-item.vue'
	export default {
		name: "list",
		props: {
			tab: {
				type: Array,
				default () {
					return []
				}
			},
			activeIndex: {
				type: Number,
				default: 0
			}
		},
		components: {
			listItem
		},
		data() {
			return {
				list: [],
				// js 的限制 listCatchData[index] = data
				listCatchData: {},
				load: {},
				// 每页显示数据
				pageSize: 10
			}
		},
		watch: {
			tab(newVal) {
				if (newVal.length === 0) return
				this.listCatchData = {}
				this.load = {}
				this.getList(this.activeIndex)
			}
		},
		// onLoad 页面 , created 组件
		created() {
			// 第一次渲染的时候, tab还没有被赋值,是空数组,在index.vue中的tabList还没有被云函数赋值
			uni.$on('update_article',(e)=> {
				// console.log(e)
				if (e === 'follow') {
					this.listCatchData = {}
					this.load = {}
					this.getList(this.activeIndex)					
				}
			})
		},
		methods: {
			change(e) {
				const {
					current
				} = e.detail
				this.$emit('change', current)
				// TODO 当数据不存在 或者 长度是0 的情况下,才去请求数据
				if (!this.listCatchData[current] || this.listCatchData[current].length === 0) {
					this.getList(current)
				}
			},
			// 请求文章列表数据
			getList(current) {
				if(!this.load[current]) {
					this.load[current] = {
						page: 1,
						loading: 'loading'
					}
				}
				this.$api.get_list({
					name: this.tab[current].name,
					// 当前页
					page: this.load[current].page,
					// 每页显示数据
					pageSize: this.pageSize
				}).then(res => {
					const {
						data
					} = res
					if(data.length === 0) {
						let oldLoad = {}
						oldLoad.loading = 'noMore'
						oldLoad.page = this.load[current].page
						this.$set(this.load, current,oldLoad)
						// 强制渲染页面
						this.$forceUpdate()
						return
					}
					// console.log(res)
					// this.list = data
					// this.listCatchData[current] = data
					let oldList = this.listCatchData[current] || []
					oldList.push(...data)
					// 懒加载
					this.$set(this.listCatchData, current, oldList)
				})
			},
			loadmore() {
				if(this.load[this.activeIndex].loading === 'noMore') return
				this.load[this.activeIndex].page++
				this.getList(this.activeIndex)
			}
		}

	}
</script>

<style lang="scss">
	.home-swiper {
		height: 100%;

		.swiper-item {
			height: 100%;
			overflow: hidden;

			.list-scroll {
				height: 100%;
			}
		}
	}
</style>
