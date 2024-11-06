<template>
  <div class="content-grid">
    <div v-for="(item, index) in elementList" :key="index" class="grid-item" title="点击查看物品详情">
      <img :src="item.src" class="grid-image" />
      <div icon="icon icon-delete" @click="removeItem(item.uuid)" class="remove-button" title="删除">X</div>
    </div>
  </div>

  <el-button type="primary" @click="addItem">导入物品</el-button>
  <el-button type="primary" @click="removeAll">清空</el-button>
</template>

<script>
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
