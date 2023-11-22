<script lang="ts" setup>
import {onMounted, ref, watch} from "vue";
import KtTableCard from "/src/components/kantboot/components/KtTableCard/KtTableCard.vue";
import columns from "../config/columns.config.ts";
import {PageResult} from "/src/components/kantboot/libs/rest/PageResultType.ts";
import PageRequestParam from "/src/components/kantboot/libs/rest/PageRequestParamType.ts";
import $kt from "/src/components/kantboot";
import { useRajasStore } from "/src/store/moudules/rajas.ts";
import { useSettingStore} from "../storeMoudules/setting.ts";
import DialogOfSave from "./DialogOfSave.vue";
import {ElMessageBox} from "element-plus";

let rajasStore = useRajasStore();
let settingStore = useSettingStore();
let dialogOfSave = ref();
let selection = ref([]);

let bodyData = ref<PageResult<any>>({
  content: [],
  totalElements: 1000,
  totalPages: 0,
  number: 0,
  size: 0,
});

let requestParam = ref<PageRequestParam<any>>({
  data: {
    groupCode: "",
    code: "",
    description: "",
  },
  pageNumber: 1,
  pageSize: 10,
});
let loading = ref(false);

let getBodyData = () => {
  loading.value = true;

  $kt.request.request({
    url: "/system-setting-web/setting/getBodyData",
    method: "post",
    data: requestParam.value,
    stateSuccess: (res) => {
      bodyData.value = res.data;
      loading.value = false;
    },
  })

}
let removeBatch = () => {
  ElMessageBox.confirm('此操作将永久删除, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    $kt.request.request({
      url: "/system-setting-web/admin/setting/removeBatch",
      method: "post",
      data: selection.value,
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

onMounted(() => {
  getBodyData();
});

// 监听 settingStore.getGroupOfSelected 的变化
watch(()=>settingStore.$state.groupOfSelected,()=>{
  requestParam.value.data.groupCode = settingStore.getGroupOfSelected.code;
  getBodyData();
})

</script>

<template>
  <dialog-of-save ref="dialogOfSave" @submit="getBodyData" />
  <kt-table-card
      v-model:selection="selection"
      :columns="columns"
      :loading="loading"
      :page-request-param="requestParam"
      :page-result="bodyData"
      @change="getBodyData"
      :height="rajasStore.getManageMainHeight - 50 +'px'"
  >

    <template #header>
      <div style="font-size: 12px" v-if="settingStore.getGroupOfSelected.code">
        已选中分组：{{settingStore.getGroupOfSelected.name}}-{{settingStore.getGroupOfSelected.code}}
      </div>
      <div style="height: 10px"></div>
      <el-form label-position="left">
        <el-row :gutter="20">
          <el-col
              v-if="settingStore.getGroupOfSelected.code==null"
              :span="6">
            <el-form-item label="分组编码">
              <el-input
                  @keyup.enter.native="getBodyData"
                  v-model="requestParam.data.groupCode"
                  placeholder="输入内容"
              ></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="6">
            <el-form-item label="编码">
              <el-input v-model="requestParam.data.code"
                        placeholder="输入内容"
                        @keyup.enter.native="getBodyData"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="描述">
              <el-input v-model="requestParam.data.description"
                        placeholder="输入内容"
                        @keyup.enter.native="getBodyData"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-button type="primary" @click="getBodyData">查询</el-button>
          </el-col>

        </el-row>
      </el-form>
      <div style="float: right">
        <el-button size="small" @click="dialogOfSave.open()">
          <kt-icon icon="el-icon-plus" />
        </el-button>
        <el-button type="danger" size="small" @click="removeBatch()">
          <kt-icon icon="el-icon-delete" />
        </el-button>
        <div style="height: 10px"></div>
      </div>
    </template>

    <template #default>
      <!-- 固定在右侧 -->
      <el-table-column
          fixed="right"
          label="操作"
          width="100">
        <template #default="scope">
        <el-button
            @click="dialogOfSave.open(scope.row)"
            size="small"
            type="primary">
          <kt-icon icon="el-icon-edit" />
        </el-button>
        </template>
      </el-table-column>
    </template>
  </kt-table-card>
</template>

<style scoped>
</style>