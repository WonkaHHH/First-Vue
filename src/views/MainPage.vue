<template>
  <el-button type="primary" @click="goToHomePage">Go Back to Home Page</el-button>
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