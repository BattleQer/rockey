<script>
    import render from 'render/menu';
    import menuData from '@/assets/script/navMenu.js';
    export default {
        render(c) {
            return render(c, {
                menuData,
                option: {
                    class: 'header',
                    props:{
                        mode: 'horizontal',
                        defaultActive: '0',
                    },
                    on: {
                        select(key, keyPath) {
                            console.log(key, keyPath);
                        }
                    }
                }
            })
        }
    }
</script>
<style lang="stylus">
    .header
        background-color rgba(70, 76, 91, .8);
        &.el-menu--horizontal>.el-submenu .el-menu-item
            color #111

        &.el-menu--horizontal>.el-menu-item,&.el-menu--horizontal>.el-submenu>.el-submenu__title
            color white;
            border: 0;
        &.el-menu--horizontal>.el-menu-item:hover,&.el-menu--horizontal>.el-submenu>.el-submenu__title:hover
            background-color rgba(70, 76, 91, .5)
            border: 0;
            color white;
        .nav-index .el-menu-item
            font-size: 24px;


</style>