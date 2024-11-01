<template>
<el-row justify="center" align="center">
  <el-button type="primary" size="medium">运行</el-button>
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
  <el-button type="primary" size="large">背包</el-button>
  <el-button type="primary" size="medium">设置</el-button>
  <el-button type="primary" @click="goToHomePage">返回菜单</el-button>
</el-row>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
  setup() {
    const router = useRouter();
    const goToHomePage = () => {
      router.push({ name: 'WelcomePage' });
    };
    return { goToHomePage };
  },
};
</script>