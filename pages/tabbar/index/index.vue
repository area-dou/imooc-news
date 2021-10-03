<template>
   	<view class="content">
   		<!-- 自定义导航栏组件 -->
   		<navbar></navbar>
   		<tab :list="tabList" @tab="tabs"></tab>

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
   				tabList: []
   			}
   		},
   		onLoad() {
   			this.getLabel()
   		},
   		methods: {
			tabs(data, index) {
				console.log(data, index)
			},
   			getLabel() {
   				// 调用云函数方法
				console.log(this.$api)
   				this.$api.get_label({
   					name: 'get_label',
   				}).then((res) => {
   					const {
   						data
   					} = res
   					this.tabList = data
   					// console.log(this.tabList)
   				})
				
   			}
   		}
   	}
   </script>

   <style lang="scss">
   </style>
