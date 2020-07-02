<template>

	<v-card class="mt-5">
	  <v-card-text>
      <v-layout row wrap>
        <v-flex xs12 md12 class="px-2">
          <h4>Tu correo está siendo validado</h4>
        </v-flex>
      </v-layout>
	  </v-card-text>
	</v-card>

</template>

<script>
import {post} from '~/assets/js/helpers'
export default {
  
  name: 'MailValidation',
  props: ["token"],

  data() {
  	return{
  		loading: false,
  	}
  },

  mounted(){
    let vueContext = this
    setTimeout(async ()=>{      
      await vueContext.validate()
    })
  },
  methods:{
    async validate(){
      if(!this.token){
        this.$store.dispatch("alerts/addSuccessAlert",{
          id:Math.floor(Math.random() * (100-1)+1),
          name:"Error:",
          text: "Token inexistente",
          active:true
        });
        return
      }
      try{        
        await post(this, '/user/signup', this.user)
        this.$store.dispatch("alerts/addSuccessAlert",{
          id:Math.floor(Math.random() * (100-1)+1),
          name:"Éxisto:",
          text: "Se validó el correo exitósamente",
          active:true
        });
      }
      catch(e){
        //Falta generar alerta de error
        this.$store.dispatch("alerts/addSuccessAlert",{
          id:Math.floor(Math.random() * (100-1)+1),
          name:"Error:",
          text: e.message,
          active:true
        });
      }
    }
  }
};
</script>

<style lang="css" scoped>
</style>
