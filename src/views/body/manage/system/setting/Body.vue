<script lang="ts" setup>
import {onMounted, ref} from "vue";
import ViewOfTable from "./components/ViewOfTable.vue";
import ViewOfGroup from "./components/ViewOfGroup.vue";
</script>

<template>
<el-row :gutter="10">
  <el-col :span="6">
    <view-of-group></view-of-group>
  </el-col>
  <el-col :span="18">
    <view-of-table></view-of-table>
  </el-col>
</el-row>
</template>

<style scoped>
</style>