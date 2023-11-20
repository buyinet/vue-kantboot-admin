<script lang="ts" setup>
import Menu from "./components/Menu.vue";
import Breadcrumb from "./components/Breadcrumb.vue";
import {useRajasStore} from "../../../store/moudules/rajas.ts";

let rajasStore = useRajasStore();

</script>

<template>
  <div>
    <el-container>
      <el-aside width="230px">
        <Menu></Menu>
      </el-aside>
      <el-main>
        <el-scrollbar :style="`height: ${rajasStore.getMainHeight}px;`">
          <Breadcrumb></Breadcrumb>
          <div style="height: 10px"></div>
          <router-view/>
        </el-scrollbar>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
</style>