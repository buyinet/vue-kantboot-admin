<script lang="ts" setup>
import { useRajasStore } from "../../../../store/moudules/rajas.ts";
import KtIcon from "../../../../components/kantboot/components/KtIcon/KtIcon.vue";
import {ManageMenuType, useManageMenuStore} from "../../../../store/moudules/manageMenu.ts";
let rajasStore = useRajasStore();
let manageMenuStore = useManageMenuStore();

let addBreadCrumbItem = (item: ManageMenuType) => {
  manageMenuStore.addBreadCrumbItem(item);
}

</script>

<template>
  <el-scrollbar id="scrollbar" ref="scrollbar"
                class="scrollbar"
                :style="`height:${rajasStore.getMainHeight}px;margin:0;`">
    <el-menu class="menu" :router="true"
    :default-active="$route.path"
    >
      <template v-for="item in manageMenuStore.getManageMenuList">

        <el-menu-item
        v-if="!item.children"
        :index="item.path"
        :key="item.path"
        @click="addBreadCrumbItem(item)"
        >
          <kt-icon :fileCodeOfIcon="item.fileCodeOfIcon"></kt-icon>
          {{item.title}}
        </el-menu-item>

        <el-sub-menu
        v-else
        :index="item.path"
        >
          <template #title>
            <span slot="title">
            <kt-icon :fileCodeOfIcon="item.fileCodeOfIcon"></kt-icon>
              {{item.title}}
            </span>
          </template>
          <el-menu-item
          v-for="child in item.children"
          :index="child.path"
          :key="child.path"
          @click="addBreadCrumbItem(child)"
          >
            <kt-icon :fileCodeOfIcon="child.fileCodeOfIcon"></kt-icon>
            {{child.title}}</el-menu-item>
        </el-sub-menu>
      </template>
    </el-menu>
  </el-scrollbar>

</template>

<style scoped>
.scrollbar{
  border-right: 1px solid #eee;
  box-sizing: border-box;
  width: 100%;
}
.menu{
  border: none;
}
</style>