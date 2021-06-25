<template>
  <div id="user-info">
    <a href="#" class="clear-fix">
      <slot name="user-icon">
				<img src="../../../assets/img/profile/avatar.svg" class="privateImage-svg left"/>
      </slot>
      <div class="login-info left">
        <slot name="user-nickname">
          <div class="login">登录/注册</div>
        </slot>
        <div class="phone">
          <span>
						<img src="../../../assets/img/profile/phone.svg" class="icon-mobile"/>
					</span>
          <slot name="user-phone">暂无绑定手机号</slot>
        </div>
      </div>
      <svg data-v-735ff1be="" fill="#fff" class="arrow-svg right"></svg>
    </a>
  </div>
</template>

<script>
	export default {
		name: "UserInfo"
	}
</script>

<style scoped>
  #user-info {
    background-color: var(--color-tint);
    padding: 15px;
    margin-top: -5px;
  }
  #user-info .privateImage-svg {
    width: 60px;
    height: 60px;
    background-color: #fff;
    border-radius: 30px;
  }
  .left {
    float: left;
  }
  #user-info .arrow-svg {
    width: 11px;
    height: 22px;
    margin-top: 18px;
  }
  #user-info .login-info {
    color: #fff;
		width: 60%;
    margin: 10px 0 0 15px;
  }
	#user-info .login {
    font-size: 17px;
		font-weight: 500;
  }
  #user-info .login-info .phone {
    position: relative;
    font-size: 14px;
    margin-top: 8px;
    margin-left: 15px;
    font-weight: 300;
  }
  #user-info .login-info .phone .icon-mobile {
    position: absolute;
    width: 20px;
    height: 23px;
    left: -18px;
    top: -4px;
  }
</style>