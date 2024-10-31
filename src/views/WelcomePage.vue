<template>
<el-row class="full-screen-center">

  <el-row :gutter="20" justify="center" align="center">
    <h1>Cabbage Engine</h1>
  </el-row>

<el-row :gutter="20" type="flex" class="column" justify="start" align="center">
  <el-col :gutter="20">
    <el-button class="custom-button" type="primary" @click="goToSecondPage" size="large">继续游戏</el-button>
  </el-col>
  <el-col :gutter="20">
    <el-button class="custom-button" type="primary" @click="goToSecondPage" size="large">新建游戏</el-button>
  </el-col>
  <el-col :gutter="20">
    <el-button class="custom-button" type="primary" @click="uploadFile" size="large">加载游戏</el-button>
  </el-col>
  <el-col :gutter="20">
    <el-button class="custom-button" type="primary" size="large">游戏设置</el-button>
  </el-col>
  <el-col :gutter="20">
    <el-button class="custom-button" type="primary" size="large">退出游戏</el-button>
  </el-col>
</el-row>

  <el-row type="flex" class="column" justify="end" align="center">
  <el-col justify="center" align="end">
    <el-button class="custom-button" type="primary" @click="dialogVisible = true" size="medium">公告</el-button>
  </el-col>
  <el-col justify="center" align="end">
    <el-text size="medium" class="custom-font">version 0.3.0</el-text>
  </el-col>
  </el-row>

    <el-dialog v-model="dialogVisible" title="公告" :modal="false" :close-on-click-modal="false" draggable :z-index="998" class="my-custom-dialog">
      <div>一些版本更新信息</div>
      <div>QQ群号：</div>
      <div>QQ群号二维码</div>
    </el-dialog>

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
.custom-button {
  margin: 5px; /* 上下左右各10px的间距 */
  background-color: rgba(192, 192, 192, 0.5);
  border-color: transparent; 
  color: white;
}
.el-button {
  position: relative;
  z-index: 999;
}

.custom-font {
  font-family: 'Fantasy', sans-serif;
  color: rgba(192, 192, 192, 0.5);
}

.full-screen-center {
    display: flex; /* 使用 Flexbox */
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    height: 100vh; /* 容器高度设置为视口高度 */
    margin: 0; /* 移除默认的外边距 */
    padding: 5vh; /* 四周添加5%的间隔 */
    background-image: url('background.jpg');
    background-size: cover;
    background-position: center center;
    background-attachment: fixed; /* 保持背景固定 */
}

.my-custom-dialog {
  width: 22.5%; /* 设置对话框宽度为视口宽度的50% */
  height: 50%; /* 设置对话框高度为视口高度的60% */
  position: fixed; /* 固定定位 */
  top: 5%; /* 距离顶部20%的位置 */
  left: 75%; /* 距离左侧25%的位置 */
}

</style>