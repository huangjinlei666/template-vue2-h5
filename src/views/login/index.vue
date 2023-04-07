<template>
  <div class="login-container">
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        label="用户名"
        maxlength="6"
        clearable
        left-icon="manager"
        placeholder="六位邮箱号"
        :rules="[{ pattern, message: '请填写六位邮箱号' }]"
      />
      <van-field
        v-model="password"
        label="密码"
        maxlength="18"
        clearable
        left-icon="eye"
        :right-icon="passwordStatus ? 'eye' : 'closed-eye'"
        :type="!passwordStatus ? 'password' : 'text'"
        @click-right-icon="passwordStatus = !passwordStatus"
        placeholder="开机密码"
        :rules="[{ required: true, message: '请填写开机密码' }]"
      />
      <van-field
        name="switch"
        label="记住我"
        left-icon="checked"
        style="margin-top: 20px"
      >
        <template #input>
          <van-switch v-model="rememberMe" size="20"></van-switch>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          :loading="loading"
          :disabled="disabled"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "Login",
  data() {
    return {
      username: "admin",
      password: "123456",
      pattern: /^[a-zA-Z0-9]{5}$/,
      passwordStatus: false,
      loading: false,
      disabled: false,
      rememberMe: true,
    };
  },
  methods: {
    async onSubmit() {
      this.disabled = true;
      const mes = { UserID: this.username, Password: this.password };
      this.loading = true;
      try {
        setTimeout(() => {
          this.disabled = false;
        }, 1500);
        const res = await post("/login", mes);
        // console.log("res:", res);
        if (res.JsonCode == 0) {
          window.localStorage.setItem("token", res.Token);
          window.localStorage.setItem("userinfo", JSON.stringify(res));
          if (this.rememberMe) {
            localStorage.setItem("useraccount", JSON.stringify(mes));
          }
          this.$router.push("/home");
          Toast("登陆成功");
        } else {
          Toast(`${res.JsonMessage}`);
        }
      } catch (err) {
        Toast(err.JsonMessage);
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    let username = JSON.parse(localStorage.getItem("useraccount"));
    if (username) {
      this.username = username.UserID;
      this.password = username.Password;
    }
  },
  watch: {
    rememberMe(newval, oldval) {
      if (!newval) {
        localStorage.removeItem("useraccount");
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  margin-top: 60%;
}
</style>
