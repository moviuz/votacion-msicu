<template>
    <v-dialog
      persistent
      content-class="upgrade-dialog"
      v-model="open" >
        <v-card>
            <v-card-text class="pt-3">
                <v-row justify="center" row wrap v-if="info.type == 'plans'">
                  <v-col cols="12" class="form-title text-center" >
                    <slot name="upgrade-message " >
                       Esta accion requiere de un tipo de cuenta mas avanzado
                    </slot>

                  </v-col>
                  <v-col cols="12" sm="4" >
                    <v-btn class="cincel-yellow-btn" block nuxt-link exact to="/client/plans?upgrade=true">
                      Ver Planes
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row justify="center" row wrap v-if="info.type == 'documents'">
                  <v-col cols="12" class="form-title text-center" >
                    <slot name="upgrade-message " >
                       Haz agotado el limite de documentos para tu cuenta
                    </slot>

                  </v-col>
                  <v-col cols="12" sm="6" >
                    <v-btn class="cincel-yellow-btn" block nuxt-link exact to="/client/plans/documents?upgrade=true">
                      Ver paquetes de documentos
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row justify="center" row wrap v-if="info.type == 'users'">
                  <v-col cols="12" class="form-title text-center" >
                    <slot name="upgrade-message " >
                       Haz agotado el numero de usuarios permitido
                    </slot>

                  </v-col>
                  <v-col cols="12" sm="6" >
                    <v-btn class="cincel-yellow-btn" block nuxt-link exact to="/client/plans/users?upgrade=true">
                      Ver planes de usuarios
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row justify="center" row wrap v-if="info.type == 'loading'">
                  <v-col cols="12" class="form-title text-center" >
                    <v-progress-circular indeterminate=""
                      size="70" color="yellow accent-4" ></v-progress-circular>
                  </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn color="error" @click="close"> Cerrar </v-btn>  
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>


export default {
  name: 'ContentDialog',
  props: {
    open: Boolean,
    info: Object,
  },
  components:{
   
  },
  data() {
    return {

    };
  },
  methods:{
  	close(){
      this.$store.dispatch('alerts/closeUpgradeAlert',{});
  		//this.$emit('Closing',false);
  	}
  }
};
</script>

<style lang="css" >
.upgrade-dialog {
  width:600px;
  border-radius: 0px!important;
  box-shadow: none !important;
}
</style>
