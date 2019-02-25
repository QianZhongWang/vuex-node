<template>
    <div id="home">
        <h1>{{userName}}</h1>
    </div>
</template>
<script>
import {mapState} from "vuex"
export default {
    name:"home",
    data(){
        return{

        }
    },
    computed:{
        ...mapState(["userName"])
    }
}
</script>
<style scoped>

</style>

