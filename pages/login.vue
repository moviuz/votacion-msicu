<template>
  <div>
      <Login @submitForm="Login" :loading="loading"></Login>
  </div>
</template>

<script>
import Login from '~/components/security/Login'

export default {
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
