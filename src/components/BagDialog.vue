<template>
  <el-row :gutter="10" @click="hideMenu">
    <el-col :span="6" class="border-box">
      <div class="content-grid">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
          <el-tab-pane label="造型" name="first">造型</el-tab-pane>
          <el-tab-pane label="声音" name="second">声音</el-tab-pane>
        </el-tabs>
      </div>
      <el-button type="primary" @click="addItem">导入物品</el-button>
    </el-col>
    <el-col :span="18" class="border-box">
      <div class="content-grid">
        <div v-for="(item, index) in elementList" :key="index" class="grid-item" title="点击查看物品详情" @contextmenu="showMenu($event,item)" @click="handleElementClick(item)">
          <img :src="item.src" class="grid-image"/>
          <div icon="icon icon-delete" @click.stop="removeItem(item.uuid)" class="remove-button" title="删除">X</div>
          <el-checkbox class="check-button" @click.stop="checkImgItem(item)" v-model="item.checked" size="large" />
        </div>
      </div>
      <!-- <el-button type="primary" @click="removeAll">清空</el-button> -->
    </el-col>
  </el-row>

  <!-- <div class="content-grid">
    <div v-for="(item, index) in elementList" :key="index" class="grid-item" title="点击查看物品详情" @click="handleElementClick(item)">
      <img :src="item.src" class="grid-image" />
      <div icon="icon icon-delete" @click.stop="removeItem(item.uuid)" class="remove-button" title="删除">X</div>
    </div>
  </div> -->
  <elementDialog v-model="elementDialogVis" :visible="elementDialogVis" :element="element" :onElementChange="handleElementChange"/>
  <RightClickMenu ref="rightClickMenu" :onElementChange="handleElementChange" :onHandleBagRemove="removeItem"/>
</template>

<script>
import { computed, nextTick, ref, toRefs } from 'vue'
import RightClickMenu from '../components/rightMenu.vue';
import { JsonViewer } from 'vue3-json-viewer'
// if you used v1.0.5 or latster ,you should add import "vue3-json-viewer/dist/index.css"
import 'vue3-json-viewer/dist/index.css'
import elementDialog from '../components/elementDialog.vue';
import { Position } from '@element-plus/icons-vue';

export default {
  components: {
    elementDialog,
    RightClickMenu,
  },
  props: {
    elementList: {
      type: Array,
      required: true,
    },
    onAdd: {
      type: Function,
      required: true,
    },
    onRemove: {
      type: Function,
      required: true,
    },
    onRemoveAll: {
      type: Function,
      required: true,
    },
    onElementChange: {
      type: Function,
      required: true,
    },
    onCheckItem: {
      type: Function,
      required: true,
    }
  },
  methods: {
    addItem() {
      this.onAdd() // 调用导入物品的回调
    },
    removeItem(uuid) {
      this.onRemove(uuid) // 调用删除物品的回调，传入索引
    },
    removeAll() {
      this.onRemoveAll()
    },
    handleElementChange(){
      this.onElementChange()
    }
  },
  setup(props) {
    const { onCheckItem } = toRefs(props);
    const elementUuid = ref('')
    const rightClickMenu = ref(null);
    // 选中的物体
    const element = computed(() => {
      return props.elementList.find((item) => item.uuid === elementUuid.value) || {}
    })
    const elementDialogVis = ref(false) // 控制对话框显示

    const handleElementClick = (elem) => {
      elementUuid.value = elem.uuid
      elementDialogVis.value = true
    }

    const showMenu = (event, img) => {
      const canvasRect = event.currentTarget.getBoundingClientRect();
      console.log(canvasRect, event)
      const position = {
        X: event.clientX,
        Y: event.clientY,
      }
      rightClickMenu.value.showMenu(event, img, position);
    };

    const hideMenu = () => {
      if (rightClickMenu.value) {
        rightClickMenu.value.hideMenu();
      }
    };

    const checkImgItem = (item) =>{
      item.checked = ! item.checked;
      onCheckItem.value(item)
    }

    return {
      element,
      elementDialogVis,
      handleElementClick,
      showMenu,
      hideMenu,
      checkImgItem,
      rightClickMenu,
    }
  },
}
</script>

<style scoped>
.content-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 10px;
  overflow-y: auto; /* 允许上下滚动 */
  height: 400px; /* 最大高度，可根据需要调整 */
  margin-bottom: 20px; /* 增加底部间距以与按钮分隔 */
}

.vertical-line {
  width: 2px; /* 竖线的宽度 */
  height: 100px; /* 竖线的高度 */
  background-color: black; /* 竖线的颜色 */
  margin: 0 auto; /* 居中对齐 */
}

.grid-item {
  background-color: #f0f0f0; /* 设置网格项背景色 */
  border: 1px solid #ccc; /* 设置边框 */
  display: flex;
  flex-direction: column; /* 垂直布局 */
  align-items: center;
  justify-content: center;
  padding: 10px; /* 内边距 */
  border-radius: 4px; /* 圆角 */
  position: relative; /* 为删除按钮设置定位 */
}

.grid-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover; /* 适应网格项 */
}

.remove-button {
  display: none;
  position: absolute; /* 设置删除按钮为绝对定位 */
  top: 5px;
  right: 5px; /* 将删除按钮放置在右上角 */
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #666;
  color: #fff;
}
.check-button {
  display: flex;
  position: absolute; /* 设置删除按钮为绝对定位 */
  bottom: 5px;
  right: 5px; /* 将删除按钮放置在右下角 */
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 20px;
  height: 20px;
}
.grid-item:hover .remove-button {
  display: flex;
}

.border-box {
  border: 1px solid #000; /* 黑色边框，2px宽度 */
  padding: 10px; /* 内边距 */
}
</style>
