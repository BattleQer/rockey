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
        components: {
            //headComponent,
            navComponent,
            breadcrumbComponent
        }
    }
</script>
<style lang="stylus" scoped>

</style>