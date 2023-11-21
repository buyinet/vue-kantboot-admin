<script lang="ts" setup>
defineProps({
  icon: {
    type: String,
    default: "el-icon-search",
  },
  size: {
    type: Object,
    default: "medium",
  },
  color: {
    type: String,
    default: null,
  },
});
</script>

<template>
  <el-icon :size="size" :color="color">
    <Component :is="icon"></Component>
  </el-icon>
</template>

<style scoped>

</style>