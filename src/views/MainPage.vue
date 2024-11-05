<template>
  <div class="container">
    <!-- 画布元素，按下键盘数字键后图片会出现在这里 -->
    <div class="fullscreen-canvas">
      <DragElement v-for="img in images" :key="img.uuid" :src="img.src" :style="img.style" />
    </div>

    <el-row justify="center" align="center">
      <el-button type="primary" size="medium" @click="runVisible = true">运行</el-button>
      <el-button type="primary" size="small">1</el-button>
      <el-button type="primary" size="small">2</el-button>
      <el-button type="primary" size="small">3</el-button>
      <el-button type="primary" size="small">4</el-button>
      <el-button type="primary" size="small">5</el-button>
      <el-button type="primary" size="small">6</el-button>
      <el-button type="primary" size="small">7</el-button>
      <el-button type="primary" size="small">8</el-button>
      <el-button type="primary" size="small">9</el-button>
      <el-button type="primary" size="small">0</el-button>
      <el-button type="primary" size="large" @click="bagVisible = true">背包</el-button>
      <el-button type="primary" size="medium" @click="setVisible = true">设置</el-button>
    </el-row>
  </div>

  <el-dialog v-model="setVisible" title="设置" :modal="false" :close-on-click-modal="false" :close-on-press-escape="false" :z-index="998" draggable modal-class="operation-dialog-modal">
    <el-button type="primary">保存游戏</el-button>
    <el-button type="primary">打包游戏</el-button>
    <el-button type="primary" @click="goToHomePage">返回菜单</el-button>
  </el-dialog>

  <el-dialog v-model="bagVisible" title="背包" :modal="false" :close-on-click-modal="false" :close-on-press-escape="false" :z-index="998" draggable modal-class="operation-dialog-modal">
    <BagDialog :elementList="images" :onAdd="handleBagAddElement" :onRemove="handleBagRemove" :onRemoveAll="handleBagClear" />
  </el-dialog>

  <el-dialog v-model="runVisible" title="运行" :modal="false" :close-on-click-modal="false" :close-on-press-escape="false" :z-index="998" draggable modal-class="operation-dialog-modal"> </el-dialog>
</template>

<script>
import { useRouter } from 'vue-router'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import DragElement from '../components/DragElement.vue'
import BagDialog from '../components/BagDialog.vue'
import { v4 } from 'uuid'
export default {
  setup() {
    const router = useRouter()
    const runVisible = ref(false)
    const bagVisible = ref(false)
    const setVisible = ref(false)
    const goToHomePage = () => {
      router.push({ name: 'WelcomePage' })
    }

    const images = ref([]) // 存储图片元素的数组

    // 添加图片到画布中心
    const addImage = (type) => {
      /**
       * @type {import('../types/element').ElementType}
       */
      const img = {
        elemType: 'image',
        type,
        src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        uuid: v4(),
        style: {
          width: '100px',
          height: '100px',
        },
      }
      const newList = [...images.value]
      newList.push(img)
      images.value = newList
    }

    // 监听键盘事件
    const handleKeyDown = (event) => {
      event.preventDefault()
      const key = event.key
      // 检测按下的是否为数字 1-9
      if (key >= '1' && key <= '9') {
        addImage(Number(key))
      }
      // 如果是tab，bagVisible设置为true
      if (key === 'Tab') {
        bagVisible.value = true
      }
      // 如果是esc，setVisible设置为true
      if (key === 'Escape') {
        setVisible.value = true
      }
      // 如果是F5，runVisible设置为true
      if (key === 'F5') {
        runVisible.value = true
      }
    }

    const handleBagAddElement = () => {
      // 导入数据到物品列表中
    }

    const handleBagRemove = (uuid) => {
      const newList = images.value.filter((item) => {
        return item.uuid !== uuid
      })
      images.value = newList
    }

    const handleBagClear = () => {
      images.value = []
    }

    onMounted(() => {
      window.addEventListener('keydown', handleKeyDown)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('keydown', handleKeyDown)
    })

    return {
      goToHomePage,
      router,
      runVisible,
      bagVisible,
      setVisible,
      images,
      handleBagAddElement,
      handleBagRemove,
      handleBagClear,
    }
  },
}
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

.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.fullscreen-canvas {
  flex-grow: 1;
  position: relative;
  background-color: rgba(0, 0, 0, 0.1);
}

.operation-dialog-modal {
  pointer-events: none;
  .el-overlay-dialog {
    pointer-events: none;
    .el-dialog {
      pointer-events: auto;
    }
  }
}
</style>
