<template>
	<view class="search_wrap">
		<uni-search-bar class="uni-mt-10 search" radius="100" bgColor="#f6f7f7" placeholder="搜索歌曲" clearButton="none"
			cancelButton="none" @confirm="search" @input="SearchSuggest" />
		<view class="hot_history_wrap" v-show="!issSugP">
			<view class="history_wrap">
				<view class="history_wrap_top">
					<span>历史记录</span>
					<view class="history_del" @click="del_history">
						<img src="../../static/icon/shanchu.png" alt="">
					</view>

				</view>
				<view class="history_wrap_list">
					<view class="history_wrap_list_i" v-for="item in history" :key="item">
						{{item}}
					</view>
				</view>
			</view>
			<view class="hot_wrap">
				<span>热搜榜</span>
				<view class="hot_wrap_list">
					<view class="hot_wrap_list_i" v-for="(item,index) in searchHot" :key="index"
						@click="searchHot_Word(item.searchWord)">
						<view class="hot_wrap_list_i_left">
							<span>{{index+1}}</span>
							<view class="hot_content">
								<span class="hot_i"> {{item.searchWord}}</span>
								<span class="hot_i_content">{{item.content}}</span>
							</view>
						</view>
						<span class="hot_score">{{item.score}}</span>
					</view>
				</view>
			</view>
		</view>
		<view class="searchSuggest" v-show="issSugP">
			<span class="ss_span">搜索“{{searchWord}}”</span>
			<view class="suggestList">
				<view class="suggest_i" v-for="item in SuggestList" :key="item.keyword"
					@click="searchHot_Word(item.keyword)">
					<img src="../../static/sousuo.png" alt="">
					<span>{{item.keyword}}</span>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		searchHot,
		searchWord,
		searchSuggest
	} from '../../utils/api.js'
	export default {
		data() {
			return {
				history: [],
				searchHot: [],
				isshow: true,
				searchWord: "",
				issSugP: false,
				SuggestList: []
			};
		},
		onLoad() {
			searchHot().then(res => {
				this.searchHot = res[1].data.data
				// console.log(res[1].data.data)
			})
			uni.getStorage({
				key: "history",
				success: (res) => {
					this.history = res.data
					// console.log(res)
				}
			})


		},
		onHide() {
			this.issSugP = false
		},
		methods: {
			searchHot_Word(searchWord) {
				this.setHistory(searchWord)
				uni.navigateTo({
					url: `/pages/searchWord/searchWord?searchWord=${searchWord}`
				})

			},
			search(e) {
				// this.searchWords(e.value)
				this.setHistory(e.value)
				uni.navigateTo({
					url: `/pages/searchWord/searchWord?searchWord=${e.value}`
				})

			},
			setHistory(word) {
				const his = this.history
				var newhis = his.filter(item => item == word)
				// console.log(newhis.length);
				if (newhis.length == 0) {
					his.push(word)
					// console.log(his);
					uni.setStorage({
						key: "history",
						data: his
					})
				}

			},

			del_history() {
				uni.removeStorage({
					key: "history",
					success: () => {
						uni.showToast({
							title: "清除成功",
						})
						this.history = []
					}
				})
			},
			SearchSuggest(word) { //搜索建议
				//res[1].data.result.allMatch;
				searchSuggest(word).then(res => {
					this.searchWord = word
					this.SuggestList = res[1].data.result.allMatch;
					this.issSugP = true
					// console.log(this.SuggestList);

				})
			}
		}
	}
</script>

<style lang="scss" scoped>
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

	//搜索历史
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

	//搜索热点
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

	.searchSuggest {
		display: flex;
		flex-direction: column;
		padding: 5vw;

		.ss_span {
			font-size: 20rpx;
			color: #4c88e8;
		}

		.suggestList {
			display: flex;
			flex-direction: column;
			justify-content: left;

			.suggest_i {
				display: flex;
				flex-direction: row;
				align-items: center;
				padding: 3vw;

				img {
					width: 5vw;
					height: 5vw;
				}

				span {
					padding: 0 2vw;
					font-size: 25rpx;
				}
			}
		}
	}
</style>
