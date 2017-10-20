<template>
    <el-table ref="multipleTable" :data="tableData.dataList" border tooltip-effect="dark" style="width: 100%" @selection-change="selectCallback">
        <el-table-column v-if="tableData.tableSelect" type="selection" fixed="left"/>
        <component v-for="item in tableData.tableHead" :key="item.name" v-bind:is="item.componentName||'tableDefault'" :init="item"></component>
        <el-table-column v-if="tableData.tableCtrl" label="操作">
            <template slot-scope="scope">
                <el-button v-for="item in tableData.tableCtrl.ctrlList" :key="item.key" :type="item.type" @click="ctrlCallback(scope.row,scope.$index,item.key)">{{item.name}}</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
<script>
    import Vue from 'vue';
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
        components: {
            tableDefault: Vue.component('tableDefault',{
                props: {
                    init: {
                        type: Object,
                        defalut: {}
                    },
                },
                template: '<el-table-column :prop="init.prop" :label="init.label"></el-table-column>'
            })
        },
        created() {
            let components = this.tableData.tableComponent;
            components&&components.forEach((v)=> {
                this.$options.components[v.name] = v.component
            });
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
