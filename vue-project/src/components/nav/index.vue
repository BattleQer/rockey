<script>
    import render from 'render/menu';
    import menuData from '@/assets/script/navMenu.js';
    export default {
        render(c) {
            return render(c,{
                menuData,
                option: {
                    class: 'menu',
                    props:{
                        defaultActive: '1',
                    },
                    on: {
                        select (key, keyPath) {
                            console.log(key, keyPath);
                        }
                    }
                }
            })
        }
    }
</script>
<style lang="stylus" scoped>
    .menu
        height 100%
        .nav-index
            font-size 24px
</style>