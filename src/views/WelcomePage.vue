<template>

  <el-row :gutter="20" justify="center" align="center">
    <h1>Cabbage Engine</h1>
  </el-row>

  <el-row :gutter="20" justify="start" align="center"> <el-button type="primary" @click="goToSecondPage">继续游戏</el-button> </el-row>
  <el-row :gutter="20" justify="start" align="center"> <el-button type="primary" @click="goToSecondPage">新建游戏</el-button> </el-row>
  <el-row :gutter="20" justify="start" align="center"> <el-button type="primary" @click="goToSecondPage">加载游戏</el-button> </el-row>
  <el-row :gutter="20" justify="start" align="center"> <el-button type="primary">游戏设置</el-button> </el-row>
  <el-row :gutter="20" justify="start" align="center"> <el-button type="primary">退出游戏</el-button> </el-row>

  <el-row :gutter="20" justify="end" align="center">
  <el-button type="primary" @click="dialogVisible = true">公告</el-button>
  <el-dialog v-model="dialogVisible" title="公告" width="500" draggable>
    <div>一些版本更新信息</div>
    <div>QQ群号：</div>
    <div>QQ群号二维码</div>
  </el-dialog>
  </el-row>

  <el-row :gutter="20" justify="end" align="center">
    <el-text>version 0.3.0</el-text>
  </el-row>
</template>



<script>

import { useRouter } from 'vue-router';
import { ref } from 'vue';

export default {
  setup() {
    const router = useRouter();
    const dialogVisible = ref(true); // 定义响应式数据

    const goToSecondPage = () => {
      router.push({ name: 'MainPage' });
    };

    return { goToSecondPage, dialogVisible }; // 返回响应式数据和方法
  },
};

</script>


<style lang="scss">
.el-row {
  width:80%;
  margin-bottom: 20px;
  left: 10%;
}
</style>