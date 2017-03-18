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
				<button type="button" name="button" @click="handleSignin" :disabled="unAblebToSignin">
						登录
					</button>
			</div>
		</form>
	</div>
</transition>
</template>

<script>
import {
	signin
} from '@/modules/request';

export default {
	name: 'signin',
	data() {
		return {
			unAblebToSignin: true,
			username: '',
			password: '',
			messageVisible: false
		}
	},
	mounted() {
		this.$Notification.success('编辑成功', '')
		//this.$message.success('123', '123', 1000)
	},
	methods: {
		handleBack() {
			this.$router.back();
		},
		handleSignin() {
			this.messageVisible = true;
			signin({
				username: this.username,
				password: this.password
			});
		},
		validate() {
			if (this.username !== '' && this.password !== '') {
				this.unAblebToSignin = false;
			} else {
				this.unAblebToSignin = true;
			}
		}
	},
	watch: {
		username() {
			this.validate();
		},
		password() {
			this.validate();
		}
	}
}
</script>

<style lang="scss">
$base-color: rgb(212, 60, 51);

.signin {
    position: absolute;
    top: 0;
    left: 0;
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
