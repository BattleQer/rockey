<template>
    <div>
        <!--<head-component/>-->
        <div>
            <div class="nav">
                <nav-component/>
            </div>
            <div class="form">
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
    @import "~styles-var";
    .nav
        position absolute
        top: 0px
        bottom: 0
        width 240px
        overflow auto
    .form
        width auto
        margin-left 240px;
        padding 0 25px;
        .form-nav
            margin-top 25px;
        .form-body
            margin-top 25px;
            width 750px;
            margin-lr-auto();
</style>