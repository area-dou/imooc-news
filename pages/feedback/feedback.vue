<template>
	<view>
		<view class="feedback-title">意见反馈：</view>
		<view class="feedback-content">
			<textarea class="feedback-textarea" v-model="content" placeholder="请输入你要反馈的问题" />
		</view>
		<view class="feedback-title">反馈图片：</view>
		<view class="feedback-image-box">

			<!-- 图片展示 -->
			<view class="feedback-image-item" v-for="(item, index) in imageLists" :key="index">
				<view class="close-icon" @click="del(index)">
					<uni-icons type="closeempty" size="18" color="#fff"></uni-icons>
				</view>
				<view class="image-box">
					<image :src="item.url" mode="aspectFill"></image>
				</view>
			</view>

			<!-- 添加图片 -->
			<view v-if="imageLists.length < 5" class="feedback-image-item" @click="addImage">
				<view class="image-box">
					<uni-icons type="plusempty" size="50" color="#eee"></uni-icons>
				</view>
			</view>
		</view>
		<button class="feedback-button" type="primary" @click="submit">提交反馈意见</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: '',
				imageLists: []
			}
		},
		methods: {
			del(index) {
				this.imageLists.splice(index, 1)
			},
			addImage() {
				const count = 5 - this.imageLists.length
				// 从本地相册选择图片或使用相机拍照 
				uni.chooseImage({
					// 最多可以选择的图片张数，默认9 
					count,
					success: (res) => {

						const tempFiles = res.tempFiles
						tempFiles.forEach((item, index) => {
							// 处理 h5 多选的状态
							if (index < count) {
								this.imageLists.push({
									url: item.path,
									cloudPath: item.name,
								})
							}
						})
						console.log(this.imageLists)
						console.log(res)
					}
				})
			},
			async submit() {
				let imagesPath = []
				uni.showLoading()
				// 每次只能上传一张，使用同步
				for (let i = 0; i < this.imageLists.length; i++) {
					let filePath = this.imageLists[i].url
					let cloudPath = this.imageLists[i].cloudPath
					let fileID = await this.uploadFiles(filePath, cloudPath)
					imagesPath.push(fileID)
				}
				this.updateFeedback({
					content: this.content,
					feedbackImages: imagesPath
				})
			},
			async uploadFiles(filePath, cloudPath) {
				const result = await uniCloud.uploadFile({
					filePath: filePath,
					cloudPath: cloudPath
				})
				return result.fileID
			},
			updateFeedback({content, feedbackImages}) {
				this.$api.update_feedback({content, feedbackImages}).then(res=> {
					uni.hideLoading()
					uni.showToast({
						title: '反馈提交成功',
						icon:'none'
					})
					// 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面 
					setTimeout(()=> {
						uni.switchTab({
							url: '/pages/tabbar/my/my'
						})
					},2500)
				}).catch(()=> {
					uni.hideLoading()
					uni.showToast({
						title: '反馈提交失败',
						icon:'none'
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	.feedback-title {
		margin: 15px 15px 0;
		font-size: 14px;
		color: #666;
	}

	.feedback-content {
		margin: 15px;
		padding: 10px;
		box-sizing: border-box;
		border: 1px #eee solid;

		.feedback-textarea {
			font-size: 12px;
			width: 100%;
			height: 100px;
		}
	}

	.feedback-image-box {
		display: flex;
		flex-wrap: wrap;
		padding: 10px;

		.feedback-image-item {
			position: relative;
			width: 33.33%;
			height: 0;
			padding-top: 33.33%;
			box-sizing: border-box;

			.close-icon {
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				right: 0;
				top: 0;
				width: 22px;
				height: 22px;
				border-radius: 50%;
				background-color: #ff5a5f;
				z-index: 2;
			}

			.image-box {
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				top: 5px;
				right: 5px;
				bottom: 5px;
				left: 5px;
				border: 1px #eee solid;
				border-radius: 5px;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}

	.feedback-button {
		margin: 0 15px;
		background-color: $uni-base-color;
	}
</style>
