<script lang="ts" setup>
import {ref} from "vue";
import $kt from "/src/components/kantboot"

let emits = defineEmits(["submit"]);

let dialogVisible = ref(false);

type RequestParam = {
  code: string,
  name: string,
  description: string,
  priority: number,
}

let requestParamInit: RequestParam = {
  code: "",
  name: "",
  description: "",
  priority: 0,
}

let requestParam = ref<RequestParam>(
    JSON.parse(JSON.stringify(requestParamInit))
);

let init = () => {
  requestParam.value = JSON.parse(JSON.stringify(requestParamInit));
}


let save = () => {
  $kt.request.request({
    url: "/system-setting-web/admin/settingGroup/save",
    method: "post",
    data: requestParam.value,
    stateSuccess: (res: any) => {
      dialogVisible.value = false;
      emits("submit");
      init();
    }
  });
};

let open = (param?: any) => {
  if (param) {
    requestParam.value = JSON.parse(JSON.stringify(param));
  }
  dialogVisible.value = true;
};

defineExpose({
  open,
});

</script>

<template>
  <el-dialog title="保存" v-model="dialogVisible"
             width="30%">
    <el-form :model="requestParam"
             label-position="top"
             label-width="80px">
      <el-form-item label="编码" prop="code">
        <el-input v-model="requestParam.code"></el-input>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="requestParam.name"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="requestParam.description"></el-input>
      </el-form-item>
      <el-form-item label="优先级" prop="priority">
        <el-input-number v-model="requestParam.priority" :min="0" :max="999999"></el-input-number>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<style scoped>
.dialog-footer {
  text-align: right;
}
</style>