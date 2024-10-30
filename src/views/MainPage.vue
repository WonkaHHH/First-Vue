<template>
  <div class="second-page">
    <h1>Second Page</h1>
    <el-button type="primary" @click="goToHomePage">Go Back to Home Page</el-button>
  </div>
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

<style>
.second-page {
  text-align: center;
  padding: 50px;
}
</style>