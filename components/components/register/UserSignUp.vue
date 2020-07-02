<template>

	<v-card class="mt-5">
	  <v-card-text>
	     <v-form @submit.prevent="register" v-model="valid" ref="form">
          
          <v-layout row wrap>
            <v-flex xs12 md12 class="px-2">
              <v-text-field
                type="text"
                label="Nombre"
                v-model="user.Name"
                :rules="[rules.required]"
                required
              ></v-text-field>
              <div class="input-error error--text">{{errors.Name}}</div>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex xs12 md12 class="px-2">
              <v-text-field
                type="text"
                label="RFC"
                v-model="user.RFC"
                :rules="[rules.required]"
                required
              ></v-text-field>
              <div class="input-error error--text">{{errors.RFC}}</div>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex xs12 md12 class="px-2">
              <v-text-field
              	type="email"
                label="E-mail"
                v-model="user.Mail"
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
                v-model="user.Password"
                :rules="[rules.required]"
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
            >Registrarse</v-btn>
        </v-form>
	  </v-card-text>
	</v-card>

</template>

<script>
import rulesObj from '~/assets/js/rules'
import {post} from '~/assets/js/helpers'
export default {
  
  name: 'UserSignUp',

  data() {
  	return{
  		loading: false,
  		valid: false,
      user: {},
      errors:{
      	Name: null,
        RFC: null,
        Mail: null,
        Password: null
      },
      passwordVisible: false,
      rules: rulesObj
  	}
  },
  methods:{
    async register(){
      try{
        await post(this, '/user/signup', this.user)
        this.$store.dispatch("alerts/addSuccessAlert",{
          id:Math.floor(Math.random() * (100-1)+1),
          name:"Éxito: ",
          text: "Registro correcto.",
          active:true
        });
      }
      catch(e){
        //Generar alerta
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
