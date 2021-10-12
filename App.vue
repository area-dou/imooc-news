<script>
	export default {
		onLaunch: function() {
			// console.log('App Launch')
			// 615b46ed618ecb000119e11a
			// 请求接口,异步
			this.$api.get_user({
				user_id: '615b46ed618ecb000119e11a'
			}).then(res => {
				// console.log(res)
				const {
					data
				} = res
				this.$store.dispatch('set_userinfo', data)
			})
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import '@/components/gaoyia-parse/parse.css'
</style>
