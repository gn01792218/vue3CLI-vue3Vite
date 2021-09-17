<template>
   <div id="nav">
    <div class="lognav">
    <h2>LOGO HERE</h2>
    <div>
        <router-link to="/practice">Practice</router-link>
    </div>
    <div>
        <router-link to="/">回大廳</router-link> 
    </div>
    </div>
    <div class="info">
        
    </div>
  </div>
 
</template>

<script>
export default {

}
</script>

<style lang="scss" scope>
    #nav{
        // height:100vh;
    }
    .info{
        position:absolute;
        bottom:0;
        height:100px;
        width:100px;
        background-color: red;
    }

</style>