<script lang="ts" setup>
import {ref, watch} from "vue";
import KtIcon from "../KtIcon/KtIcon.vue";

let props = defineProps({
  dataSource: {
    type: Object,
    default: null,
  },
  columns: {
    type: Array<any>,
    default: null,
  },
  maxHeight: {
    type: String,
    default: "500px",
  },
  pageSizes: {
    type: Array<any>,
    default: () => [10, 20, 30, 40, 50],
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  pageNumber: {
    type: Number,
    default: 1,
  },
  total: {
    type: Number,
    default: 0,
  },
  pageRequestParam: {
    type: Object,
    default: null,
  },
  pageResult: {
    type: Object,
    default: null,
  },
  isIndexShow: {
    type: Boolean,
    default: true,
  },
  isHasSelection: {
    type: Boolean,
    default: true,
  },
  selection: {
    type: Array<any>,
    default: () => [],
  },
  rowKey: {
    type: String,
    default: "id",
  },
});

let propsData = ref({
  dataSource: props.dataSource,
  columns: props.columns,
  pageSizes: props.pageSizes,
  pageSize: props.pageSize,
  pageNumber: props.pageNumber,
  total: props.total,
  pageRequestParam: props.pageRequestParam,
  pageResult: props.pageResult,
  isIndexShow: props.isIndexShow,
  isHasSelection: props.isHasSelection,
  selection: props.selection,
});
let emit = defineEmits(["change","update:selection"]);


let setData = () => {
  if (propsData.value.pageResult) {
    propsData.value.dataSource = props.pageResult.content;
    propsData.value.total = props.pageResult.totalElements;
  }
  if (propsData.value.pageRequestParam) {
    propsData.value.pageSize = props.pageRequestParam.pageSize;
    propsData.value.pageNumber = props.pageRequestParam.pageNumber;
  }
}

setData();
// 监听selection
watch(()=>propsData.value.selection, () => {
  emit("update:selection", propsData.value.selection);
});

watch(() => props.pageResult, () => {
  setData();
});

watch(() => props.pageSize, () => {
  if (propsData.value.pageRequestParam){
    props.pageRequestParam.pageSize = props.pageSize;
  }
});

watch(() => props.pageNumber, () => {
  if (propsData.value.pageRequestParam){
    props.pageRequestParam.pageNumber = props.pageNumber;
  }
});


let changePageNumber = (val) => {
  propsData.value.pageNumber = val;
  // 修改父组件的值
  if (propsData.value.pageRequestParam){
    propsData.value.pageRequestParam.pageNumber = val;
  }

  emit("change");

};

let changePageSize = (val) => {
  propsData.value.pageSize = val;
  if (propsData.value.pageRequestParam){
    propsData.value.pageRequestParam.pageSize = propsData.value.pageSize;
  }
  emit("change");
};

</script>

<template>
  <el-card>
    <slot name="header"></slot>
    <kt-table
        :is-has-selection="isHasSelection"
        :row-key="rowKey"
        v-model:selection="propsData.selection"
        :columns="propsData.columns"
        :dataSource="propsData.dataSource"
        :max-height="`${propsData.maxHeight}`"
        :is-index-show="propsData.isIndexShow"
    >
      <slot></slot>
    </kt-table>
    <div style="height: 20px"></div>
    <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="propsData.pageSizes"
        :total="propsData.total"
        :page-size="propsData.pageSize"
        :current-page="propsData.pageNumber"
        @size-change="changePageSize"
        @current-change="changePageNumber"
    />
  </el-card>
</template>

<style scoped>

</style>