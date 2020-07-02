<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <div class="mt-5">
          <v-form @submit.prevent="recovery" v-model="valid" id="recovery-container">
            <v-row justify="center">
              <v-col cols="12" sm="10" md="6">
                <v-card>
                  <v-card-text>
                    <label for class="label">
                      Correo
                      <span class="red--text">*</span>
                    </label>
                    <v-text-field
                      v-model="email"
                      name="email"
                      type="email"
                      :rules="[rules.required, rules.email]"
                      placeholder="Ingresa tu correo"
                      outlined
                    ></v-text-field>
                    <div class="text-center">
                      <v-btn
                        :loading="loading"
                        :disabled="!isDisabled"
                        class="cincel-yellow-btn"
                        type="submit"
                      >Recuperar contraseña</v-btn>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import rules from "~/assets/js/rules";
import parser from "~/assets/js/parsersApi";
import { post } from "~/assets/js/helpers";
export default {
  components: {},
  data() {
    return {
      email: "",
      valid: false,
      rules,
      loading: false
    };
  },
  computed: {
    isDisabled() {
      if (this.validEmail(this.email)) {
        return true;
      }
    }
  },
  methods: {
    async recovery() {
      this.loading = true;
      let recoveryMail = await this.$store.dispatch("auth/recoveryMail", {
        email: this.email
      });
      this.loading = false;
    },
    validEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  }
};
</script>

<style lang="css" scoped>
</style>