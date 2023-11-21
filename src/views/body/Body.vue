<script lang="ts" setup>
import {ref, onMounted} from "vue";
import HeaderComponent from "./components/Header.vue";
import { useRajasStore } from "../../store/moudules/rajas.ts";

let header = ref();
let rajasStore = useRajasStore();
let mainHeight = ref(0);

const setMainHeight=()=>{
  // 获取浏览器窗口高度
  let height = document.documentElement.clientHeight;
  // 获取header的高度
  let headerHeight = header.value.clientHeight;
  mainHeight.value = height - headerHeight;
  // 设置scrollbar的高度
  rajasStore.setMainHeight(mainHeight.value);

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
  <header class="header" id="header" ref="header" style="margin: 0;">
    <header-component></header-component>
  </header>
  <el-scrollbar id="scrollbar" ref="scrollbar"
  :style="`height: ${mainHeight}px;margin: 0;`">
    <router-view/>
  </el-scrollbar>
</template>

<style scoped>
</style>