<template>
    <div>
        <!--<head-component/>-->
        <div>
            <div class="nav">
                <div class="nav-logo el-menu">
                    直播间管理 
                </div>
                <div class="nav-menu" >
                    <nav-component/>
                </div>
            </div>
            <div class="form">
                <div class="form-title">
                    <el-dropdown class="downMeun m-right-40">
                      <span class="el-dropdown-link p-left-30">
                        下拉菜单<i class="el-icon-caret-bottom el-icon--right p-left-50"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown" >
                        <el-dropdown-item v-for="item in $store.state.data.list" :key="item">{{item}}</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div class="form-nav">
                    <breadcrumb-component/>
                </div>
                <div class="form-body">
                    <router-view/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    //import headComponent from 'components/header';
    import navComponent from 'components/nav';
    import breadcrumbComponent from 'components/breadcrumb';
    export default {
        data() {
            return {
                activeList:["经纪之声","今日财经","奔跑吧兄弟"]
            }
        },
        components: {
            //headComponent,
            navComponent,
            breadcrumbComponent
        },
        mounted() {
            this.$store.dispatch('data/init',this.activeList)
            console.log(this.$store.state.data.list)
        }
    }
</script>
<style lang="stylus" scoped>

</style>