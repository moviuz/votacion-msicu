<template>
  <v-row no-gutters>
    <v-col cols="12" v-if="formated.length > 0">
      <v-row>
        <v-col cols="4" sm="4" class="form-label">Nombre</v-col>
        <v-col cols="4" sm="4" class="form-label">Estado</v-col>
        <v-col sm="2" class="form-label" v-if="currentBreakpoint != 'xs'">Fecha</v-col>
        <v-col cols="2" sm="2" class="form-label"></v-col>
      </v-row>
    </v-col>
    <v-col cols="12" v-for="doc in formated" :key="doc.id">
      <v-row >
        <v-col cols="12" class="py-0">
          <v-divider> </v-divider>
        </v-col>
        <v-col cols="4" sm="4">
            {{doc.name}}
        </v-col>
        <v-col cols="4" sm="4">
          <v-icon :color="doc.statusColor">mdi-circle-medium</v-icon>
          {{ doc.statusLastFile}}
        </v-col>
        <v-col cols="2" v-if="currentBreakpoint != 'xs'">
             {{ doc.created_at.substr(0,10) }}
        </v-col>
        <v-col cols="2" sm="2" class="text-right">
        <v-btn small class="cincel-yellow-btn" nuxt link :to="'/documents/'+doc.id+'/show'">
            ver
        </v-btn>
        </v-col>
        
      </v-row>
    </v-col>
    <v-col cols="12" class="text-center pt-4" v-if="formated.length == 0">
      <div class="form-title pb-2">
        No hay documentos creados.
      </div>
        <v-btn class="cincel-yellow-btn" nuxt link to="/documents/upload">Crear documento</v-btn>
    </v-col>
    <v-col cols="12" class="text-center pt-2"  v-if="formated.length < 3 && formated.length > 0 ">
      <v-btn class="cincel-yellow-btn" nuxt link to="/documents/upload">
        Crear documento
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import {
  statusString,
  signersOfLastVersion,
  statusOfFile,
  statusColor
} from "~/assets/js/helpers";
import {CommonMixins} from "~/mixins/Common"
export default {
 props: {
   documents:{
     type:Array,
     default:function(){return []},
   },
   loading:{
     type:Boolean,
     default:false
   }
 },
 mixins:[CommonMixins],
 mounted() {
     
    let unformated = [...this.documents];
    for (let i = 0; i < unformated.length; i++) {
      let documento = {
        ...unformated[i],
        statusLastFile: statusString(unformated[i].status),
        statusColor: statusColor(unformated[i].status),
        owner: ""
      };
      this.formated.push(documento);
      //console.log(documento);
    
    }
    
  },
  data(){
      return {
        formated: [],
        statusString,
        signersOfLastVersion,
        headers: [
            { text: "Nombre ", value: "name", sortable: false, width: 300 },
            {
            text: "Estado",
            value: "statusLastFile",
            sortable: false,
            width: 250
            },
            { text: "Descripción", value: "name", sortable: false },
            { text: "Fecha", value: "date", sortable: false, width: 120 },
            { text: "", value: "actions", sortable: false, width: 50 }
        ],

      }
  },
  methods:{
    
  },
  computed:{

  }

}
</script>

<style>

</style>