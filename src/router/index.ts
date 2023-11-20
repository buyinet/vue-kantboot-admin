import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// localStorage.setItem("manageMenuList", JSON.stringify(res.data));

let manageMenuList:any[] = [];
if(localStorage.getItem("manageMenuList")){
  manageMenuList = JSON.parse(localStorage.getItem("manageMenuList")+"");
}

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
            component: () => import((`../views/body/manage/${childrenItem.componentPath}`)),
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
      component: () => import((`../views/body/manage/${item.componentPath}`)),
      meta: {
        title: item.title,
      },
    });
  }
}


const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "body",
    component: () => import((`../views/body/Body.vue`)),
    children: [
      {
        path: "/",
        name: "index",
        component: () => import((`../views/body/index/Body.vue`)),
        meta: {
          title: "首页",
        },
      },
      {
        path: "/manage",
        name: "manage",
        component: () => import((`../views/body/manage/Body.vue`)),
        meta: {
          title: "管理",
        },
        children: children
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import((`../views/login/Body.vue`)),
    meta: {
      title: "登录",
    },
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
