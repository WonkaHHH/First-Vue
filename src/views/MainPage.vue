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
    <transition name="modal" v-for="modal in modals" :key="modal.id" class="modal">
      <div
        v-if="modal.show"
        class="modal"
        :style="{ top: modal.top + 'px', left: modal.left + 'px' }"
        @mousedown="startDrag($event, modal)"
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
    const isDragging = ref(false);
    const dragOffset = ref({ x: 0, y: 0 });
    const currentModal = ref(null);

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

    const startDrag = (event, modal) => {
      isDragging.value = true;
      currentModal.value = modal;
      dragOffset.value = {
        x: event.clientX - modal.left,
        y: event.clientY - modal.top
      };
      document.addEventListener('mousemove', onDragging);
      document.addEventListener('mouseup', endDrag);
    };

    const onDragging = (event) => {
      if (isDragging.value) {
        const { clientX, clientY } = event;
        const { x, y } = dragOffset.value;
        currentModal.value.left = clientX - x;
        currentModal.value.top = clientY - y;
      }
    };

    const endDrag = () => {
      isDragging.value = false;
      document.removeEventListener('mousemove', onDragging);
      document.removeEventListener('mouseup', endDrag);
    };

    return { goToHomePage, goToApp, openAppModal, closeAppModal, modals, startDrag };
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

.modal {
  position: fixed; /* 固定定位，以便能够通过 top 和 left 属性定位 */
  border: 1px solid #ccc; /* 添加1像素的边框，颜色为 #ccc */
  background-color: white; /* 背景颜色为白色 */
  padding: 20px; /* 内边距 */
  border-radius: 5px; /* 边框圆角 */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 轻微的阴影效果 */
  z-index: 1000; /* 确保模态框在其他元素之上 */
}
</style>