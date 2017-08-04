<template>
<transition name="slide-fade">
	<div class="signin">
		<header>
			<i class="icon icon-back" @click="handleBack"></i>
			<span class="text">手机号登录</span>
		</header>
		<form class="siginin-form">
			<div class="input-wrap">
				<i class="icon icon-account"></i>
				<input type="text" class="username" v-model="username" placeholder="账号">
			</div>
			<div class="input-wrap">
				<i class="icon icon-lock"></i>
				<input type="password" class="password" v-model="password" placeholder="密码">
			</div>
			<div class="button-wrap">
				<button type="button" name="button" @click="handleSignin" :disabled="unAbleToSignin">
					登录
				</button>
			</div>
		</form>
	</div>
</transition>
</template>

<script>
import { signin } from '@/modules/request'

export default {
  name: 'signin',

  data () {
    return {
      unAbleToSignin: true,
      username: '',
      password: ''
    }
  },

  methods: {
    handleBack () {
      this.$router.back()
    },
    handleSignin () {
      if (!this.username.match(/^1[34578]\d{9}$/)) {
        this.$message({
          message: '手机格式不正确',
          type: 'error',
          duration: 1000
        })
        return
      }
      this.unAbleToSignin = true
      let handling = this.$message({
        message: '登录中',
        type: 'loading',
        duration: 0
      })
      signin({
        cellphone: this.username,
        password: this.password
      }).then((res) => {
        handling.close()
        this.$store.dispatch('setUser', res.data)
        localStorage.setItem('user', JSON.stringify(res.data))
        this.unAbleToSignin = false
        this.$router.push('/home')
      }).catch(() => {
        this.$message({
          message: '账号或密码错误',
          duration: 1000
        })
        this.unAbleToSignin = false
      })
    },
    validate () {
      if (this.username !== '' && this.password !== '') {
        this.unAbleToSignin = false
      } else {
        this.unAbleToSignin = true
      }
    }
  },
  watch: {
    username () {
      this.validate()
    },
    password () {
      this.validate()
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
$base-color: rgb(212, 60, 51);

.signin {
	position: absolute;
	top: 0;
	left: 0;
	background: white;
	z-index: 999;
	width: 100%;
	height: 100%;

	header {
		position: relative;
		height: 0.48rem;
		line-height: 0.48rem;
		color: white;
		background-color: $base-color;

		.icon {
			position: absolute;
			top: 0.11rem;
			left: 0.12rem;
			font-size: 0.26rem;
		}

		.text {
			font-size: 0.2rem;
		}
	}

	.siginin-form {
		$border-color: rgb(238, 239, 241);
		margin-top: 0.16rem;
		border-radius: 0.05rem;

		.input-wrap {
			position: relative;

			.icon {
				position: absolute;
				top: 0.11rem;
				left: 0.25rem;
				color: rgb(121, 123, 128);
				font-size: 0.2rem;
			}

			input {
				height: 0.42rem;
				width: 3rem;
				text-indent: 0.42rem;
				font-size: 0.16rem;
				border: none;
			}

			.password,
			.username {
				border: 1px solid $border-color;
			}

			.username {
				border-bottom: none;
				border-radius: 0.05rem 0.05rem 0 0;
			}

			.password {
				border-radius: 0 0 0.05rem 0.05rem;
			}
		}

		.button-wrap {
			margin-top: 0.15rem;

			button {
				height: 0.42rem;
				width: 3rem;
				color: white;
				font-size: 0.16rem;
				background-color: $base-color;
			}
		}
	}
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: transform 0.3s;
}
.slide-fade-enter,
.slide-fade-leave-active {
  transform: translateX(100%);
}
</style>
