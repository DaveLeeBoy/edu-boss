<template>
  <div>
    <ResourceList></ResourceList>
  </div>
</template>

<script>
import Vue from "vue";
import ResourceList from "./components/List";
export default Vue.extend({
  components: {
    ResourceList
  }
});
</script>

<style lang="scss" scoped></style>
