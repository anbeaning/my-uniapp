<template>
	<view class="content">
		<view class="top_wrap" :style="{backgroundImage:'url('+ playlist.coverImgUrl +')'}">
			<view class="top_first_wrap">
				<view class="top_img_wrap">
					<img :src="playlist.coverImgUrl" alt="">
					<view class="top_img_wrap_playCount">
						<img src="../../static/icon/24gl-play.png" alt="">
						<span>{{getplayCount}}亿</span>
					</view>

				</view>
				<view class="top_message_wrap">
					<span class="top_message_wrap_name">{{playlist.name}}</span>
					<view class="top_app_wrap">
						<img src="../../static/icon/wangyiyunyinle.png" alt="">
						<span>网易云音乐</span>
					</view>
					<view class="top_description">
						<span>{{playlist.description}}</span>
						<img src="../../static/icon/xiangyoujiantou.png" alt="">
					</view>
				</view>

			</view>
			<view class="top_fenxiang">
				<img src="../../static/icon/fenxiang.png" alt="">
				<span>分享给微信好友</span>
			</view>
		</view>
		<view class="playlist_wrap">
			<view class="start_all">
				<img src="../../static/24gl-playCircle.png" alt="">
				<span class="first_span">播放全部</span>
				<span class="second_span">(共{{playlist.tracks.length}}首)</span>
			</view>
			<view class="playlist_item_wrap" v-for="(item,index) in playlist.tracks" :key="index"
				@click="song(item.id)">
				<view class="playlist_item_wrap_left">
					<span class="song_index">{{index+1}}</span>
					<view class="song_wrap">
						<span class="first_span">{{item.name}}</span>
						<span class="second_span">{{item.ar[0].name}}--{{item.al.name}}</span>
					</view>
				</view>
				<img src="../../static/icon/bofang_o.png" alt="">
			</view>
		</view>
	</view>
</template>

<script>
	import {
		list
	} from '@/utils/api.js'
	export default {
		computed: {
			getplayCount() {
				var count = this.playlist.playCount / 100000000
				return count.toFixed(1)

			}
		},
		data() {
			return {
				playlist: []
			}
		},
		onLoad(option) {
			uni.showLoading({
				title: "正在加载中"
			})
			// option.listId = "19723756"
			list(option.listId).then(res => {
				this.playlist = res[1].data.playlist
				uni.hideLoading()
				// console.log(res[1].data.playlist)
			})
		},
		methods: {
			song(id) {
				// console.log(id)
				uni.navigateTo({
					url: `/pages/detail/detail?songId=${id}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top_wrap {
		display: flex;
		flex-direction: column;
		padding-bottom: 10vw;

		.top_first_wrap {
			margin-top: 10vw;
			display: flex;
			flex-direction: row;
			justify-content: space-around;
		}

	}

	.top_img_wrap {
		position: relative;
		width: 35vw;
		height: 35vw;
		border-radius: 2vw;
		overflow: hidden;

		img {
			width: 35vw;
			height: 35vw;
		}

		.top_img_wrap_playCount {
			position: absolute;
			right: 10rpx;
			top: 10rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			img {
				width: 30rpx;
				height: 30rpx;
			}

			span {
				font-size: 30rpx;
				color: #fff;
			}
		}

	}

	.top_message_wrap {
		display: flex;
		flex-direction: column;
		width: 50vw;

		.top_message_wrap_name {
			font-size: 40rpx;
			color: #fff;
			margin-bottom: 10rpx;
		}

		.top_app_wrap {
			margin-bottom: 10rpx;
			// background-color: #bfa;
			display: flex;
			flex-direction: row;
			// justify-content: center;
			align-items: center;

			img {
				width: 30rpx;
				height: 30rpx;
			}

			span {
				color: #c1c1c1;
			}
		}

		.top_description {
			// background-color: #bfa;
			// height: 30rpx;
			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			line-clamp: 2;
			-webkit-box-orient: vertical;
			color: #c2c2c2;

			span {
				font-size: 25rpx;
				color: #c2c2c2;
			}

			img {
				width: 30rpx;
				height: 30rpx;
			}
		}

	}

	.top_fenxiang {
		margin: 3vw 0;
		margin-left: 25vw;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 50vw;
		height: 10vw;
		background-color: #c1c1c1;
		opacity: 0.5;
		border-radius: 5vw;

		img {
			width: 30rpx;
			height: 30rpx;
		}
	}

	.playlist_wrap {
		display: flex;
		flex-direction: column;
		border-radius: 8vw 8vw 0 0;
		background-color: #fff;
		padding-top: 20rpx;
		transform: translate(0, -8vw);


		.start_all {
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-left: 3vw;

			img {
				padding: 0 3vw;
				width: 7vw;
				height: 7vw;

			}

			.first_span {
				font-size: 35rpx;
				margin-right: 10rpx;
			}

			.second_span {
				font-size: 20rpx;
				color: #c0c0c0;
			}
		}
	}

	.playlist_item_wrap {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 0 2vw;
		margin: 10rpx 0;

		.playlist_item_wrap_left {
			display: flex;
			flex-direction: row;
			align-items: center;

			.song_index {
				// margin: 0 2vw;
				width: 10vw;
				font-size: 35rpx;
				color: #c0c0c0;
				text-align: center;
			}

			.song_wrap {
				display: flex;
				flex-direction: column;
				width: 60vw;
				overflow: hidden; //溢出隐藏
				white-space: nowrap; //禁止换行
				text-overflow: ellipsis;

				.first_span {
					font-size: 30rpx;
				}

				.second_span {
					font-size: 20rpx;
					color: #c0c0c0;
				}
			}
		}


		img {
			width: 9vw;
			height: 9vw;
		}
	}
</style>
