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
    <!-- 触发按钮 -->
    <el-button type="primary" @click="showDialog">查看公告</el-button>

    <!-- 公告栏对话框 -->
    <el-dialog
      title="公告"
      :visible.sync="dialogVisible"
      width="30%"
      @close="handleClose"
    >
      <!-- 公告内容 -->
      <p>这里是公告内容，可以是文本、图片等。</p>
      <!-- 可以添加更多的公告内容 -->
      
      <!-- 对话框底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const goToSecondPage = () => {
      router.push({ name: 'MainPage' });
    };
    const showDialog = () => {
      this.dialogVisible = true;
    };
    return { goToSecondPage, showDialog };
  },
  data() {
    return {
      dialogVisible: false, // 控制对话框的显示与隐藏
    };
  },
  methods: {
    handleClose() {
      // 对话框关闭时执行的逻辑
      console.log('公告栏已关闭');
    },
  },
};
</script>

<style>
.home {
  text-align: center;
  padding: 50px;
}
</style>