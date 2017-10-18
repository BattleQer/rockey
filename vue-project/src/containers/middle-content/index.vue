<template>
    <div>
        <div class="form-search">
            fl 筛选查询  <div class="form-search-sty m-right-20 "><el-button type="text">展开筛选</el-button><el-button class="m-left-10">查询结果</el-button></div>
        </div>
        <div class="form-term ">
            搜索选项 : <el-input size="large"  placeholder="请输入内容" style="width:400px;display:inline;margin-left:10px" > </el-input><el-input size="large"  placeholder="请输入内容" style="width:400px;display:inline;margin-left:10px"> </el-input><el-button class="m-left-10">默认按钮</el-button>
        </div>
        <router-view/>
    </div>
</template>
<script>
    export default {}
</script>
<style scoped>
</style>