<template>
  <div class="content-grid">
    <div v-for="(item, index) in elementList" :key="index" class="grid-item" title="点击查看物品详情" @click="handleElementClick(item)">
      <img :src="item.src" class="grid-image" />
      <div icon="icon icon-delete" @click.stop="removeItem(item.uuid)" class="remove-button" title="删除">X</div>
    </div>
  </div>

  <el-button type="primary" @click="addItem">导入物品</el-button>
  <el-button type="primary" @click="removeAll">清空</el-button>

  <!-- 物体详情对话框 -->
  <el-dialog v-model="elementDialogVis" :modal="false" :close-on-click-modal="false" :close-on-press-escape="false" :z-index="998" draggable modal-class="operation-dialog-modal" append-to-body>
    <template #header>
      <div v-if="!isEditingTitle" @click="startEditingTitle">
        <span>{{ element.name }}</span>
      </div>
      <div v-else>
        <el-input ref="inputRef" v-model="editableTitle" @blur="saveTitle" @keyup.enter="saveTitle" size="small" />
      </div>
    </template>
    <el-form>
      <el-form-item label="逻辑模式" label-position="right">
        <el-checkbox-group v-model="selectedTabs">
          <el-checkbox-button label="配置">配置</el-checkbox-button>
          <el-checkbox-button label="积木">积木</el-checkbox-button>
          <el-checkbox-button label="低代码">低代码</el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
    </el-form>

    <el-tabs v-model="activeTab" tab-position="left">
      <el-tab-pane key="配置" label="配置" name="配置" v-if="selectedTabs.includes('配置')">
        <div>
          <el-row>
            <!-- 左侧 Descriptions 区域 -->
            <el-col :span="12">
              <el-descriptions :column="1">
                <el-descriptions-item v-for="(value, key) in element.style" :key="key" :label="`${getChineseLabel(key)}：`">
                  {{ value }}
                </el-descriptions-item>
              </el-descriptions>
            </el-col>

            <!-- 右侧 JSON 编辑区域 -->
            <el-col :span="12">
              <div class="element-json">
                <JsonViewer :value="element" />
              </div>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane key="积木" label="积木" name="积木" v-if="selectedTabs.includes('积木')">
        <p>这是积木的内容</p>
      </el-tab-pane>
      <el-tab-pane key="低代码" label="低代码" name="低代码" v-if="selectedTabs.includes('低代码')">
        <p>这是低代码的内容</p>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
import { computed, nextTick, ref } from 'vue'
import { JsonViewer } from 'vue3-json-viewer'
// if you used v1.0.5 or latster ,you should add import "vue3-json-viewer/dist/index.css"
import 'vue3-json-viewer/dist/index.css'

export default {
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
  },
  components: {
    JsonViewer,
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
    getChineseLabel(key) {
      const labelMap = {
        width: '宽度',
        height: '高度',
      }
      return labelMap[key] || key
    },
  },
  emits: ['update:element'],
  setup(props) {
    const inputRef = ref(null)
    const elementUuid = ref('')
    // 选中的物体
    const element = computed(() => {
      return props.elementList.find((item) => item.uuid === elementUuid.value) || {}
    })
    const elementDialogVis = ref(false) // 控制对话框显示

    const handleElementClick = (elem) => {
      elementUuid.value = elem.uuid
      elementDialogVis.value = true
    }

    /*
     * 下面是物品详情对话框逻辑
     */
    const selectedTabs = ref(['配置']) // 默认选中“配置”
    const activeTab = ref('配置') // 默认激活的标签
    const tabs = ref(['配置', '积木', '低代码']) // 可选的标签项

    const isEditingTitle = ref(false) // 控制是否处于编辑标题模式
    const editableTitle = ref('') // 临时存储可编辑标题内容

    // 开始编辑标题
    const startEditingTitle = () => {
      editableTitle.value = element.value.name
      isEditingTitle.value = true
      nextTick(() => {
        const inputElem = inputRef.value
        // 聚焦到输入框
        if (inputElem) {
          inputElem.focus()
        }
      })
    }

    // 保存标题并退出编辑模式
    const saveTitle = () => {
      props.onElementChange({
        ...element.value,
        name: editableTitle.value,
      })
      isEditingTitle.value = false
    }

    /*
     * 上面是物品详情对话框逻辑
     */

    return {
      element,
      elementDialogVis,
      handleElementClick,
      selectedTabs,
      activeTab,
      tabs,
      editableTitle,
      isEditingTitle,
      startEditingTitle,
      saveTitle,
      inputRef,
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
.grid-item:hover .remove-button {
  display: flex;
}
</style>
