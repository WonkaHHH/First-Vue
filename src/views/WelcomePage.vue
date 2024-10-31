<template>
<el-row class="full-screen-center">
  <el-row :gutter="20" justify="center" align="center">
    <h1>Cabbage Engine</h1>
  </el-row>

<el-row :gutter="20" type="flex" class="column">
  <el-col :span="24">
    <el-button type="primary" @click="goToSecondPage" size="large">继续游戏</el-button>
  </el-col>
  <el-col :span="24">
    <el-button type="primary" @click="goToSecondPage" size="large">新建游戏</el-button>
  </el-col>
  <el-col :span="24">
    <el-button type="primary" @click="uploadFile" size="large">加载游戏</el-button>
  </el-col>
  <el-col :span="24">
    <el-button type="primary" size="large">游戏设置</el-button>
  </el-col>
  <el-col :span="24">
    <el-button type="primary" size="large">退出游戏</el-button>
  </el-col>
</el-row>

  <el-row :gutter="20" justify="end" align="center">
    <el-button type="primary" @click="dialogVisible = true" size="large">公告</el-button>
    <el-dialog v-model="dialogVisible" title="公告" :modal="false" :close-on-click-modal="false" draggable
               :z-index="998">
      <div>一些版本更新信息</div>
      <div>QQ群号：</div>
      <div>QQ群号二维码</div>
    </el-dialog>
  </el-row>

  <el-row :gutter="20" justify="end" align="center">
    <el-text size="medium">version 0.3.0</el-text>
  </el-row>
</el-row>
</template>


<script>

import {useRouter} from 'vue-router';
import {ref} from 'vue';

export default {
  setup() {
    const router = useRouter();
    const dialogVisible = ref(true); // 定义响应式数据
    const fileInput = ref(null);
    const goToSecondPage = () => {
      router.push({name: 'MainPage'});
    };

    const createFileInput = () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.style.display = 'none';
      input.addEventListener('change', handleFileChange);
      document.body.appendChild(input);
      return input;
    };

    const uploadFile = () => {
      if (!fileInput.value) {
        fileInput.value = createFileInput();
      }
      fileInput.value.click();
    };

    const handleFileChange = (event) => {
      const files = event.target.files;
      if (files.length > 0) {
        console.log(`选择的文件: ${files[0].name}`);
        // 在这里可以处理文件上传

      }
    };

    return {goToSecondPage, dialogVisible, uploadFile}; // 返回响应式数据和方法
  },
};

</script>


<style lang="scss">
.el-row {
  width: 100%;
  margin-bottom: 20px;
  left: 0%;
}

.el-button {
  position: relative;
  z-index: 999;
}

.full-screen-center {
    display: flex; /* 使用 Flexbox */
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    height: 100vh; /* 容器高度设置为视口高度 */
    margin: 0; /* 移除默认的外边距 */
    padding: 5vh; /* 四周添加5%的间隔 */
}
</style>