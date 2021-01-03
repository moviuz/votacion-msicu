<template>
    <v-row row wrap justify="center" class=" align-center fill-height" no-gutters>
        <v-col cols="12" class="text-center pa-5 " >
          <img class="cincel-logo" width="130px" src="/cincel/CINCEL-LOGO-MINI.png" alt />
          <v-row  justify="center">
            <v-col cols="12" sm="10" md="7" lg="5" xl="4">
              <v-card class="mt-5">
                  <nuxt/>
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
  sockets:{
      connect: function(){
          console.log("Clint IO connected")
      },
      customEmit: function(data){
          console.og('ni ptaidea')
      }
  },
  mounted(){
      this.$socket.on('user-connected', response => {console.log('conectado')})
  },
  data(){
      return {
          loading:false,
      }
  },
  methods:{
      async Login(e){
        this.loading = true;
        console.log(e.switchPath)
        console.log(e)
        if (e.switchPath === 1){ 
        let responseRegister = await this.$store.dispatch('auth_ask/register', e);
        }else{
        let responseLogin = await this.$store.dispatch('auth_ask/tryLogin', e);
        }
        //
        this.loading = false;
     }
  }
}
</script>
