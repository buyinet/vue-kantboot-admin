<script lang="ts" setup>
import {ref,defineEmits} from "vue";
import $kt from "/src/components/kantboot"
import { useSettingStore } from "../storeMoudules/setting.ts";

let settingStore = useSettingStore();
let emits = defineEmits(["submit"]);

let dialogVisible = ref(false);

type RequestParam = {
  groupCode: string,
  code: string,
  name: string,
  value: string,
  description: string,
  priority: number,
}

let requestParamInit: RequestParam = {
  groupCode: "",
  code: "",
  name: "",
  value: "",
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
    url: "/system-setting-web/admin/setting/save",
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
  if(settingStore.$state.groupOfSelected.code!=null&&settingStore.$state.groupOfSelected.code!=''){
    requestParam.value.groupCode = settingStore.$state.groupOfSelected.code;
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
      <el-form-item label="分组编码">
        <el-input v-model="requestParam.groupCode"
                  :disabled="settingStore.$state.groupOfSelected.code!=null&&settingStore.$state.groupOfSelected.code!=''"></el-input>
      </el-form-item>

      <el-form-item label="编码" prop="code">
        <el-input v-model="requestParam.code"></el-input>
      </el-form-item>

      <el-form-item label="名称" prop="name">
        <el-input v-model="requestParam.name"></el-input>
      </el-form-item>

      <el-form-item label="值" prop="value">
        <el-input v-model="requestParam.value"></el-input>
      </el-form-item>

      <el-form-item label="描述" prop="description">
        <el-input v-model="requestParam.description"></el-input>
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