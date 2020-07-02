<template>
  <v-card class="elevation-5">
    <v-card-text class="pb-6">
      <v-row no-gutters justify="center" class>
        <v-col class="text-center" cols="12" sm="10" md="7">
          <div class="title cincel-yellow" color>¡Bienvenido!</div>
          <div class="title font-weight-bold">Ingresa tus datos</div>
        </v-col>
        <v-col cols="11" sm="9" md="8">
          <v-form @submit.prevent="login" v-model="valid" id="login-container">
            <v-row no-gutters>
              <v-col cols="12" class="py-3">
                <label class="login-label">
                  Usuario
                  <span class="red--text">*</span>
                </label>
                <v-text-field
                  class="login-field"
                  v-model="email"
                  name="email"
                  :rules="[rules.required]"
                  placeholder="Ingresa tu correo electrónico"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col>
                <label class="login-label">
                  Contraseña
                  <span class="red--text">*</span>
                </label>
                <v-text-field
                  class="login-field"
                  placeholder="Ingresa tu contraseña "
                  outline
                  name="password"
                  :rules="[rules.required]"
                  type="password"
                  v-model="password"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="text-center">
                <p>
                  <nuxt-link
                    nuxt
                    exact
                    to="/cincel/recoveryMail"
                    class="grey--text text--darken-2"
                  >¿Olvidaste tu contraseña?</nuxt-link>
                </p>
                <div class="text-center">
                  <v-btn
                    class="cincel-yellow-btn"
                    :loading="loading"
                    color
                    type="submit"
                    variant="primary"
                    :disabled="!valid"
                  >Iniciar sesión</v-btn>
                </div>
                <br  />
                <span v-if="false">¿No tienes cuenta?</span>  
                <nuxt-link v-if="false" nuxt exact to="/cincel/register/" class="cincel-yellow">Crea una</nuxt-link>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
      <v-form>
        <v-layout align-center justify-center fill-height row wrap>
          <v-flex id="login-box" xs3>
            <div class="text-xs-center">
              <!-- :disabled="loading || !valid" -->
              <v-spacer></v-spacer>
            </div>
          </v-flex>
        </v-layout>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import rules from "~/assets/js/rules";
import parser from "~/assets/js/parsersApi";
export default {
  layout: "LoginLayout",
  components: {},
  data() {
    return {
      email: "",
      password: "",
      loading: false,
      valid: false,
      rules
    };
  },
  methods: {
    /*
    async login() {
      this.loading = true;
      await this.$axios
        .$post("/login", {
          email: this.email,
          password: this.password
        })
        .then(async data => {
          if (data.errors) {
            vuexContext.dispatch(
              "alerts/addErrorAlert",
              parser.errors(data.errors),
              { root: true }
            );
            return;
          }
          await this.$store.dispatch("auth/saveLogin", data);
          this.$router.push("/cincel/home");
        })
        .catch(error => {
          vuexContext.dispatch("alerts/addErrorAlert", error.message || error, {
            root: true
          });
        });
      this.loading = false;
    }
*/
    async login() {
      if (this.valid) {
        this.loading = true;
        let logedIn = await this.$store.dispatch("auth/tryLogin", {
          email: this.email,
          password: this.password
        });
        /*
        console.log(logedIn);
        if (logedIn) {
          console.log("esta logeado");
        } else {
          console.log("no esta logeado");
        }
        */
        this.loading = false;
      }
    }
  }
};
</script>
<style lang="css" scoped>
#login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.login-label {
  color: #949494;
  font-size: 1.1em;
  margin-bottom: 10px;
  display: block;
}
</style>
