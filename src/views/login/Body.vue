<script setup lang="ts">
import { ref } from "vue";

let columns = ref([
  {
    field: "id",
    label: "ID",
  },
  {
    field: "name",
    label: "名称",
  },
  {
    field: "birthday",
    label: "生日",
    type: "date",
  },
]);

let dataSource = ref([
  {
    id: 1,
    name: "张三",
    birthday: 1627660800000,
  },
  {
    id: 2,
    name: "李四",
    birthday: 1627660800000,
  },
  {
    id: 3,
    name: "王五",
    birthday: 1627660800000,
  },
]);

</script>

<template>
  <kt-table :columns="columns" :data-source="dataSource"></kt-table>
</template>

<style scoped>
</style>