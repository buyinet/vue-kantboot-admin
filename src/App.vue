<script setup lang="ts">
import {ref} from "vue";
import {ManageMenuType, useManageMenuStore} from "./store/moudules/manageMenu.ts";
import $kt from "./components/kantboot";
import {ElMessage} from "element-plus";
import {RouteRecordRaw, useRouter} from "vue-router";

// 清空所有requestNumberBy:开头的localStorage
for (let i = 0; i < localStorage.length; i++) {
  let key = localStorage.key(i);
  if (key?.startsWith("requestNumberBy:")) {
    localStorage.removeItem(key);
  }
}

let isRouterFinish = ref(false);

let manageMenuStore = useManageMenuStore();
// 通过manageMenuStore.getManageMenuList动态设置路由
let router = useRouter();
let addRouter = (manageMenuList: ManageMenuType[]) => {

  let children: RouteRecordRaw[] = [];

  for (let i = 0; i < manageMenuList.length; i++) {
    let item = manageMenuList[i];
    if (item.children) {
      let children2: any[] = [];
      for (let j = 0; j < item.children.length; j++) {
        let childrenItem = item.children[j];
        children2.push(
            {
              path: childrenItem.path,
              name: childrenItem.code,
              component: () => import((`./views/body/manage/${childrenItem.componentPath}`)),
              meta: {
                title: childrenItem.title,
              }
            });
      }

      children.push({
        path: item.path,
        name: item.code,
        meta: {
          title: item.title,
        },
        children: children2
      });
    } else {
      children.push({
        path: item.path,
        name: item.code,
        component: () => import((`./views/body/manage/${item.componentPath}`)),
        meta: {
          title: item.title,
        },
      });
    }
  }


  console.log("动态路由注册开始");
  // 在path为/manage的路由下注册子路由
  router.addRoute({
    path: "/",
    name: "body",
    component: () => import((`./views/body/Body.vue`)),
    children: [
      {
        path: "/",
        name: "index",
        component: () => import((`./views/body/index/Body.vue`)),
        meta: {
          title: "首页",
        },
      },
      {
        path: "/manage",
        name: "manage",
        component: () => import((`./views/body/manage/Body.vue`)),
        meta: {
          title: "管理",
        },
        children
      }]
  });

  console.log("动态路由注册结束", router.getRoutes());
  setTimeout(() => {
    isRouterFinish.value = true;
  }, 1000);

}


$kt.request.request({
  url: "/system-user-web/admin/adminRouter/getSelf",
  method: "post",
  stateSuccess: (res: any) => {
    manageMenuStore.setManageMenuList(res.data);
    localStorage.setItem("manageMenuList", JSON.stringify(res.data));
    try {
      addRouter(res.data);
    } catch (e) {
      console.log(e);
    }
  },
  stateFail: (res: any) => {
    ElMessage.error(res.message);
  }
});


</script>

<template>
  <router-view
      v-if="isRouterFinish"
  />
</template>

<style scoped>
</style>
