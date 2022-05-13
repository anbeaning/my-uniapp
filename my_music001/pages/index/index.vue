<template>
	<view class="container">
		<uni-search-bar class="uni-mt-10" radius="100" placeholder="搜索歌曲" clearButton="none" cancelButton="none"
			bgColor="#e6e6e6" @confirm="search" @focus="tosearch" />

		<view class="toplist_wrap">
			<view class="toplist_item" v-for="item in topList" :key="item.id" @click="list(item.listId)">
				<view class="img_wrap">
					<img :src="item.coverImgUrl" alt="">
					<span>{{item.updateFrequency}}</span>
				</view>
				<view class="toplist_right_wrap">
					<view class="toplist_right_wrap_item" v-for="item1 in item.tracks" :key="item1.first">
						<span>{{item1.first}}--{{item1.second}}</span>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		topList
	} from '@/utils/api.js'
	export default {
		data() {
			return {
				topList: []
			}
		},
		onLoad() {
			topList().then(res => {
				// console.log(res)
				this.topList = res
			})
		},

		methods: {
			list(listId) {
				uni.navigateTo({
					url: `/pages/list/list?listId=${listId}`
				})
			},
			tosearch() {
				uni.redirectTo({
					url: '/pages/search/search'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.uni-mt-10 {
		width: 90%;
	}

	.toplist_wrap {
		width: 90vw;
		display: flex;
		flex-direction: column;
		justify-content: center;

		.toplist_item {
			display: flex;
			flex-direction: row;
			margin: 2vw 0;

			.img_wrap {
				width: 30vw;
				height: 30vw;
				position: relative;
				border-radius: 3vw;
				overflow: hidden;

				img {
					width: 30vw;
					height: 30vw;
				}

				span {
					position: absolute;
					left: 10rpx;
					bottom: 10rpx;
					color: #fff;
					font-size: 10rpx;
				}
			}

			.toplist_right_wrap {
				height: 25vw;
				padding: 2.5vw 0;
				width: 60vw;
				display: flex;
				flex-direction: column;
				justify-content: space-around;

				.toplist_right_wrap_item {
					width: 55vw;
					padding-left: 5vw;
					overflow: hidden; //溢出隐藏
					white-space: nowrap; //禁止换行
					text-overflow: ellipsis;

					span {
						width: 65vw;
					}
				}
			}
		}
	}
</style>
