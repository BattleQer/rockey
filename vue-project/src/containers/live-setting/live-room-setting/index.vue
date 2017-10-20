<template>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick" class="live-room-setting content">
        <el-tab-pane label="用户管理" name="first">
            <table-cpt :table-data="tableData"/>
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
</template>
<script>
    import tableCpt from 'components/table';
    import numberInput from 'components/number-input';
    export default {
        components: {
            tableCpt
        },
        data() {
            return {
                activeName2: 'first',
                tableData: {
                    tableSelect: {
                        callBack: function() {
                            console.log(arguments)
                        }
                    },
                    tableCtrl: {
                        ctrlList: [{
                            name: '查看',
                            key: 'check',
                            type: 'text'
                        }],
                        callback: function() {
                            console.log(arguments)
                        }
                    },
                    tableComponent: [
                        {
                            name: 'numberInput',
                            component: numberInput
                        }
                    ],
                    selectCallback() {
                        console.log(arguments);
                    },
                    tableHead: [
                        {
                            prop: 'name',
                            label: '姓名'
                        },
                        {
                            prop: 'date',
                            label: '日期',
                        },
                        {
                            prop: 'number',
                            label: '数量',
                            componentName: 'numberInput',
                            callback (data,any) {
                                console.log(arguments)
                            }
                        },
                        {
                            prop: 'address',
                            label: '地址'
                        }

                    ],
                    dataList:[{
                        number: '10',
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        date: '2016-05-02',
                        number: '11',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        date: '2016-05-04',
                        number: '12',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        date: '2016-05-01',
                        number: '13',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        date: '2016-05-08',
                        number: '10',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        date: '2016-05-06',
                        number: '10',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        date: '2016-05-07',
                        number: '10',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }]
                }
            };
        },
        methods: {
            handleClick(tab, event) {
                this.tableData.dataList.push({
                    name: '111',
                    date: '2222-11-11',
                    address: 'klasdjflkas;fk'
                });
                console.log(tab, event);
            },
            fn(){
                let list = document.createElement("div");
                list.id = "test";
                document.querySelector('.content .el-tabs__nav').appendChild(list);
                console.log(document.querySelector('.content .el-tabs__nav'))
            },
            fn2(){
                // let insertText = "<el-button type='primary' :plain='true'  icon='arrow-left'>返回</el-button>"
                let list = document.getElementById("test");
                list.innerHTML="<el-button type='primary' :plain='true'  icon='arrow-left'>返回</el-button>"

                // let text = document.querySelector('.el-tabs__nav').appendChild(list)
                // console.log(text)
            }
        },
        mounted(){
            setTimeout(this.fn(),1000)
            setTimeout(this.fn2(),2000)
        }
    };
</script>
<style lang="stylus">
    .live-room-setting {
        .tab-default {
            padding 0 30px
        }
        &.el-tabs--card {
            .el-tabs__header {
                .el-tabs__item.is-active {
                    border-bottom-color  #f0f0f0
                }
            }
            .el-table {
                border-top: 0;
            }
        }

    }
</style>
