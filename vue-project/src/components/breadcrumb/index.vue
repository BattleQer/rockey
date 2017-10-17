<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in $route.matched" :key="item.path" :to="item.path">{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script>
    export default {

    }
</script>