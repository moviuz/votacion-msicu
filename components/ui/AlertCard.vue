<template>
<div class="alert-container" >
   <v-alert
      class="cincel-alert"
      v-for="i in AlertsStack"
      :key="i.id"
      dark
      @input="closeAlert(i)"
      dismissible
      elevation="2"
      border="left"
      prominent
      
      :class="i.color"
      :type="i.type"
    >
   
     <span v-if="i.text">{{i.text}}</span>
     <span v-else> Testing alert component!</span>
    </v-alert>
    <v-btn @click="newAlert" v-if="false">
      new 
    </v-btn>     
</div>
</template>

<script>

export default {
    data(){
        return {
           alert: true,
        }
    },
    methods:{
      newAlert(){
        this.$store.dispatch("alerts/addSuccessAlert",
        {
          id:Math.floor(Math.random() * (100-1)+1),
          name:'alert 1',
          active:true,
          //text:'typing text testing',
        });
      },
      closeAlert(thisOne){
        console.log('toggling',thisOne)
      }
    },
    computed:{
      AlertsStack(){
        return this.$store.getters['alerts/activeAlerts'];
      }
    }
}
</script>

<style>
  .alert-container {
    width: 400px;
    z-index: 1000;
    position:fixed;
    top:5px;
    right: 5px!important;
    padding:6px;

   
  }

  .cincel-alert{
    z-index: 2;
    
 
  }

  .corvex-alert {
    width: 100%!important;
    font-size: 13px!important;
  }
</style>