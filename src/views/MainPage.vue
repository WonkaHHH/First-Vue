<template>
  <div class="second-page">
    <el-button type="primary" @click="goToHomePage">回到菜单</el-button>
    <el-button type="primary" @click="goToHomePage">退出游戏</el-button>
    <!-- Dock栏 -->
    <div class="dock">
      <div class="dock-item" @click="openAppModal(1)">
        <span>📂</span> <!-- 颜文字图标 -->
        <span>App 1</span>
      </div>
      <div class="dock-item" @click="openAppModal(2)">
        <span>📄</span> <!-- 颜文字图标 -->
        <span>App 2</span>
      </div>
      <!-- 根据需要添加更多的dock项 -->
    </div>
    <!-- 动态组件用于显示窗口 -->
    <transition name="modal" v-for="modal in modals" :key="modal.id">
      <div v-if="modal.show" class="modal" :style="{ top: modal.top + 'px', left: modal.left + 'px' }"
           @mousedown="dragStart(modal, $event)">
        <div class="modal-content" @mouseup="dragEnd" @mouseleave="dragEnd">
          <span class="close" @click="closeAppModal(modal.id)">&times;</span>
          <p>这里是应用{{ modal.id }}的内容</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { reactive, ref, onMounted, onUnmounted } from 'vue';

export default {
  setup() {
    const router = useRouter();
    const modals = reactive([]);
    const dragMove = ref(null); // 使用 ref 存储 dragMove 方法的引用

    const goToHomePage = () => {
      router.push({ name: 'WelcomePage' });
    };

    const goToApp = (appId) => {
      // 根据 appId 导航到不同的应用页面
      // 例如：
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

    let dragging = false;
    let currentModal = null;

    const dragStart = (modal, event) => {
      dragging = true;
      currentModal = modal;
    };

    const dragEnd = () => {
      dragging = false;
      currentModal = null;
    };

    dragMove.value = (event) => {
      if (dragging) {
        const { clientX, clientY } = event;
        const { top, left } = currentModal;
        currentModal.left = clientX - 10 + left;
        currentModal.top = clientY - 10 + top;
      }
    };

    onMounted(() => {
      document.addEventListener('mousemove', dragMove.value);
    });

    onUnmounted(() => {
      document.removeEventListener('mousemove', dragMove.value);
    });

    return { goToHomePage, goToApp, openAppModal, closeAppModal, modals };
  },
};
</script>