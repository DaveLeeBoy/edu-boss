<template>
  <div class="login">
    <el-form
      class="login-form"
      ref="form"
      :model="form"
      label-width="80px"
      label-position="top"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" @click="onSubmit"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "LoginIndex",
  data() {
    return {
      form: {
        phone: "",
        password: ""
      }
    };
  },
  methods: {
    onSubmit() {
      console.log(this.form);
    }
  }
});
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-form {
    background: #fff;
    padding: 30px;
    border-radius: 6px;
    width: 400px;
  }
  .login-btn {
    width: 100%;
  }
}
</style>
