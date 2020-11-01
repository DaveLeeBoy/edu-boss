<template>
  <div id="app">
    <!-- 根路由出口 -->
    <router-view />
  </div>
</template>
<script lang="ts">
import Vue from "vue";

interface Foo {
  a: string;
  b: number;
}
export default Vue.extend({});
</script>
<style lang="scss">
.test {
  color: $danger-color;
}
</style>
