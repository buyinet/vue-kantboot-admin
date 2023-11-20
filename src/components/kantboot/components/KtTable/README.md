# 使用方式
```html
<template>
    <kt-table :columns="columns" :data-source="dataSource"></kt-table>
</template>

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
```

# 参数
## columns
| 参数    | 说明 | 类型            | 可选值 | 默认值 |
|:------| :--- |:--------------| :--- | :--- |
| field  | 字段名 | String        | - | - |
| label  | 字段名 | String        | - | - |
| type | 字段类型 | String        | date | - |

## dataSource
根据columns的field，从dataSource中取值