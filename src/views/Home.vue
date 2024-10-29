<template>
    <div class="home">
        <h1>Home Page</h1>
        <el-button @click="showMessage" type="primary" icon="Check">ElementUI-Plus</el-button>
    </div>
</template>
<script>
import {ElMessage} from 'element-plus'
export default {
    data(){
        return{}
    },
    methods:{
        showMessage(){
            ElMessage({type: 'success',message:'测试成功'})
        }
    }
}
</script>
