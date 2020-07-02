recoveryNewPassword component
<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8">
        <v-form @submit.prevent="recovery" v-model="valid" id="recovery-container">
          <v-card>
            <v-card-text class="pt-5 mt-5">
              <v-row justify="center" no-gutters>
                <v-col cols="11" sm="10">
                  <label class="label">
                    Correo
                    <span class="red--text">*</span>
                  </label>
                  <v-text-field
                    class="recovery-field"
                    v-model="email"
                    :rules="[rules.required, rules.email]"
                    placeholder="Ingresa tu correo"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="11" sm="10">
                  <label class="label">
                    Contraseña nueva
                    <span class="red--text">*</span>
                  </label>
                  <v-text-field
                    class="recovery-field"
                    v-model="password"
                    :rules="[rules.required]"
                    placeholder="Ingresa contraseña"
                    outlined
                    type="password"
                  ></v-text-field>
                </v-col>
                <v-col cols="11" sm="10">
                  <label class="recovery-label">
                    Reperit contraseña
                    <span class="red--text">*</span>
                  </label>
                  <v-text-field
                    class="recovery-field"
                    v-model="password_confirmation"
                    :rules="[rules.required]"
                    placeholder="Ingresa contraseña nuevamente"
                    outlined
                    type="password"
                  ></v-text-field>
                </v-col>
                <v-col cols="11" sm="10" class="text-center mb-5">
                  <v-btn
                    class="cincel-yellow-btn"
                    :loading="loading"
                    :disabled="!email || password != password_confirmation || !password || !password_confirmation"
                    type="submit"
                    variant="primary"
                  >Recuperar contraseña</v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { put } from "~/assets/js/helpers";
import rules from "~/assets/js/rules";
import parser from "~/assets/js/parsersApi";
export default {
  layout: "",
  components: {},
  data() {
    return {
      email: "",
      password: "",
      password_confirmation: "",
      valid: false,
      token: "",
      rules,
      loading: false
    };
  },
  methods: {
    async recovery() {
      this.loading = true;
      await this.$store.dispatch("auth/recoveryMailToken", {
        email: this.email,
        password: this.password,
        token: this.token
      });
      this.loading = false;
    }
  },
  mounted() {
    this.token = this.$route.query.token;
  }
};
</script>

<style lang="css" scoped>
</style>