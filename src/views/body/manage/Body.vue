<script lang="ts" setup>
import {ref, onMounted,watch} from "vue";
import Menu from "./components/Menu.vue";
import Breadcrumb from "./components/Breadcrumb.vue";
import {useRajasStore} from "/src/store/moudules/rajas.ts";
import {useManageMenuStore} from "/src/store/moudules/manageMenu.ts";

let rajasStore = useRajasStore();
let manageMenuStore = useManageMenuStore();
let breadcrumbHeight = ref(0);

let breadcrumbBox = ref();
// 获取breadcrumb的高度
const setManageMainHeight=()=>{
  // 获取header的高度
  breadcrumbHeight.value = document.getElementById("breadcrumbBox").clientHeight;
  rajasStore.setManageMainHeight(rajasStore.getMainHeight - breadcrumbHeight.value - 130);
}

onMounted(()=>{
  setManageMainHeight();

// 监听窗口大小变化
  window.onresize = () => {
    setManageMainHeight();
  }
})

// 监听 manageMenuStore.getBreadCrumbList 变化
watch(()=>manageMenuStore.getBreadCrumbList,()=>{
  setManageMainHeight();
})


</script>

<template>
  <div>
    <el-container style="margin: 0">
      <el-aside width="230px" style="margin: 0">
        <Menu></Menu>
      </el-aside>
      <el-main style="margin: 0">
        <div ref="breadcrumbBox" id="breadcrumbBox" style="margin: 0">
          <Breadcrumb></Breadcrumb>
          <div style="height: 30px;margin: 0"></div>
        </div>
        <el-scrollbar :style="`height: ${rajasStore.getMainHeight}px;`">
          <router-view/>
        </el-scrollbar>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
</style>