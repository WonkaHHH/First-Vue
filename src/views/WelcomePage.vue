<template>
  <div class="home">
    <h1>Home Page</h1>
    <el-button type="primary" @click="goToSecondPage">Go to Second Page</el-button>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const goToSecondPage = () => {
      router.push({ name: 'MainPage' });
    };
    return { goToSecondPage };
  },
};
</script>

<style>
.home {
  text-align: center;
  padding: 50px;
}
</style>