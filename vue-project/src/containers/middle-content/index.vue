<template>
    <div>
        <div class="form-search">
            fl 筛选查询  <div class="form-search-sty m-right-20 "><el-button type="text">展开筛选</el-button><el-button class="m-left-10">查询结果</el-button></div>
        </div>
        <div class="form-search-detail">
            <div class="">
                <el-button class="btnText p-right-40" type="text" v-for="item in detail_1" :key="item" >{{item}}</el-button>
            </div>    
            <div class="">
                <el-button class="btnText p-right-40" type="text" v-for="item in detail_2" :key="item" >{{item}}</el-button>
            </div>
            <div class="">
                <el-button class="btnText p-right-40" type="text" v-for="item in detail_3" :key="item" >{{item}}</el-button>
            </div>
        </div>
        <div class="form-term ">
            搜索选项 : <el-input size="large"  placeholder="请输入内容" class="repeat-el-input" > </el-input><el-input size="large"  placeholder="请输入内容" class="repeat-el-input"> </el-input><el-button class="m-left-10">默认按钮</el-button>
        </div>
        <router-view/>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                detail_1:["全部","综艺","音乐","搞笑","二次元"],
                detail_2:["全部","大陆","欧美","日本","韩国"],
                detail_3:["全部","　男","　女","组合"]
            }
        }

    }

</script>
<style scoped>

</style>