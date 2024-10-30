<template>
  <div class="home">
    <h1>Cabbage Engine</h1>
    <el-button type="primary" @click="goToSecondPage">继续游戏</el-button>
    <el-button type="primary" @click="goToSecondPage">新建游戏</el-button>
    <el-button type="primary" @click="goToSecondPage">加载游戏</el-button>
    <el-button type="primary">游戏设置</el-button>
    <el-button type="primary">退出游戏</el-button>
  </div>

  <div>
  <el-button type="primary" @click="dialogVisible = true">游戏公告</el-button>
  <el-dialog v-model="dialogVisible" title="游戏公告" width="500" draggable>
    <span>内容内容内容内容</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
      </div>
    </template>
  </el-dialog>
  </div>

</template>


<script>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

export default {
  setup() {
    const router = useRouter();
    const dialogVisible = ref(false); // 定义响应式数据

    const goToSecondPage = () => {
      router.push({ name: 'MainPage' });
    };

    const openDialog = () => {
      dialogVisible.value = true; // 打开弹窗
    };

    return { goToSecondPage, dialogVisible, openDialog }; // 返回响应式数据和方法
  },
};
</script>

<style>
.home {
  text-align: center;
  padding: 50px;
}
</style>