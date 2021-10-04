<template>
	<list-scroll class="list-scroll">
		<list-card v-for="item in list" :key="item._id" :item="item"></list-card>
	</list-scroll>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default() {
					return []
				}
			}
		}
	}
</script>

<style lang="scss">
	.list-scroll {
		height: 100%;
	}
</style>
