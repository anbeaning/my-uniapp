<template>
	<view class="content">
		<view class="top_wrap">
			<view class="top_app_wrap">
				<img src="../../static/logo.png" alt="">
				<!-- <span>网易云音乐</span> -->
			</view>
			<view class="cd_wrap" @click="songstart">
				<img class="cd_show_wrap" src="../../static/needle.png" alt="">
				<view class="cd_wrap_box">
					<view class="rotate_wrap" :style="{transform:Trrotate}">
						<img class="img_wrap1" src="../../static/disc.png" alt="">
						<img class="img_wrap2" :src="songDetail.picUrl" alt="">
					</view>
					<img class="img_wrap3" v-show="!isstart" src="@/static/icon/24gl-playCircle.png" alt="">
					<img class="img_wrap3" v-show="isstart" src="@/static/24gl-pauseCircle.png" alt="">
				</view>
			</view>
		</view>
		<view class="detail-lyric">
			<view class="detail-lyric-wrap" :style="{ transform : 'translateY(' +  - (lyricIndex - 1) * 82  + 'rpx)' }">
				<view class="detail-lyric-item" :class="{ active : lyricIndex == index}"
					v-for="(item,index) in songLyric" :key="index">{{ item.lyric }}
				</view>
			</view>
		</view>
		<view class="listen_song">
			<view class="listen_top_wrap">
				<span>喜欢的这首歌的人也听</span>
			</view>
			<view class="listen_song_list" v-for="item in songSimi" :key="item.id">
				<view class="right_song_list">
					<view class="right_song_list_img">
						<img :src="item.album.picUrl" alt="">
					</view>
					<view class="song_item" @click="songliten(item.id)">
						<span class="first_span">{{item.name}}</span>
						<view class="second_span">
							<image v-if="item.privilege.flag > 60 && item.privilege.flag < 70"
								src="../../static/dujia.png" mode=""></image>
							<image v-if="item.privilege.maxbr == 999000" src="../../static/sq1.png" mode=""></image>
							<span>{{item.artists[0].name}} - {{item.name}}</span>
						</view>
					</view>
				</view>

				<img src="../../static/24gl-playCircle.png" alt="">
			</view>
		</view>
		<view class="songComment">
			<span class="pingjia">精彩评价</span>
			<view class="songComment_item" v-for="item in songComment" :key="item.commentId">
				<view class="songComment_item_top">
					<view class="left_songComment_wrap">
						<view class="user_img">
							<img v-if="item.user.avatarUrl" :src="item.user.avatarUrl" alt="">
							<img v-if="!item.user.avatarUrl" src="../../static/user/default.png" alt="">
						</view>
						<view class="user_name">
							<span style="color: #888;">{{item.user.nickname}}</span>
							<span style="font-size: 20rpx;color:#555 ;">{{getTime(item.time)}}</span>
						</view>
					</view>

					<view class="user_likedCount">
						<span>{{item.likedCount}}</span>
						<img src="../../static/icon/dianzan.png" alt="">
					</view>
				</view>
				<view class="title_content">
					<view>{{item.content}}</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	const innerAu = uni.createInnerAudioContext();
	innerAu.autoplay = false
	innerAu.src = ""
	import {
		songDetail,
		songUrl,
		songLyric,
		songSimi,
		songComment
	} from '../../utils/api.js';
	export default {
		computed: {
			getTime() {
				return (time) => {
					var date = new Date(time);
					// 返回日期
					return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
				}

			}
		},
		data() {
			return {
				isstart: false,
				deg: 0, //旋转角度
				Trrotate: "rotate(0deg)",
				Timeout: null,
				songUrl: '',
				songDetail: {
					picUrl: "",
					name: '',
					songname: '',
				},
				songLyric: [], //歌词
				lyricIndex: 0, // 歌词选中状态
				timer: null,
				songSimi: [],
				songComment: []
			}
		},
		onLoad(option) {
			// option.songId = 1397674264
			uni.showLoading({
				title: "加载中"
			})
			this.setData(option.songId);
			setTimeout(() => {
				uni.hideLoading()
			}, 500)

		},
		onUnload() {
			innerAu.destroy();

		},
		methods: {
			onpause() {
				this.isstart = false
				clearInterval(this.Timeout)
				innerAu.pause()
			},
			onplay() {
				this.isstart = true
				this.Timeout = setInterval(() => {
					this.deg = (0.5 + this.deg) % 360
					this.Trrotate = "rotate(" + this.deg + "deg)"
				}, 25)
				if (this.deg == 0) {
					innerAu.src = this.songUrl
				}
				innerAu.play()
				this.listenLyricIndex();
			},
			songstart() {
				if (this.isstart == true) {
					this.onpause();

				} else {
					this.onplay();

				}
			},
			// 转化成秒的方法
			formatTimeToSec(time) {
				// 分钟和秒分隔开后存放到数组中
				var arr = time.split(':');
				// 先把数字进行操作，再进行toFixed转换，最后返回转换成秒的结果
				return (parseFloat(arr[0]) * 60 + parseFloat(arr[1])).toFixed(2);
			},
			//  利用节流实现监听事件慢加载
			setData(id) {
				songUrl(id).then(res => {
					this.songUrl = res[1].data.data[0].url
					// console.log(res[1].data.data[0].url)
				})
				songDetail(id).then(res => {
						const dats = res[1].data.songs[0]
						this.songDetail.picUrl = dats.al.picUrl
						this.songDetail.name = dats.al.name
						this.songDetail.songname = dats.name
						// console.log(res[1].data.songs[0])

					}),
					songLyric(id).then(res => {
						let lyric = res[1].data.lrc.lyric
						// console.log(res[1].data.lrc.lyric)
						let result = [];
						let re = /\[([^\]]+)\]([^[]+)/g;
						lyric.replace(re, ($0, $1, $2) => {
							result.push({
								time: this.formatTimeToSec($1),
								lyric: $2
							})
						})
						this.songLyric = result;
						// console.log(this.songLyric)
					}),
					songSimi(id).then(res => {
						// console.log(res[1].data.songs)
						this.songSimi = res[1].data.songs
					}),
					songComment(id).then(res => {
						this.songComment = res[1].data.hotComments;
						// console.log(this.songComment)
					})
				setTimeout(() => {
					uni.setNavigationBarTitle({
						title: this.songDetail.songname
					})
				}, 500)
				// console.log(this.songDetail)
			},
			listenLyricIndex() {
				clearInterval(this.timer);
				// 监听歌词的变化,500毫秒监听一次
				this.timer = setInterval(() => {
					// 歌词遍历
					for (var i = 0; i < this.songLyric.length; i++) {
						// 播放时间小于最后一条歌词的时候
						if (this.songLyric[this.songLyric.length - 1].time < innerAu.currentTime) {
							this.lyricIndex = this.songLyric.length - 1;
							break;
						}
						// 播放时间小于上一条歌词
						if (this.songLyric[i].time < innerAu.currentTime && this.songLyric[i + 1]
							.time > innerAu.currentTime) {
							this.lyricIndex = i;
						}
					}
				});
			},
			songliten(id) {
				this.setData(id);
				innerAu.stop();
				this.deg = 0
				this.onpause();

			}
		},

	}
