<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in $route.matched" :key="item.path" :to="item.path">{{item.name}}</el-breadcrumb-item> <el-button type="primary" :plain="true" class="fr m-right-40 m-top-10 p-right-20" icon="arrow-left">返回</el-button>
    </el-breadcrumb>
</template>
<script>
    export default {

    }
</script>