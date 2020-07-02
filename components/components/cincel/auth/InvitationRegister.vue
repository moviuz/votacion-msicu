<template>
  <div class="mt-5">
    <v-row justify="center">
      <v-col cols="12" sm="7" md="5">
        <v-card>
          <v-card-text>
            <div class="display-1 mb-4">Registro</div>
            <v-form @submit.prevent="register" v-model="valid">
              <div v-if="!not_show">
                <label class="label">
                  Email
                  <span class="red--text">*</span>
                </label>
                <v-text-field
                  class="login-field"
                  v-model="credentials.email"
                  :rules="[rules.required ,rules.email]"
                  placeholder="Ingresa tu email"
                  outlined
                ></v-text-field>
              </div>
              <label class="label">
                Nombre
                <span class="red--text">*</span>
              </label>
              <v-text-field
                class="login-field"
                v-model="credentials.name"
                :rules="[rules.required]"
                placeholder="Ingresa tu nombre"
                outlined
              ></v-text-field>
              <label class="label">
                RFC
                <span class="red--text">*</span>
              </label>
              <v-text-field
                class="login-field"
                placeholder="Ingresa tu RFC"
                outlined
                :rules="[rules.required]"
                min="8"
                v-model="credentials.rfc"
              ></v-text-field>
              <label class="label">
                Contraseña
                <span class="red--text">*</span>
              </label>
              <v-text-field
                class="login-field"
                placeholder="Ingresa tu contraseña"
                outlined
                :rules="[rules.required,rules.minLength(6, 'La contraseña debe de tener al menos 6 caracteres')]"
                min="8"
                type="password"
                v-model="credentials.password"
              ></v-text-field>
              <label class="label">
                Confirmación de contraseña
                <span class="red--text">*</span>
              </label>
              <v-text-field
                class="login-field"
                placeholder="Confirmación de  tu contraseña"
                outlined
                :rules="[rules.required,rules.minLength(6, 'La contraseña debe de tener al menos 6 caracteres')]"
                type="password"
                v-model="password_confirmation"
              ></v-text-field>
              <v-checkbox v-model="checked">
                <template v-slot:label>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <a
                        href="/Terminosycondiciones.pdf"
                        target="_blank"
                        @click.stop
                        v-on="on"
                      >Acepto términos y condiciones</a>
                    </template>
                    Abrir en una nueva ventana
                  </v-tooltip>
                </template>
              </v-checkbox>

              <div class="text-center mt-2">
                <v-btn
                  class="cincel-yellow-btn"
                  :loading="loading"
                  
                  type="submit"
                  variant="primary"
                  :disabled="(loading || !valid) || credentials.password !== password_confirmation || !isDisabled || !checked"
                >Registrarme</v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { post } from "~/assets/js/helpers";
import rules from "~/assets/js/rules";
import parser from "~/assets/js/parsersApi";
import userAvatar from "~/assets/js/userAvatar.js";

export default {
  props: {
    email: "",
    name: ""
  },
  components: {},
  mounted() {
    this.credentials.organization_invitation_token = this.$route.params.id;
  },
  data() {
    return {
      credentials: {
        organization_invitation_token: null,
        avatar: userAvatar.image
      },
      password_confirmation: "",
      loading: false,
      valid: false,
      not_show: false,
      rules,
      checked: false
    };
  },
  methods: {
    async register() {
      //console.log("VALOR URL %o", this.credentials.invitation_id);
      //console.log("VALOR CREDENCIALES %o", this.credentials);
      if (this.valid) {
        this.loading = true;
        let registerA = await this.$store.dispatch(
          "auth/register",
          this.credentials
        );
        this.loading = false;
      }
    },
    validEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    openTab: function() {
      window.open(
        "https://docs.google.com/document/d/1FYZK97n5zjsQ5Rp_q2YUw5WN5GwrcJFM87UNYTjmZIs/edit#heading=h.2df7iatxr2yi",
        "_blank"
      );
    }
  },
  computed: {
    //en caso de que provenga de un link de invitacion,
    isDisabled() {
      if (this.validEmail(this.credentials.email)) {
        return true;
      }
    }
  }
};
</script>
<style lang="css" scoped>
</style>