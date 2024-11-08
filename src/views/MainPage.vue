
<template>

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

  <el-dialog v-model="setVisible" title="设置" :modal="false" :close-on-click-modal="false" :z-index="998" draggable>
    <el-button type="primary" >保存游戏</el-button>
    <el-button type="primary" >打包游戏</el-button>
    <el-button type="primary" @click="goToHomePage">返回菜单</el-button>
  </el-dialog>
  
  <el-dialog v-model="bagVisible" title="背包" :modal="false" :close-on-click-modal="false" :z-index="998" draggable>
    <el-button type="primary" >导入物品</el-button>
    <el-button type="primary" >垃圾桶</el-button>
  </el-dialog>

  <el-dialog v-model="runVisible" title="运行" :modal="false" :close-on-click-modal="false" :z-index="998" draggable>
  </el-dialog>

</template>



<script>
import {useRouter} from 'vue-router';
import {ref} from 'vue';
export default {
  setup() {
    const router = useRouter();
    const runVisible = ref(false);
    const bagVisible = ref(false);
    const setVisible = ref(false);
    const goToHomePage = () => {
      router.push({ name: 'WelcomePage' });
    };
    return { goToHomePage, runVisible, bagVisible, setVisible };
  },
};
</script>



<style lang="scss">
.el-button {
  position: relative;
  z-index: 999;
}
</style>