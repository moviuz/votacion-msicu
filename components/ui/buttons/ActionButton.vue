<template>
  <v-btn color="action-btn" :small="small" @click="clickedBtn">
      {{text}}
  </v-btn>
</template>

<script>
export default {
  props:{
    to:{
      type:String,
    },
    text:{
      type:String,
      default:'Aceptar',
    },
    small:{
      type:Boolean,
      default:false,
    }
  },
  methods:{
    clickedBtn(){
      if(this.to){
        this.$router.push(this.to);
      } else {
       
        this.$emit('btnClicked');
      }

    }
  }
}
</script>

<style>
.action-btn {
  background-color:#f6c434!important;
  text-transform: none!important;
  box-shadow: none!important;
  font-family: Heebo!important;
  font-weight: bold!important;
}
</style>