</script>
<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		background-color: #191919;
		// height: 3000rpx;
	}

	.top_wrap {
		width: 100%;

		.top_app_wrap {
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-top: 20rpx;
			margin-left: 20rpx;
			position: absolute;
			top: 0;
			left: 0;

			img {
				width: 180rpx;
				height: 40rpx;
			}

			span {
				font-size: 30rpx;
				color: #fff;
			}
		}

		.cd_wrap {
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			height: 120vw;
			// background-color: #bfa;

			.cd_show_wrap {
				z-index: 100;

				transform: translate(85rpx, 0);
				width: 30vw;
				height: 46vw;
			}

			.cd_wrap_box {
				position: relative;
				transform: translate(0, -180rpx);


				.rotate_wrap {

					.img_wrap1 {
						width: 70vw;
						height: 70vw;
					}

					.img_wrap2 {
						position: absolute;
						z-index: 22;
						border-radius: 50%;
						left: 13.5vw;
						top: 13.5vw;
						width: 43vw;
						height: 43vw;
					}
				}

				.img_wrap3 {
					position: absolute;
					z-index: 30;
					left: 30vw;
					top: 30vw;
					width: 10vw;
					height: 10vw;

				}


			}
		}
	}

	.detail-lyric {
		height: 246rpx;
		line-height: 82rpx;
		font-size: 32rpx;
		text-align: center;
		color: #949495;
		overflow: hidden;
		font-weight: 500;
	}

	.active {
		color: white;
	}

	.detail-lyric-wrap {
		transition: .5s;
	}

	.detail-lyric-item {
		height: 82rpx;
	}

	.listen_song {
		// background-color: #bfa;
		display: flex;
		flex-direction: column;

		.listen_top_wrap {
			display: flex;
			flex-direction: row;
			justify-content: left;
			padding: 3vw;

			span {
				font-size: 30rpx;
				color: #ececec;
			}
		}


		.listen_song_list {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			margin: 1vw 5vw;

			.right_song_list {
				display: flex;
				flex-direction: row;

				.right_song_list_img {
					width: 10vw;
					height: 10vw;
					border-radius: 1vw;
					overflow: hidden;

					img {
						width: 10vw;
						height: 10vw;

					}
				}


				.song_item {
					margin-left: 10rpx;
					display: flex;
					flex-direction: column;
					width: 70vw;
					overflow: hidden; //溢出隐藏
					white-space: nowrap; //禁止换行
					text-overflow: ellipsis;

					.first_span {
						color: #ececec;
						font-size: 30rpx;
					}

					.second_span {
						height: 40rpx;

						display: flex;
						flex-direction: row;
						align-items: center;

						image {
							padding: 1vw;
							width: 4vw;
							height: 3vw;
						}

						span {
							color: #c1c1c1;
							font-size: 20rpx;
						}
					}
				}
			}

			img {
				width: 6vw;
				height: 6vw;
			}



		}
	}

	.songComment {
		padding: 5vw;

		.pingjia {
			font-size: 35rpx;
			color: #fff;
		}

		.songComment_item {
			margin: 3vw 0;
			padding: 3vw 0;
			border-bottom: 0.5rpx solid #444;
			display: flex;
			flex-direction: column;
			// background-color: #ff5;

			.songComment_item_top {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;


				.left_songComment_wrap {
					display: flex;
					flex-direction: row;
					align-items: center;

					.user_img {
						border-radius: 50%;
						overflow: hidden;
						width: 10vw;
						height: 10vw;

						img {
							width: 10vw;
							height: 10vw;
						}
					}

					.user_name {
						padding: 0 15rpx;
						display: flex;
						flex-direction: column;
					}
				}


				.user_likedCount {
					display: flex;
					flex-direction: row;
					align-items: center;

					span {
						font-size: 20rpx;
						color: #888;
					}

					img {
						width: 5vw;
						height: 5vw;
					}
				}
			}

			.title_content {
				display: flex;
				justify-content: center;
				align-items: center;

				// background-color: #bfa;

				view {
					padding: 3vw;
					width: 80vw;
					color: #ececec;
					font-size: 25rpx;
				}
			}
		}
	}
</style>
