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
    export default {
        components: {
            tableCpt
        },
        data() {
            return {
                activeName2: 'first',
                tableData: {
                    tableHead: [
                        {
                            prop: 'date',
                            label: '日期'
                        },
                        {
                            prop: 'name',
                            label: '姓名'
                        },
                        {
                            prop: 'address',
                            label: '地址'
                        }

                    ],
                    dataList:[{
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        date: '2016-05-08',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        date: '2016-05-06',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        date: '2016-05-07',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }]
                }
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    };
</script>
<style lang="stylus">
    .live-room-setting {
        margin-top 40px
        .tab-default {
            padding 0 30px
        }
        &.el-tabs--card {
            .el-tabs__header {
                margin-bottom 0;
                .el-tabs__item.is-active {
                    border-bottom-color  #f0f0f0
                }
            }
        }

    }
</style>
