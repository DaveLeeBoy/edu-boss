<template>
  <div class="login">
    <el-form
      class="login-form"
      ref="form"
      :model="form"
      label-width="80px"
      :rules="rules"
      label-position="top"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="form.password"
          placeholder="请输入密码"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="loading"
          class="login-btn"
          type="primary"
          @click="onSubmit"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { login } from "@/services/user";
import { Form } from "element-ui";
export default Vue.extend({
  name: "LoginIndex",
  data() {
    return {
      loading: false,
      form: {
        phone: "18201288771",
        password: "111111"
      },
      rules: {
        phone: [
          {
            required: true,
            pattern: /^1\d{10}$/,
            message: "请输入正确的手机号"
          }
        ],
        password: [
          {
            required: true,
            max: 18,
            min: 6,
            message: "密码的必须在6到18位"
          }
        ]
      }
    };
  },
  methods: {
    async onSubmit() {
      try {
        this.loading = true;
        await (this.$refs.form as Form).validate();
        const { data } = await login(this.form);
        this.loading = false;
        if (data.state !== 1) {
          return this.$message.error(data.message);
        } else {
          this.$store.commit("setUser", data.content);
          this.$message.success("请求成功");
          this.$router.push((this.$route.query.redirect as string) || "/");
        }
      } catch (error) {
        this.$message.error("接口出错了");
        this.loading = true;
      }
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
