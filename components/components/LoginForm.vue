<template>

	<v-card class="mt-5">
	  <v-card-text>
	     <v-form @submit.prevent="loggin" v-model="valid" ref="form">
          <v-layout row wrap>
            <v-flex xs12 md12 class="px-2">
              <v-text-field
              @keydown.space.prevent
              	type="email"
                label="E-mail"
                v-model="Mail"
                :rules="[rules.required,rules.email]"
                required
              ></v-text-field>
              <div class="input-error error--text">{{errors.Mail}}</div>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 md12 class="px-2">
              <v-text-field
              	
                :append-icon-cb="() => {passwordVisible = !passwordVisible}"
                :type="passwordVisible ? 'text' : 'password'"
                label="Contraseña"
                v-model="Password"
                :rules="[rules.required, rules.minLength(6,'La contraseña debe tener al menos  6 caracteres')]"
                required
              ></v-text-field>
              <div class="input-error error--text">{{errors.Password}}</div>
            </v-flex>
          </v-layout>
          
          <v-btn
          	:loading="loading" 
          	type="submit"
            :disabled="!valid"
            color="primary"
            >Login</v-btn> &nbsp;  <v-btn small text class="primary--text float-right " >Olvidé mi contraseña </v-btn>
        </v-form>
        <v-layout row wrap>
          <v-flex xs12 md12 class="px-2 text-center">
            <br>  
            
            <span class="title" >
                ¿No tienes cuenta? &nbsp;
            </span> 
            <span>
              <v-btn class="primary" nuxt link to="/register" exact> Registrate </v-btn>  
            </span>
            <nuxt-link v-if="false" to="/register/"> Registrarse </nuxt-link>
          </v-flex>
        </v-layout>
      </v-flex> 
	  </v-card-text>
	</v-card>
</template>

<script>
import rulesObj from '~/assets/js/rules'
import {post} from '~/assets/js/helpers'
export default {
  
  name: 'LoginForm',

  data() {
  	return{
  		loading: false,
  		valid: false,
          Password: '',
          passwordVisible: false,
          Mail: '',
          errors:{
          	Mail: null,
            Password: null,
          },
          rules: rulesObj
  	}
  },
  methods:{
    async loggin(){
      try{
        await post(this,"/user/signin", {Mail: this.Mail, Password: this.Password})
        this.$router.push("/client/home")
      }
      catch(e){
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
