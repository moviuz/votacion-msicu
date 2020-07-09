<template>
    <v-row row wrap justify="center" class=" align-center fill-height" no-gutters>
        <v-col cols="12" class="text-center pa-5 " >
          <img class="cincel-logo" width="130px" src="/cincel/CINCEL-LOGO-MINI.png" alt />
          <v-row  justify="center">
            <v-col cols="12" sm="10" md="7" lg="5" xl="4">
              <v-card class="mt-5">
                <v-card-text class="pa-0">
                  <Login @submitForm="Login" :loading="loading"></Login>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
     

</template>

<script>
import Login from '~/components/security/Login'

export default {
  layout:"empty",
  name:'login',
  components: {
    Login,
  },
  fetch(){
    sessionStorage.clear();
  },
  data(){
      return {
          loading:false,
      }
  },
  methods:{
      async Login(e){
        this.loading = true;
        let response = await this.$store.dispatch('auth/login',e);
        this.loading = false;
     }
  }
}
</script>
