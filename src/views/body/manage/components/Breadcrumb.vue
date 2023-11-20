<script lang="ts" setup>
import {ref, onMounted, watch} from "vue";
import {ManageMenuType, useManageMenuStore} from "../../../../store/moudules/manageMenu.ts";

let manageMenuStore = useManageMenuStore();
// 读取缓存
let breadCrumbList = ref<ManageMenuType[]>([]);
if (localStorage.getItem("breadCrumbList")) {
  breadCrumbList.value = JSON.parse(localStorage.getItem("breadCrumbList")+"");
  manageMenuStore.setBreadCrumbList(breadCrumbList.value);
}

breadCrumbList = ref(manageMenuStore.getBreadCrumbList);

</script>

<template>
  <el-card class="card">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item
      v-if="breadCrumbList.length==0"
      >无记录</el-breadcrumb-item>
      <el-breadcrumb-item
          v-else
          v-for="item in breadCrumbList"
          :to="{ path: item.path }">{{item.title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </el-card>
</template>

<style scoped>
.card{
  box-shadow: 0 0 0;
}
</style>