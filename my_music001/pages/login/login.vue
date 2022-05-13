<template>
	<view class="login_content">
		<view class="login_img">
			<img src="../../static/109951165806093811.jpg" alt="">
		</view>
		<view class="login_mes">
			<view class="login_user">
				<img src="../../static/user/shoujihao.png" alt="">
				<input type="text" v-model="datas.phone" placeholder="请输入您的手机号码" />
			</view>
			<view class="login_user">
				<img src="../../static/user/mima.png" alt="">
				<view class="yanzm">
					<input type="password" v-model="datas.captcha" placeholder="请输入验证码" />
					<button @click="verification">验证码</button>
				</view>

			</view>
			<button class="btn_login" @click="user_login">登录</button>
		</view>
	</view>
</template>

<script>
	import {
		login,
		sendCode
	} from '../../utils/api.js'
	export default {
		data() {
			return {
				datas: {
					phone: '15170633068',
					captcha: ''
				}
			};
		},
		methods: {
			user_login() {
				login(this.datas).then(res => {
					this.$store.commit('login', res[1].data)
					// console.log(res[1].data)
					uni.navigateBack({
						delta: 1
					})
				})
			},
			verification() {
				sendCode(this.datas).then(res => {
					// console.log(res)
					if (res[1].data.code == 200) {
						uni.showToast({
							title: "验证码发送成功"
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.login_content {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100vw;
		height: 100vh;
		background-color: #f4655f;

		.login_img {
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 5vw;
			width: 32vw;
			height: 32vw;
			margin: 20vw 0;
			overflow: hidden;

			img {
				width: 32vw;
				height: 32vw;
			}
		}

		.login_mes {
			display: flex;
			flex-direction: column;

			.login_user {
				display: flex;
				flex-direction: row;
				justify-content: center;
				// background-color: #bfa;

				padding: 0 5vw;
				height: 15vw;
				margin-bottom: 3vw;

				img {
					margin: 3vw 5vw;
					width: 6vw;
					height: 6vw;
				}

				input {
					color: #fff;
					padding: 2vw;
					border-bottom: 0.5rpx solid #eaeaea;
				}

				.yanzm {
					display: flex;
					flex-direction: row;

					input {
						width: 28vw;
					}

					button {
						width: 20vw;
						height: 10vw;
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 20rpx;
					}
				}
			}
		}

		.btn_login {
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #fff;
			width: 50vw;
			height: 10vw;
			border: 1rpx solid #fff;
			border-radius: 5vw;
		}
	}
</style>
