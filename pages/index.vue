<template>
<v-container>
    <v-row class="fill-height" row wrap justify="center">
        <v-col v-if="survey.control != 1" cols="12" sm="12" md="12" class="px-1 pb-2 fill-height">
            <h1 >No hay encuestas disponibles {{survey.lenght}}</h1>
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
            cols="12"
            sm="6"
            md="6"
          >
            <v-radio-group
              column
              v-model="pregunta"
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
            <v-btn  @click="votar(pregunta)">Votar</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
        </v-form>
        </v-card>
        <v-col cols="12" sm="12" md="4" class=" pl-11 pb-2"></v-col>
    </v-row>
</v-container>

</template>

<script>
import {mapState} from 'vuex'
import AskPanel from  "~/components/ask/ask";
export default {
  middleware:["auth"],
  data(){
      return {
          pregunta:''
      }
  },
  computed: mapState(["survey"]),
  components: {
      AskPanel
  },
  methods:{
      votar(valor){
          console.log('valor pregunta %o',valor)
      }
  },
}
</script>
