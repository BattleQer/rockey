<template>
    <el-table-column :label="init.label">
        <template slot-scope="scope">
            <el-input-number size="small" v-model="scope.row[init.prop]" @change="init.callback"></el-input-number>
        </template>
    </el-table-column>
</template>
<script>
    export default {
        props: {
            init: {
                type: Object,
                defalut: {}
            }
        },
    }
</script>
<style scoped>

</style>