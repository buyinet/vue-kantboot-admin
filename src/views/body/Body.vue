<script lang="ts" setup>
import {ref, onMounted} from "vue";
import HeaderComponent from "./components/Header.vue";
import { useRajasStore } from "../../store/moudules/rajas.ts";

let header = ref();
let rajasStore = useRajasStore();

const setMainHeight=()=>{
  // 获取页面的高度
  let height = document.documentElement.clientHeight;
  // 获取header的高度
  let headerHeight = header.value.clientHeight;
  // 设置scrollbar的高度
  rajasStore.setMainHeight(height - headerHeight);
}
onMounted(()=>{
  setMainHeight();
})

// 监听窗口大小变化
window.onresize = () => {
  setMainHeight();
}


</script>

<template>
  <header class="header" id="header" ref="header">
    <header-component></header-component>
  </header>
  <el-scrollbar id="scrollbar" ref="scrollbar"
  :style="`height: ${rajasStore.getMainHeight}px;`">
    <router-view/>
  </el-scrollbar>
</template>

<style scoped>
</style>