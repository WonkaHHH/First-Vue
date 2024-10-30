<template>
  <div class="second-page">
    <el-button type="primary" @click="goToHomePage">回到菜单</el-button>
    <el-button type="primary" @click="goToHomePage">退出游戏</el-button>
    <!-- Dock栏 -->
    <div class="dock">
      <div class="dock-item" @click="goToApp(1)">
        <span>📂</span> <!-- 颜文字图标 -->
        <span>App 1</span>
      </div>
      <div class="dock-item" @click="goToApp(2)">
        <span>📄</span> <!-- 颜文字图标 -->
        <span>App 2</span>
      </div>
      <!-- 根据需要添加更多的dock项 -->
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const goToHomePage = () => {
      router.push({ name: 'WelcomePage' });
    };
    const goToApp = (appId) => {
      // 根据appId跳转到不同的应用页面
      console.log('Go to App', appId);
    };
    return { goToHomePage, goToApp };
  },
};
</script>

<style>
.second-page {
  text-align: center;
  padding: 50px;
  position: relative;
  margin-bottom: 50px;
}

.dock {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eee;
  padding: 10px 0;
  box-shadow: 0 -2px 5px rgba(0,0,0,0.2);
}

.dock-item {
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer; /* 添加鼠标悬停时的手形指针 */
}

.dock-item span:first-child {
  font-size: 24px; /* 颜文字图标大小 */
  margin-bottom: 5px; /* 颜文字与文字的间距 */
}

.dock-item span:last-child {
  font-size: 12px;
}
</style>