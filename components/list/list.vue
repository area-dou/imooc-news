<template>
		<swiper class="home-swiper" @change="change" :current="activeIndex">
			<swiper-item v-for="(item,index) in tab" :key="index" class="swiper-item">
				<list-item :list="list"></list-item>
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
				list:[]
			}
		},
		// onLoad 页面 , created 组件
		created() {
			this.getList()
		},
		methods: {
			change(e) {
				const {
					current
				} = e.detail
				// console.log(e)
				this.$emit('change', current)
			},
			// 请求文章列表数据
			getList() {
				this.$api.get_list().then(res=> {
					console.log(res)
					const {data} = res
					this.list = data
				})
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
