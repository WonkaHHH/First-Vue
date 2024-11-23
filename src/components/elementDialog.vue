<template>
    <!-- 物体详情对话框 -->
    <el-dialog :visible="elementDialogVis" @update:visible="handleUpdateVisible" :modal="false" :close-on-click-modal="false" :close-on-press-escape="false" :z-index="998" draggable modal-class="operation-dialog-modal" append-to-body>
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
  import { de } from 'element-plus/es/locales.mjs';
import { computed, nextTick, ref } from 'vue'
  import { JsonViewer } from 'vue3-json-viewer'
  // if you used v1.0.5 or latster ,you should add import "vue3-json-viewer/dist/index.css"
  import 'vue3-json-viewer/dist/index.css'
  
  export default {
    props: {
        visible: {
            type: Boolean,
            required: true,
        },
        element: {
            type: Object,
            required: true,
        },
        onElementChange: {
            type: Function,
            required: true,
        }
    },
    components: {
      JsonViewer,
    },
    methods: {
      getChineseLabel(key) {
        const labelMap = {
          width: '宽度',
          height: '高度',
        }
        return labelMap[key] || key
      },
      handleUpdateVisible(value) {
        this.$emit('update:visible', value);
      },
    },
    emits: ['update:visible','update:element'],
    computed: {
        elementDialogVis: {
            get() {
                return this.visible;
            },
            set(value) {
                this.$emit('update:visible', value);
            },
        },
    },
    setup(props) {
      const inputRef = ref(null)
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
  </style>
  