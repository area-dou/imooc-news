<template>
	<view class="navbar">
		<view class="navbar-fixed">
			<!-- 状态栏 -->
			<view :style="{height:statusBarHeight + 'px'}"></view>
			<!-- 导航栏内容 -->
			<view class="navbar-content"
			:class="{search:isSearch}"
			:style="{height: navBarHeight + 'px',width:windowWidth + 'px'}"
			@click.stop="open">
				<!-- 返回箭头 -->
				<view v-if="isSearch" class="navbar-content__search-icons" @click="back">
					<uni-icons type="back" size="22" color="#fff"></uni-icons>
				</view>
				<!-- 非搜索页显示 -->
				<view v-if="!isSearch" class="navbar-search" :style="{height: windowHeight + 'px'}">
					<view class="navbar-search_icon">
						<uni-icons type="search" size="16" color="#999"></uni-icons>
					</view>
					<view class="navbar-search_text">uni-app/vue</view>
				</view>
				<!-- 搜索页显示 -->
				<view v-else class="navbar-search" :style="{height: windowHeight + 'px'}">
					<input
					class="navbar-search_text"
					type="text" value=""
					v-model="val"
					placeholder="请输入你要搜索的内容"
					@input="inputChange"
					/>
				</view>
			</view>
		</view>
		<view :style="{height:headerHeight + 'px'}"></view>
	</view>
</template>

<script>
	export default {
		name: "navbar",
		props: {
			value: {
				type: [String, Number],
				default: ''
			},
			isSearch: {
				type:Boolean,
				default: false
			}
		},
		watch:{
			value(newVal) {
				this.val = newVal
			}
		},
		data() {
			return {
				// 状态栏高度
				statusBarHeight: 20,
				// 导航栏高度
				navBarHeight: 45,
				// 搜索栏宽度
				windowWidth: 375,
				// 搜索栏高度
				windowHeight: 30,
				// 头部区域高度
				headerHeight: 65,
				// 搜索内容
				val: ''
			};
		},
		created() {
			// 获取手机系统信息
			const info = uni.getSystemInfoSync()
			// 设置状态栏高度
			this.statusBarHeight = info.statusBarHeight
			this.windowWidth = info.windowWidth
			// console.log(info)
			
			// h5 app mp-alipay
			// #ifndef H5 || APP-PLUS || MP-ALIPAY
			// 获取胶囊的位置
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			// console.log(menuButtonInfo)
			// 导航栏高度 = (胶囊底部高度 - 状态栏的高度) + (胶囊顶部高度 - 状态栏的高度)
			this.navBarHeight = (menuButtonInfo.bottom - info.statusBarHeight) + (menuButtonInfo.top - info.statusBarHeight)
			this.windowWidth = menuButtonInfo.left
			this.windowHeight = menuButtonInfo.bottom - menuButtonInfo.top
			// console.log(this.navBarHeight)
			// #endif
			this.headerHeight = this.statusBarHeight + this.navBarHeight
		},
		methods: {
			back() {
				// uni.navigateBack({})
				uni.switchTab({
					url:'/pages/tabbar/index/index'
				})
			},
			open() {
				if(this.isSearch) return
				uni.navigateTo({
					url:"/pages/home-search/home-search"
				})
			},
			inputChange(e) {
				const {value} = e.detail
				this.$emit('input', value)
			}
		}
	}
</script>

<style lang="scss">
	@import  '@/common/css/icons.css';
	.navbar {
		.navbar-fixed {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 99;
			width: 100%;
			background-color: $uni-base-color;
			.navbar-content {
				display: flex;
				box-sizing: border-box;
				justify-content: center;
				align-items: center;
				height: 45px;
				padding: 0 15px;
				.navbar-search {
					display: flex;
					align-items: center;
					padding: 0 10px;
					width: 100%;
					// height: 30px;
					border-radius: 30px;
					background-color: #FFFFFF;
					.navbar-search_icon {
						// width: 10px;
						// height: 10px;
						// border: 1px solid red;
						margin-right: 10px;
					}
					.navbar-search_text {
						width: 100%;
						font-size: 14px;
						color: #999;
					}
				}
				&.search {
					padding-left: 0;
					.navbar-content__search-icons {
						margin-left: 10px;
						margin-right: 10px;
					}
					.navbar-search {
						border-radius: 5px;
					}
				}
			}
			
		}
	}
</style>