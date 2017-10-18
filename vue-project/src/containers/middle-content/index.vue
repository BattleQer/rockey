<template>
    <div>
        <div class="form-search">
            fl 筛选查询
        </div>
        <div class="form-term ">
            搜索选项 : <el-input size="large"  placeholder="请输入内容" > </el-input><el-input size="large"  placeholder="请输入内容" > </el-input><el-button class="m-left-10">默认按钮</el-button>
        </div>
        <router-view/>
    </div>
</template>
<script>
    export default {}
</script>
<style scoped>
</style>