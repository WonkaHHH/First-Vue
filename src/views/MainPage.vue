<template>
  <div class="container" @click="hideMenu">
    <!-- 画布元素，按下键盘数字键后图片会出现在这里 -->
    <div tabindex="0" class="fullscreen-canvas" :z-index="100" @keyup="handleKeyDown" @drop="handleDrop" @dragover.prevent>
      <el-button class="full-image-button-sweater" plain @click="runVisible = true, buttonTitle = '环境与天气'">
        <img :src="imgButton[2]" style="width: 150px; height: 60px;">
      </el-button>
      <el-button type="primary" @click="runVisible = true, buttonTitle = '网络'">网络</el-button>
      <el-button type="primary">2D/3D</el-button>
      <DragElement tabindex="0" v-for="img in images" :key="img.uuid" :src="img.src" :style="img.style" :initialX="img.positionX" :initialY="img.positionY" @keyup="handleDeleteImg($event, img)" @dblclick="handleDoubleClick(img)" @contextmenu="showMenu($event,img)"/>
    </div>
    <el-row justify="center" align="center">
      <!-- <el-button type="primary" size="medium">暂停</el-button> -->
      <el-button plain :style="fullImageButton" @click="changeRunMode()"></el-button>
      <!-- <el-button type="primary" size="medium">倍速</el-button> -->
      <el-button v-for="num in btnList" :key="num" plain size="small" draggable="true" @dragstart="(event) => handleDragStart(num, event)" class="full-image-button">
        <el-popover
              placement="top-start"
              trigger="hover"
              content="快捷键：... 功能：...">
              <template #reference>
                <img :src="imgSrc[num]" style="width: 20px; height: 20px;">
              </template>
            </el-popover>
      </el-button>
      <el-button type="primary" size="large" @click="bagVisible = true">背包</el-button>
      <el-button type="primary" size="medium" @click="setVisible = true">设置</el-button>
      <el-button>视角</el-button>
      <!-- <el-text size="small"> 按下V切换视角</el-text> -->
    </el-row>
  </div>

  <el-dialog v-model="setVisible" title="设置" :modal="false" :close-on-click-modal="false" :close-on-press-escape="false" :z-index="998" draggable modal-class="operation-dialog-modal">
    <div class="settingDialog">
      <el-button class="buttonSize" type="primary">保存游戏</el-button>
      <el-button class="buttonSize" type="primary">打包游戏</el-button>
      <el-button class="buttonSize" type="primary">开启/关闭 新手引导</el-button>
      <el-button class="buttonSize" type="primary" @click="goToHomePage">返回菜单</el-button>
      <el-form>
        <el-form-item label="逻辑模式" label-position="right">
          <el-checkbox-group v-model="selectedTabs">
            <el-popover
              placement="top-start"
              trigger="hover"
              content="属性">
              <template #reference>
                <el-checkbox-button value="属性" disabled>属性</el-checkbox-button>
              </template>
            </el-popover>
            <el-popover
              placement="top-start"
              trigger="hover"
              content="积木">
              <template #reference>
                <el-checkbox-button value="积木">积木</el-checkbox-button>
              </template>
            </el-popover>
            <el-popover
              placement="top-start"
              trigger="hover"
              content="代码">
              <template #reference>
                <el-checkbox-button value="代码">代码</el-checkbox-button>
              </template>
            </el-popover>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>

  <el-dialog v-model="bagVisible" title="背包" :modal="false" :close-on-click-modal="false" :close-on-press-escape="false" :z-index="110" draggable modal-class="operation-dialog-modal">
    <BagDialog :elementList="images" :onAdd="handleBagAddElement" :onRemove="handleBagRemove" :onRemoveAll="handleBagClear" :onElementChange="handleBagItemChange" :onCheckItem="handleOnCheckItem"/>
  </el-dialog>


  <el-dialog v-model="runVisible" :title="buttonTitle" :modal="false" :close-on-click-modal="false" :close-on-press-escape="false" :z-index="110" draggable modal-class="operation-dialog-modal" style="display: flex;flex-direction: column;"> 
    <el-text v-if="buttonTitle == '网络'">引擎局域网协调编辑 / 游戏联机配置 （待讨论）</el-text>
    <el-text v-if="buttonTitle == '环境与天气'">粒子系统（雨雪）/地理天空（时间变换、太阳变换）</el-text>
  </el-dialog>

  <elementDialog v-model="eleVisible" :visible="eleVisible" :element="element" :onElementChange="handleBagItemChange"/>
  <RightClickMenu ref="rightClickMenu" :onElementChange="handleBagItemChange" :onHandleBagRemove="handleBagRemove"/>
