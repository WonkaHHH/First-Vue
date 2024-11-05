<template>
  <img :src="src" :style="[style, dragObj.style]" ref="imgRef" class="draggable-image" />
</template>

<script>
import { ref } from 'vue'
import { useDraggable } from '@vueuse/core'

export default {
  props: {
    src: String,
    style: {
      type: Object,
      // 默认宽高
      default: () => ({
        width: '100px',
        height: '100px',
      }),
    },
    initialX: {
      type: Number,
      default: window.innerWidth / 2 - 50,
    },
    initialY: {
      type: Number,
      default: window.innerHeight / 2 - 50,
    },
  },
  setup(props) {
    const imgRef = ref(null)
    const dragObj = ref({})

    const dragResult = useDraggable(imgRef, {
      initialValue: { x: props.initialX, y: props.initialY },
      preventDefault: true,
      onMove(position) {
        const elem = imgRef.value
        // 获取父容器的尺寸
        const parent = elem.parentElement
        const parentRect = parent.getBoundingClientRect()
        const curRect = elem.getBoundingClientRect()

        // 计算元素的最大坐标
        const maxX = parentRect.width - curRect.width
        const maxY = parentRect.height - curRect.height

        // 限制子元素位置在父级内
        position.x = Math.min(Math.max(position.x, 0), maxX)
        position.y = Math.min(Math.max(position.y, 0), maxY)

        return position // 返回受限位置
      },
    })
    dragObj.value = dragResult

    return { imgRef, dragObj }
  },
}
</script>

<style scoped>
.draggable-image {
  position: absolute;
  cursor: move;
}
</style>
