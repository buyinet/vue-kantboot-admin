<script lang="ts" setup>
import {ref} from "vue";
import $kt from "/src/components/kantboot";
import {useRajasStore} from "/src/store/moudules/rajas.ts";
import {useSettingStore} from "../storeMoudules/setting.ts";
import DialogOfSave from "./DialogOfSaveOfGroup.vue";
import KtIcon from "../../../../../../components/kantboot/components/KtIcon/KtIcon.vue";
import { ElMessageBox } from "element-plus";

let rajasStore = useRajasStore();
let settingStore = useSettingStore();
let dialogOfSave = ref();

let bodyData = ref([]);
let getBodyData = () => {
  $kt.request.request({
    url: "/system-setting-web/settingGroup/getAll",
    stateSuccess: (res: any) => {
      bodyData.value = res.data;
    }
  })

}

getBodyData();

let dataOfSelect = ref({
  name: "全部",
  code: null,
});

let select = (item: any) => {
  dataOfSelect.value = item;
  settingStore.setGroupOfSelected(item);
}

let remove = (item: any) => {
  // 询问是否删除
  ElMessageBox.confirm('此操作将永久删除该分组, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    $kt.request.request({
      url: "/system-setting-web/admin/settingGroup/remove",
      method: "post",
      data: {
        id: item.id,
        code: item.code,
      },
      stateSuccess: (res: any) => {
        getBodyData();
      }
    });
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '已取消删除'
    });
  });


}

</script>

<template>
  <dialog-of-save ref="dialogOfSave"
  @submit="getBodyData"
  ></dialog-of-save>
  <el-card>
    <template #header>
      分组
    </template>
    <el-scrollbar
        :style="`height:${useRajasStore.getManageMainHeight - 50}px;`"
    >
      <div style="margin-bottom: 10px;">
        <div :class="'box-btn'+(dataOfSelect.code == null?' box-btn-selected':'')"
             @click="select({
              name: '全部',
              code: null,
           })"
        >
          <div class="name">全部</div>
          <div class="code">ALL</div>
        </div>
      </div>
      <div v-for="item in bodyData"
           style="margin-bottom: 10px;"
      >
        <el-popover
            placement="right"
            :width="200"
            trigger="hover"
        >
          <template #reference>
            <div :class="'box-btn'+(dataOfSelect.code == item.code?' box-btn-selected':'')"
                 :key="item.code"
                 @click="select(item)">
              <div class="name">{{ item.name }}</div>
              <div class="code">{{ item.code }}</div>
            </div>
          </template>
          <template #default>
            <div>
              <!-- 选择 -->
              <el-button
                  @click="select(item)"
                  :style="'width: 100%;' + (item.code == dataOfSelect.code?'background-color: #409EFF;color: #fff;':'')">
                <kt-icon icon="el-icon-right"/>
              </el-button>
            </div>
            <div style="height: 10px"></div>
            <div>
              <!-- 编辑 -->
              <el-button
                  @click="dialogOfSave.open(item)"
                  style="width: 100%">
                <kt-icon icon="el-icon-edit"/>
              </el-button>
            </div>
            <div style="height: 10px"></div>
            <div>
              <el-button
                  @click="remove(item)"
                  style="width: 100%" type="danger">
                <kt-icon icon="el-icon-delete"/>
              </el-button>
            </div>
          </template>
        </el-popover>
      </div>

    </el-scrollbar>
    <div>
      <el-button
          @click="dialogOfSave.open()"
          style="width: 100%;">
        <kt-icon icon="el-icon-plus"/>
      </el-button>
    </div>
  </el-card>
</template>

<style scoped>
.box-btn {
  border: 1px solid #ccc;
  text-align: center;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
}

.box-btn-selected {
  border: 1px solid #409EFF;
  color: #409EFF;
}

.name {
  font-size: 15px;
}

.code {
  font-size: 12px;
  color: #666;
}

.box-btn:hover {
  opacity: .7;
}
</style>