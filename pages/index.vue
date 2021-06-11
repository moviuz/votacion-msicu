<template>
<v-container>
     <v-col  v-if="!survey" cols="12" sm="12" md="12" class="px-1 pb-2 fill-height">
        No hay encuestas disponibles
        </v-col>
    <v-row v-if="survey.control == 1" class="fill-height" row wrap justify="center">
        <v-col  cols="12" sm="12" md="12" class="px-1 pb-2 fill-height">
        </v-col>
        <v-card  >
            <v-form>
                <v-card-title 
                class="headline blue-grey--text pb-0"
                style="display: block; width=100%"  
                >
                {{survey.pregunta}}
                </v-card-title>
                <v-card-text>
                    <v-row>
          <v-col
            cols="6"
          >
            <v-radio-group
              column
              v-model="pregunta"
              :disabled="isDisable"
            >
              <v-radio
                :label="survey.consulta1"
                color="red"
                value="one"
              ></v-radio>
              <v-radio
                 :label="survey.consulta2"
                color="red darken-3"
                value="two"
              ></v-radio>
              <v-radio
                 :label="survey.consulta3"
                color="indigo"
                value="tree"
              ></v-radio>
            </v-radio-group>
          </v-col>
          </v-row>
            </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :disabled="isDisable" @click="votar(pregunta)">Votar</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
        </v-form>
        </v-card>
        <v-col cols="6"  class=" pl-11 pb-2">
            <v-row cols="4" class=" pl-11 pb-2">
          <div> {{survey.consulta1}} : {{votacion1}} </div>
        </v-row>
        <v-row cols="4" class=" pl-11 pb-2">
          <div> {{survey.consulta2}}: {{voto}} </div>
        </v-row>
            <v-row cols="4" class=" pl-11 pb-2">
          <div> {{survey.consulta3}}: {{votacion3}}</div>
        </v-row>
        </v-col>
    </v-row>
</v-container>

</template>

<script>
import {mapState , mapMutations} from 'vuex'
import AskPanel from  "~/components/ask/ask";
export default {
  middleware:["auth"],
  data(){
      return {
          pregunta:''
          //isDisable: false
      }
  },
  computed: mapState(["survey", "votacion1", 'voto', 'votacion3','isDisable']),
  components: {
      AskPanel  
  },
  methods:{
       ...mapMutations(['setVotacion1','setVotacion2', 'setVotacion3', 'setDisable']),
      votar(valor){
          
        
          if (valor == 'one'){
              this.$socket.client.emit('newVote1', 1)
          }
          if (valor == 'two'){
        this.$socket.client.emit('newVote2', 1)
          }if (valor == 'tree'){
        this.$socket.client.emit('newVote3', 1)
          }
          this.setDisable(true)
         // console.log('valor pregunta %o',valor)
      }
  },
}
</script>
