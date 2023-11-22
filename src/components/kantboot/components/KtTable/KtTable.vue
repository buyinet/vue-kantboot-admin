<script lang="ts" setup>
import { ref } from "vue";
import file from "../../libs/file";
import date from "../../libs/date";

defineProps({
  dataSource: {
    type: Object,
    default: null,
  },
  columns: {
    type: Array<any>,
    default: null,
  },
  height: {
    type: String,
    default: "300px",
  },
  isHasIndex: {
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
  loading: {
    type: Boolean,
    default: false,
  },
});

let emit = defineEmits(["update:selection"]);

let handleSelectionChange = (val: any) => {
  emit("update:selection", val);
};

</script>

<template>
  <el-table
      :data="dataSource"
      :height="`calc(${height} - 50px)`"
      :reserve-selection="true"
      :loading="loading"
      @selection-change="handleSelectionChange"
  >
    <el-table-column
        v-if="isHasSelection"
        :row-key="rowKey"
        type="selection"
        width="55"></el-table-column>

    <el-table-column
        v-if="isHasIndex"
        type="index"
        width="55"></el-table-column>

    <el-table-column
        v-for="column in columns"
        :key="column.field"
        :prop="column.field"
        :label="column.label"
        :width="column.width"
    >

      <template #default="scope">

        <div>

          <template v-if="column.type === 'date'">
            {{ date.format(scope.row[column.field], "yyyy-MM-dd") }}
          </template>

          <template v-else-if="column.type === 'datetime'">
            {{ date.format(scope.row[column.field], "yyyy-MM-dd hh:mm:ss") }}
          </template>

          <!-- 图片id -->
          <template v-else-if="column.type === 'fileIdOfImage'">
            <el-image :src="file.visit(scope.row[column.field])"
                      :preview-src-list="[file.visit(scope.row[column.field])]"
                      fit="contain"
                      :preview-teleported="true"
                      alt="" style="width: 100px"></el-image>
          </template>

          <!-- 图片code -->
          <template v-else-if="column.type === 'fileCodeOfImage'">
            <el-image :src="file.visitByCode(scope.row[column.field])"
                      :preview-src-list="[file.visitByCode(scope.row[column.field])]"
                      fit="contain"
                      :preview-teleported="true"
                      alt="" style="width: 100px"></el-image>
          </template>

          <!-- 图片url -->
          <template v-else-if="column.type === 'fileUrlOfImage'">
            <el-image :src="scope.row[column.field]"
                      :preview-src-list="[scope.row[column.field]]"
                      fit="contain"
                      :preview-teleported="true"
                      alt="" style="width: 100px"></el-image>
          </template>

          <template v-else>
            {{ scope.row[column.field] }}
          </template>

        </div>

      </template>


    </el-table-column>

    <slot></slot>
  </el-table>
</template>

<style scoped></style>