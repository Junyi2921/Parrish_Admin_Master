<template>
    <span ref="countup"></span>
</template>
<style>

</style>
<script>
    import Countup from 'countup.js'
    export default{
        props : {
            start : {
                type : Number, default : 0
            }, end : {
                type : Number, default : 2017
            }, decimal : {
                type : Number, default : 0//小数
            }, duration : {
                type : Number, default : 2.5//持续时间
            }, options : {
                type : Object
            }
        }, data(){
            return {
                numAnim : null
            }
        }, mounted(){
            this._initCountup()
        }, methods : {
            _initCountup(){
                this.numAnim = new Countup( this.$refs.countup, this.start, this.end, this.decimal, this.duration, this.options )
                this.numAnim.start()
            }
        }
    }
</script>
