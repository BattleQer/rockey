<script>
    import render from 'render/menu'
    import menuData from '@/assets/script/nav-menu.js'
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
                        select: (key, keyPath)=> {
                            console.log(keyPath);
                            keyPath.length>1&&this.$router.push(keyPath.reduce(function(sum, value) {
                                return sum + '/'+value;
                            }))
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
        color:#fff
        font-size:24px
        .nav-index
            font-size 24px
</style>