<template>
    <!-- 物体详情对话框 -->
    <el-dialog :visible="elementDialogVis" @update:visible="handleUpdateVisible" :modal="false" :close-on-click-modal="false" :close-on-press-escape="false" :z-index="998" draggable modal-class="operation-dialog-modal" append-to-body>
      <template #header>
        <div v-if="!isEditingTitle" @click="startEditingTitle(element)">
          <span>{{ element.name }}</span>
        </div>
        <div v-else>
          <el-input ref="inputRef" v-model="editableTitle" @blur="saveTitle" @keyup.enter="saveTitle" size="small" />
        </div>
      </template>
      <!-- <el-form>
        <el-form-item label="逻辑模式" label-position="right">
          <el-checkbox-group v-model="selectedTabs">
            <el-checkbox-button label="属性">属性</el-checkbox-button>
            <el-checkbox-button label="积木">积木</el-checkbox-button>
            <el-checkbox-button label="代码">代码</el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
      </el-form> -->
      <el-popover
        placement="top-start"
        trigger="hover"
        :content="activeTab">
        <template #reference>
          <el-tabs v-model="activeTab" tab-position="left">
            <el-tab-pane key="属性" :label="renderLabel('属性')" name="属性" v-if="selectedTabs.includes('属性')">
              <div>
                <el-row>
                  <!-- 左侧 Descriptions 区域 -->
                  <el-col :span="12">
                    <el-descriptions :column="1">
                      <el-descriptions-item v-for="(value, key) in element.style" :key="key" :label="`${getChineseLabel(key)}：`">
                        {{ value }}
                      </el-descriptions-item>
                      <el-descriptions-item>
                        <el-select
                          placeholder="Select"
                          style="width: 240px">
                          <el-option
                            v-for="item in allPersonalData"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          />
                        </el-select>
                      </el-descriptions-item>
                      <el-descriptions-item>
                        <el-button type="primary" @click="runVisible = true">添加属性</el-button>
                      </el-descriptions-item>
                    </el-descriptions>
                  </el-col>

                  <!-- 右侧 JSON 编辑区域 -->
                  <!-- <el-col :span="12">
                    <div class="element-json">
                      <JsonViewer :value="element" />
                    </div>
                  </el-col> -->
                </el-row>
              </div>
            </el-tab-pane>
            <el-tab-pane key="积木" :label="renderLabel('积木')" name="积木" v-if="selectedTabs.includes('积木')">
              <p>这是积木的内容</p>
            </el-tab-pane>
            <el-tab-pane key="代码" :label="renderLabel('代码')" name="代码" v-if="selectedTabs.includes('代码')">
              <p>这是低代码的内容</p>
            </el-tab-pane>
          </el-tabs>
        </template>
      </el-popover>


      <el-dialog v-model="runVisible" title="自定义属性" :modal="false" :close-on-click-modal="false" :close-on-press-escape="false" :z-index="1100" draggable modal-class="operation-dialog-modal" style="display: flex;flex-direction: column;"> 
        <div>
          <el-text>变量名：</el-text>
          <el-input v-model="savePersonalData.name" style="width: 240px" placeholder="Please input" />
        </div>
        <div style="padding-top: 10px;">
          <el-text>变量值：</el-text>
          <el-input v-model="savePersonalData.value" style="width: 240px" placeholder="Please input" />
        </div>
        <div style="display: flex; justify-content: flex-end;">
          <el-button type="primary" @click="addPersonalData">确定</el-button>
        </div>
      </el-dialog>
    </el-dialog>

  </template>
  
  <script>
  import { de } from 'element-plus/es/locales.mjs';
import { computed, nextTick, ref, inject } from 'vue'
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
      const runVisible = ref(false)
      /*
       * 下面是物品详情对话框逻辑
       */
      const selectedTabs = inject('selectedTabs');// 默认选中“配置”
      const activeTab =  inject('activeTab');// 默认激活的标签
      const tabs = inject('tabs'); // 可选的标签项
      const hoveredTab = ref('')
  
      const isEditingTitle = ref(false) // 控制是否处于编辑标题模式
      const editableTitle = ref('') // 临时存储可编辑标题内容

      const savePersonalData = ref({
        name: '',
        value: ''
      })
      const allPersonalData = ref([])
  
      // 开始编辑标题
      const startEditingTitle = (element) => {
        editableTitle.value = element.name
        isEditingTitle.value = true
        nextTick(() => {
          const inputElem = inputRef.value
          // 聚焦到输入框
          if (inputElem) {
            inputElem.focus()
          }
        })
      }
      // const handleMouseOver = (label) =>{
      //     hoveredTab.value = label; // 设置悬停的标签名
      // };

      const renderLabel = (label) => {
        return label;
      };

      const addPersonalData = () =>{
        console.log(savePersonalData)
      }
  
      const saveTitle = () => {
        props.onElementChange({
            ...props.element,
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
        addPersonalData,
        runVisible,
        savePersonalData,
        allPersonalData,
        // handleMouseOver,
        renderLabel,
        hoveredTab
      }
    },
  }
  </script>
  
  <style lang="scss">
//   .operation-dialog-modal {
//   pointer-events: none;
//   .el-overlay-dialog {
//     pointer-events: none;
//     .el-dialog {
//       pointer-events: auto;
//     }
//   }
// }
  </style>
  