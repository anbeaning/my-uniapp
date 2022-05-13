<template>
	<view class="user_my">
		<view class="bg_img" :style="{backgroundImage: 'url('+bgURL+')'}">
		</view>
		<view class="user">
			<view class="user_avatar">
				<img :src="avaURL" alt="">
			</view>
			<span>{{name}}</span>
			<button @click="login_user">{{login==true?"退出登录":"登录"}}</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				login: false,
				name: '未登录',
				avaURL: '../../static/user/default.png',
				bgURL: 'https://p3.music.126.net/_f8R60U9mZ42sSNvdPn2sQ==/109951162868126486.jpg'
			};
		},
		onShow() {
			if (this.$store.state.login == true) {
				this.login = this.$store.state.login,
					this.name = this.$store.state.nickName,
					this.avaURL = this.$store.state.avatarUrl,
					this.bgURL = this.$store.state.backgroundUrl
				// console.log(this.login,this.name,this.avaURL,this.bgURL)
			}
		},
		methods: {
			login_user() {
				if (this.login == false) {
					uni.navigateTo({
						url: '/pages/login/login',
						// animationDuration: 200
					})
				} else {
					this.$store.commit('logout')
					uni.showToast({
						title: "退出登录成功"
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.user_my {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #ebebeb;
		height: 100vh;

		.bg_img {
			height: 50vw;
			width: 100vw;

		}

		.user {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 90vw;
			height: 70vw;
			background-color: #fff;
			border-radius: 3vw;
			box-shadow: 0 1vw 1vw 0.5vw #ebebeb;
			transform: translate(0, -3vw);

			.user_avatar {
				transform: translate(0, -15vw);
				width: 30vw;
				height: 30vw;
				border-radius: 50%;
				overflow: hidden;

				img {
					width: 30vw;
					height: 30vw;
				}


			}

			span {
				padding: 2vw;
				font-weight: 600;
				font-size: 40rpx;
			}

			button {
				width: 50vw;
				height: 10vw;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: 5vw;
				background-color: #e8e8e8;

				&:hover {
					background-color: #d6d6d6;
				}
			}
		}
	}
</style>
