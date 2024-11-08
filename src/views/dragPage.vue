<template>
    <div class="app-container">
      <!-- 右下角添加按钮 -->
      <el-button
        class="add-button"
        circle
        icon="el-icon-plus"
        @click="addDialog"
      ></el-button>
  
      <!-- 左下角图标区域 -->
      <div class="icon-container">
        <el-button
          v-for="(dialog, index) in dialogs"
          :key="index"
          circle
          :icon="dialog.icon"
          @click="showDialog(index)"
        ></el-button>
      </div>
  
      <!-- 可拖拽的对话框 -->
      <draggable
        v-model="dialogs"
        item-key="id"
        @start="drag=true"
        @end="drag=false"
      >
        <template #item="{ element, index }">
          <el-dialog
            :modal-append-to-body="false" 
            append-to-body
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :modal="false"
            v-model="element.visible"
            :title="element.title"
            :width="400"
            :draggable="true"
            destroy-on-close
            @close="closeDialog(index)"
          >
            <span>这是对话框 {{ index + 1 }} 的内容</span>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="closeDialog(index)">关闭</el-button>
              </span>
            </template>
          </el-dialog>
        </template>
      </draggable>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
  import draggable from 'vuedraggable'
  
  export default {
    components: {
      draggable
    },
    setup() {
      const dialogs = ref([])
      const drag = ref(false)
  
      const addDialog = () => {
        const newDialog = {
          id: Date.now(),
          title: `对话框 ${dialogs.value.length + 1}`,
          visible: true,
          icon: 'el-icon-chat-dot-square'
        }
        dialogs.value.push(newDialog)
      }
  
      const showDialog = (index) => {
        dialogs.value[index].visible = true
      }
  
      const closeDialog = (index) => {
        dialogs.value[index].visible = false
      }
  
      return {
        dialogs,
        drag,
        addDialog,
        showDialog,
        closeDialog
      }
    }
  }
  </script>
  
  <style scoped>
  .app-container {
    position: relative;
    height: 100vh;
  }
  
  .add-button {
    position: fixed;
    right: 20px;
    bottom: 20px;
  }
  
  .icon-container {
    position: fixed;
    left: 20px;
    bottom: 20px;
    display: flex;
    gap: 10px;
  }
  
  :deep(.el-dialog__wrapper) {
    position: absolute !important;
  }
  
  :deep(.el-dialog) {
    margin: 0 !important;
  }
  </style>