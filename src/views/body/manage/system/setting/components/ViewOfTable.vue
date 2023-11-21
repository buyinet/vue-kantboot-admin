<script lang="ts" setup>
import {onMounted, ref} from "vue";
import KtTableCard from "/src/components/kantboot/components/KtTableCard/KtTableCard.vue";
import columns from "../config/columns.config.ts";
import {PageResult} from "/src/components/kantboot/libs/rest/PageResultType.ts";
import PageRequestParam from "/src/components/kantboot/libs/rest/PageRequestParamType.ts";
import $kt from "/src/components/kantboot";
import {useRajasStore} from "/src/store/moudules/rajas.ts";

let rajasStore = useRajasStore();

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
let getBodyData = () => {

  $kt.request.request({
    url: "/system-setting-web/setting/getBodyData",
    method: "post",
    data: requestParam.value,
    stateSuccess: (res) => {
      bodyData.value = res.data;
    },
  })

}

let selection = ref([]);

onMounted(() => {
  getBodyData();
});

</script>

<template>
  <el-form label-position="left">
    <el-row :gutter="20">
      <el-col :span="6">
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

  <kt-table-card
      v-model:selection="selection"
      :columns="columns"
      :page-request-param="requestParam"
      :page-result="bodyData"
      @change="getBodyData"
  >

    <template #header>
      <div style="float: right">
        <el-button size="small">
          <kt-icon icon="el-icon-plus" />
        </el-button>
        <el-button type="danger" size="small">
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
        <el-button
            size="small"
            type="primary">
          <kt-icon icon="el-icon-edit" />
        </el-button>
      </el-table-column>
    </template>
  </kt-table-card>
</template>

<style scoped>
</style>