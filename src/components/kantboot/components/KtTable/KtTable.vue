<script lang="ts" setup>
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
});

</script>

<template>
  <el-table :data="dataSource">
    <el-table-column
        v-for="column in columns"
        :key="column.field"
        :prop="column.field"
        :label="column.label"
        :width="column.width"
    >

      <template v-if="column.type === 'index'" #default="scope">

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

        </div>

      </template>


    </el-table-column>
  </el-table>
</template>

<style scoped></style>