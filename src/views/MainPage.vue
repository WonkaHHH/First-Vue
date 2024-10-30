<template>
  <div class="second-page">
    <el-button type="primary" @click="goToHomePage">回到菜单</el-button>
    <el-button type="primary" @click="goToHomePage">退出游戏</el-button>
    <!-- Dock栏 -->
    <div class="dock">
      <div class="dock-item" @click="openAppModal(1)">
        <i class="fa fa-folder"></i> <!-- 使用Font Awesome图标 -->
        <span>App 1</span>
      </div>
      <div class="dock-item" @click="openAppModal(2)">
        <i class="fa fa-file"></i> <!-- 使用Font Awesome图标 -->
        <span>App 2</span>
      </div>
      <!-- 根据需要添加更多的dock项 -->
    </div>

    <!-- 动态组件用于显示窗口 -->
    <transition name="modal" v-for="modal in modals" :key="modal.id">
      <div
        v-if="modal.show"
        class="modal"
        :style="{ top: modal.top + 'px', left: modal.left + 'px' }"
      >
        <div class="modal-content">
          <span class="close" @click="closeAppModal(modal.id)">&times;</span>
          <p>这里是应用{{ modal.id }}的内容</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { reactive, ref } from 'vue';

export default {
  setup() {
    const router = useRouter();
    const modals = reactive([]);

    const goToHomePage = () => {
      router.push({ name: 'WelcomePage' });
    };

    const goToApp = (appId) => {
      router.push({ name: 'AppPage', params: { appId } });
    };

    const openAppModal = (appId) => {
      const newModal = {
        id: appId,
        show: true,
        top: 100,
        left: 100
      };
      modals.push(newModal);
    };

    const closeAppModal = (id) => {
      const index = modals.findIndex(modal => modal.id === id);
      if (index > -1) {
        modals.splice(index, 1);
      }
    };

    return { goToHomePage, goToApp, openAppModal, closeAppModal, modals };
  },
};
</script>


<style>
.dock {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #eee; /* macOS Dock的背景色 */
  padding: 10px;
  box-shadow: 0 -2px 5px rgba(0,0,0,0.2); /* 阴影效果 */
}

.dock-item {
  margin-right: 10px; /* 项目之间的间距 */
  cursor: pointer;
}

.dock-item i {
  font-size: 2em; /* 图标大小 */
  margin-bottom: 5px; /* 图标和文本之间的间距 */
}

.dock-item span {
  font-size: 0.8em; /* 文本大小 */
}
</style>