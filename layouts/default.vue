<template>
  <v-app  :light="true">
    <v-app-bar
      
      class="blue"
      :clipped-left="clipped"
      :fixed="fixed"
      :absolute="!fixed"
      app
      elevate-on-scroll
    >
        <v-avatar
         color="orange"> 
            <span class="white--text headline"> S </span>
        </v-avatar>
        <span> Sistema de preguntas GRUGRU</span>
        <v-spacer ></v-spacer>
        <v-btn @click="crearEncuesta">Crear encuesta</v-btn>
        <DialogPreguntas @closeDialog="closeDialog" @createSurvey="createSurvey" :dialog="dialog"></DialogPreguntas>
        <div>
        </div>
    </v-app-bar>
    <v-main class="bgCincel">
      <AlertCard></AlertCard>
      <nuxt/>
    </v-main>

  </v-app>
</template>

<script>

import {mapMutations} from 'vuex'
import DialogPreguntas from '~/components/ask/dialogPreguntas'
export default {
  components:{
      DialogPreguntas
  },

  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: true,
      miniVariant: true,
      dialog: false,   
    }
  },
  methods:{
      ...mapMutations(['setSurvey']), 
      crearEncuesta(){
          this.dialog =  true;
      },
      closeDialog(){
          this.dialog = false;
      },
    createSurvey(data){
        this.$socket.client.emit('newMessage', {data:data})

        this.dialog = false;
        let  survey = {
         consulta1:data.consulta1,
        consulta2:data.consulta2,
        consulta3:data.consulta3,
        pregunta:data.pregunta
        } 
        this.setSurvey(survey)
    },
    
  },
    sockets: {
        connect: function () {
            console.log('socket connectedaaa')
        },
        customEmit: function (data) {
            console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
        }
  },
  computed:{
    isLoggedin(){
      return this.$store.getters['auth/isAuthenticated'];
    },
  }
}
</script>
<style lang="css" >
  .v-toolbar__content{
    height: 100%!important;
  }
</style>
