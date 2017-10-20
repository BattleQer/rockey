<template>
    <el-table ref="multipleTable" :data="tableData.dataList" border tooltip-effect="dark" style="width: 100%" @selection-change="selectCallback">
        <el-table-column v-if="tableData.tableSelect" type="selection"/>
        <el-table-column v-for="item in tableData.tableHead" :prop="item.prop" :label="item.label" :key="item.name"/>
        <el-table-column v-if="tableData.tableCtrl" label="操作">
            <template slot-scope="scope">
                <el-button v-for="item in tableData.tableCtrl.ctrlList" :key="item.key" :type="item.type" @click="ctrlCallback(scope.row,scope.$index,item.key)">{{item.name}}</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
<script>
    export default {
        props: {
            tableData: {
                type: Object,
                default: {
                    dataList: [],
                    tableHead: []
                },
                required: true
            }
        },
        methods: {
            ctrlCallback() {
                let table = this.tableData,
                    ctrl = table.tableCtrl;
                ctrl&&ctrl.callback&&ctrl.callback.apply(this,arguments);
            },
            selectCallback() {
                let table = this.tableData,
                    select = table.tableSelect;
                select&&select.callback&&select.callback.apply(this,arguments);
            }
        }
    }
</script>