<template>
  <div class="menu-wrap">
    <createOrEdit :is-edit="true"></createOrEdit>
  </div>
</template>

<script>
import Vue from "vue";
import createOrEdit from "./components/createOrEdit";
export default Vue.extend({
  components: {
    createOrEdit
  }
});
</script>
å
<style lang="scss" scoped></style>
