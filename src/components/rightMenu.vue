<template>
    <div v-if="visible" class="right-click-menu" :style="{ top: `${y}px`, left: `${x}px` }">
        <ul>
            <li @click="handleOpenInfoDialog()">属性</li>
            <li @click="handleDeleteEle()">删除</li>
        </ul>
    </div>
    <elementDialog v-model="eleVisible" :visible="eleVisible" :element="element" :onElementChange="handleElementChange"/>
  
</template>

<script>
import { ref, toRefs } from 'vue'

export default {

props: {
    onElementChange: {
        type: Function,
        required: true,
    },
    onHandleBagRemove: {
        type: Function,
        required: true,
    }
},
methods: {
    handleElementChange(){
        this.onElementChange()
    }
},
setup(props) {
    const { onHandleBagRemove } = toRefs(props);
    const element = ref(null)
    const uuid = ref('')
    const eleVisible = ref(false)
    const visible = ref(false);
    const x = ref(0);
    const y = ref(0);

    const showMenu = (event, img, position) => {
      event.preventDefault(); // 阻止默认右键菜单
      visible.value = true;
      element.value = img;
      uuid.value = img.uuid;
      x.value = position.X;
      y.value = position.Y;
    };

    const hideMenu = () => {
      visible.value = false;
    };

    const handleOpenInfoDialog = () => {
        eleVisible.value = true;
        hideMenu();
    };
    const handleDeleteEle = () => {
        onHandleBagRemove.value(uuid.value);
        hideMenu();
    };

    return {
        element,
        eleVisible,
        visible,
        x,
        y,
        showMenu,
        hideMenu,
        handleOpenInfoDialog,
        handleDeleteEle

    }
},
}
</script>

<style scoped>
.right-click-menu {
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000; /* 确保菜单在其他内容之上 */
}
.right-click-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.right-click-menu li {
  padding: 10px 15px;
  cursor: pointer;
}
.right-click-menu li:hover {
  background-color: #f0f0f0; /* 悬停效果 */
}
</style>
  