</template>

<script>
import { useRouter } from 'vue-router'
import { computed, ref, onUnmounted, provide } from 'vue'
import DragElement from '../components/DragElement.vue'
import BagDialog from '../components/BagDialog.vue'
import elementDialog from '../components/elementDialog.vue';
import RightClickMenu from '../components/rightMenu.vue';
import { v4 } from 'uuid'
import { de } from 'element-plus/es/locales.mjs';
import runImage from '../assets/imgs/run.png';
import pauseImage from '../assets/imgs/pause.png';
import sweaterImage from '../assets/imgs/sweater.png';
export default {
  components: {
    RightClickMenu,
  },
  computed: {
    fullImageButton() {
      const imageUrl = this.imgButton[this.currentRunNum]
      return {
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        border: 'none',
        height: '40px',
        width: '40px'
      };
    }
  },
  methods: {
    changeRunMode(){
      if(this.currentRunNum == 0){
        this.currentRunNum = 1;
      }else if(this.currentRunNum == 1){
        this.currentRunNum = 0;
      }
    }
  },
  setup() {
    const router = useRouter()
    const btnList = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 0])
    const imgSrc = ref([
      "https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68",
      "https://fastly.picsum.photos/id/11/2500/1667.jpg?hmac=xxjFJtAPgshYkysU_aqx2sZir-kIOjNR9vx0te7GycQ",
      "https://fastly.picsum.photos/id/12/2500/1667.jpg?hmac=Pe3284luVre9ZqNzv1jMFpLihFI6lwq7TPgMSsNXw2w",
      "https://fastly.picsum.photos/id/13/2500/1667.jpg?hmac=SoX9UoHhN8HyklRA4A3vcCWJMVtiBXUg0W4ljWTor7s",
      "https://fastly.picsum.photos/id/14/2500/1667.jpg?hmac=ssQyTcZRRumHXVbQAVlXTx-MGBxm6NHWD3SryQ48G-o",
      "https://fastly.picsum.photos/id/15/2500/1667.jpg?hmac=Lv03D1Y3AsZ9L2tMMC1KQZekBVaQSDc1waqJ54IHvo4",
      "https://fastly.picsum.photos/id/16/2500/1667.jpg?hmac=uAkZwYc5phCRNFTrV_prJ_0rP0EdwJaZ4ctje2bY7aE",
      "https://fastly.picsum.photos/id/17/2500/1667.jpg?hmac=HD-JrnNUZjFiP2UZQvWcKrgLoC_pc_ouUSWv8kHsJJY",
      "https://fastly.picsum.photos/id/18/2500/1667.jpg?hmac=JR0Z_jRs9rssQHZJ4b7xKF82kOj8-4Ackq75D_9Wmz8",
      "https://fastly.picsum.photos/id/19/2500/1667.jpg?hmac=7epGozH4QjToGaBf_xb2HbFTXoV5o8n_cYzB7I4lt6g"
    ])
    const imgButton = ref([
      runImage,
      pauseImage,
      sweaterImage
    ])
    const currentRunNum = ref(0)
    const runVisible = ref(false)
    const bagVisible = ref(false)
    const setVisible = ref(false)
    const eleVisible = ref(false)
    const buttonTitle = ref('')
    const goToHomePage = () => {
      router.push({ name: 'WelcomePage' })
    }
    const images = ref([]) // 存储图片元素的数组
    const elementUuid = ref('')
    const rightClickMenu = ref(null);

    const selectedTabs = ref(['属性']) // 默认选中“配置”
    const activeTab = ref('属性') // 默认激活的标签
    const tabs = ref(['属性', '积木', '代码']) // 可选的标签项
    provide('selectedTabs', selectedTabs);
    provide('activeTab', activeTab);
    provide('tabs', tabs);

    // 添加图片到画布中心
    const addImage = (type, position, src) => {
      const uuid = v4()
      const positionX = position?.x
      const positionY = position?.y
      /**
       * @type {import('../types/element').ElementType}
       */
      const img = {
        elemType: 'image',
        type,
        src: src,
        uuid,
        name: `物体-${type}-${uuid}`,
        style: {
          width: '100px',
          height: '100px',
        },
        positionX,
        positionY,
        checked: false
      }
      const newList = [...images.value]
      newList.push(img)
      images.value = newList
    }
    const showMenu = (event, img) => {
      const position = {
        X: event.clientX,
        Y: event.clientY
      }
      rightClickMenu.value.showMenu(event, img, position);
    };
    const hideMenu = () => {
      if (rightClickMenu.value) {
        rightClickMenu.value.hideMenu();
      }
    };

    // 监听键盘事件
    const handleKeyDown = (event) => {
      event.preventDefault()
      const key = event.key
      const numberRegex = "0123456789"
      if (numberRegex.includes(key)) {
        addImage(Number(key), null, imgSrc.value[key])
      }
    }

    const handleGlobalKeyDown = (event) => {
      event.preventDefault()
      const key = event.key

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
        // runVisible.value = true
      }
    }
    const handleDeleteImg = (event, img) => {
      event.stopPropagation()
      const key = event.key
      if (key === 'Delete') {
        handleBagRemove(img.uuid);
      } 
    }
    const element = computed(() => {
      return images.value.find((item) => item.uuid === elementUuid.value) || {}})
    // windows监听键盘事件
    window.addEventListener('keydown', handleGlobalKeyDown)
    // 移除监听
    onUnmounted(() => {
      window.removeEventListener('keydown', handleGlobalKeyDown)
    })

    const handleBagAddElement = () => {
      // 导入数据到物品列表中
    }
    const handleOnCheckItem = (img) =>{
      // 物品选择事件 
      const newList = images.value;
      for(let i = 0; i < newList.length; i++){
        if(newList[i].uuid == img.uuid){
          newList[i].checked = !newList[i].checked
          break
        }
      }
      images.value = newList;
    }

    const handleBagRemove = (uuid) => {
      const newList = images.value.filter((item) => {
        return item.uuid !== uuid
      })
      images.value = newList
    }

    const handleBagItemChange = (newElem) => {
      const { uuid } = newElem
      const newList = images.value.map((item) => {
        if (item.uuid !== uuid) {
          return item
        } else {
          return newElem
        }
      })
      images.value = newList
    }

    const handleBagClear = () => {
      images.value = []
    }

    const handleDoubleClick = (elem) => {
      // 处理双击事件
      eleVisible.value = true;
      elementUuid.value = elem.uuid

    };

    function handleDragStart(num, event) {
      this.initialPosition = { x: event.clientX, y: event.clientY }
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('buttonNumber', num) // 保存按钮的数字
    }

    function handleDrop(event) {
      const canvasRect = event.currentTarget.getBoundingClientRect()
      const dropPosition = {
        x: event.clientX - canvasRect.left,
        y: event.clientY - canvasRect.top,
      }
      const buttonNumber = event.dataTransfer.getData('buttonNumber') // 获取按钮的数字
      addImage(Number(buttonNumber), dropPosition, imgSrc.value[buttonNumber])
    }

    return {
      btnList,
      imgSrc,
      goToHomePage,
      router,
      runVisible,
      bagVisible,
      setVisible,
      eleVisible,
      buttonTitle,
      element,
      images,
      handleBagAddElement,
      handleBagRemove,
      handleBagClear,
      handleDragStart,
      handleDrop,
      handleKeyDown,
      handleDeleteImg,
      handleOnCheckItem,
      handleBagItemChange,
      handleDoubleClick,
      showMenu,
      hideMenu,
      rightClickMenu,
      selectedTabs,
      activeTab,
      tabs,
      imgButton,
      currentRunNum
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
.settingDialog{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.buttonSize{
  width: 30%;
  margin-top: 10px;
  margin-bottom: 10px;
}
.full-image-button {
  background-size: cover; /* 使背景图像覆盖整个按钮 */
  background-position: center; /* 将图像居中 */
  border: none; /* 去掉边框 */
  height: 20px; /* 按钮高度 */
  width: 20px; /* 按钮宽度 */
  position: relative; /* 设置位置为相对，以便使用绝对位置的子元素 */
}

.full-image-button-sweater {
  background-size: cover; /* 使背景图像覆盖整个按钮 */
  background-position: center; /* 将图像居中 */
  border: none; /* 去掉边框 */
  height: 60px; /* 按钮高度 */
  width: 150px; /* 按钮宽度 */
  position: relative; /* 设置位置为相对，以便使用绝对位置的子元素 */
}

</style>
