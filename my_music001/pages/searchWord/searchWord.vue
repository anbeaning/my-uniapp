<template>
	<view class="search_wrap">
		<uni-search-bar class="uni-mt-10 search" radius="100" bgColor="#f6f7f7" placeholder="搜索歌曲" clearButton="none"
			cancelButton="none" @confirm="search" />
		<view class="search_list">
			<view class="search_list_i" v-for="item1 in searchList" :key="item1.id" @click="listen_song(item1.id)">
				<view class="search_list_i_left">
					<span class="search_list_1">{{ item1.name }}</span>
					<span class="search_list_2">{{ item1.artists[0].name }} - {{ item1.album.name }}</span>
				</view>
				<img src="../../static/24gl-playCircle.png" alt="">
			</view>
		</view>

	</view>
</template>

<script>
	import {
		searchHot,
		searchWord
	} from '../../utils/api.js'
	export default {
		data() {
			return {
				searchList: [],
			};
		},
		onLoad(option) {
			if (!option.searchWord) option.searchWord = "偏爱"
			this.searchWords(option.searchWord)


		},
		methods: {
			searchWords(Word) {
				uni.showLoading({
					title: "加载中"
				})
				searchWord(Word).then(res => {
					this.searchList = res[1].data.result.songs
					uni.hideLoading()
					// console.log(res[1].data.result.songs)
				})

			},
			listen_song(id) {
				uni.navigateTo({
					url: `/pages/detail/detail?songId=${id}`
				})
			},

		}
	}
</script>

<style lang="less" scoped>
	.search_wrap {
		background-color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: center;

		.search {
			// height: 10vw;
			// width: 90vw;
			// margin-left: 2vw;
		}
	}

	.history_wrap {
		// background-color: #bba;
		display: flex;
		flex-direction: column;

		.history_wrap_top {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			padding: 0 3vw;

			span {
				font-size: 30rpx;
				font-weight: 600;
			}

			.history_del {
				img {
					width: 7vw;
					height: 7vw;
				}
			}

		}

		.history_wrap_list {
			display: flex;
			flex-wrap: wrap;
			padding: 3vw;

			.history_wrap_list_i {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 5vw;
				margin: 1vw 2vw;
				padding: 1vw 2vw;
				border-radius: 3.5vw;
				background-color: #f7f7f7;
			}
		}
	}

	.hot_wrap {
		padding: 5vw;
		// background-color: #bfa;

		span {
			font-size: 30rpx;
			font-weight: 600;
		}

		.hot_wrap_list {
			display: flex;
			flex-direction: column;

			.hot_wrap_list_i {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				height: 15vw;

				.hot_wrap_list_i_left {
					// background-color: #bb0;
					display: flex;
					flex-direction: row;
					align-items: center;

					span {

						font-size: 35rpx;
						padding: 0 3vw;
					}

					.hot_content {

						display: flex;
						flex-direction: column;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						width: 60vw;

						.hot_i {
							font-size: 35rpx;
							font-weight: 500;

						}

						.hot_i_content {
							font-size: 15rpx;
							color: #d0d0d0;

						}
					}
				}


				.hot_score {
					font-size: 20rpx;
					font-weight: 500;
					color: #d0d0d0;
				}
			}
		}
	}

	.search_list {
		display: flex;
		flex-direction: column;

		.search_list_i {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			margin: 0 5vw;
			padding: 3vw 0;
			border-bottom: 0.5rpx solid #d0d0d0;

			.search_list_i_left {
				display: flex;
				flex-direction: column;

				.search_list_1 {
					font-size: 30rpx;
					font-weight: 500;
				}

				.search_list_2 {
					font-size: 20rpx;
					color: #b9b9b9;
				}

			}

			img {
				width: 7vw;
				height: 7vw;
			}
		}
	}
</style>
