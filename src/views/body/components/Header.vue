<template>
  <div>
    <el-menu mode="horizontal"
    :router="true"
    :default-active="$route.path"
    >
      <el-menu-item disabled style="opacity: 1">
        <img src="/public/logo.png" style="width: 30px;height: 30px;filter: invert(100%);"/>
      </el-menu-item>
      <el-menu-item>
        首页
      </el-menu-item>
      <el-menu-item index="/manage">
        管理后台
      </el-menu-item>
      <el-menu-item>
        指南
      </el-menu-item>
      <el-sub-menu>
        <template #title>文档</template>
        <el-menu-item>前端文档</el-menu-item>
        <el-menu-item>后端文档</el-menu-item>
        <el-menu-item>Web API文档</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
</script>