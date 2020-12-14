<template>
  <v-card class="elevation-0 transparent"  >
    <v-card-text class="">
      <v-row no-gutters justify="center" >
        <v-col class="" cols="12" sm="10" md="7">
          <div class="text-center title cincel-yellow" color>¡Bienvenido!</div>
          <div class="text-center title font-weight-bold">Ingresa tus datos</div>
        </v-col>
        <v-row no-gutters row wrap justify="center">
        <v-col cols="9"  class="pb-2">
        <br>
        <v-tabs
          v-model="selectedPeriod"
          background-color="white"
          color="accent-4 text--accent-4"
          centered
          grow
          class="tab-container"
          hide-slider
          small
        >
          <v-tab
            v-for="i in type"
            :key="i.name"
            active-class="tab-on"
            style="text-transform: none"
          >
            {{ i.str }}
          </v-tab>
        </v-tabs>
      </v-col>
        </v-row>
        <v-col cols="12" sm="9" md="8">
          <v-form @submit.prevent="login" v-model="valid" id="login-container">
            <v-row no-gutters>
                <v-col v-if="selectedPeriod!==0">
                <label class="login-label">
                  Nombre
                  <span class="red--text">*</span>
                </label>
                <v-text-field
                  class="login-field"
                  placeholder="Ingresa tu nombre"
                  outline
                  name="nombre"
                  :rules="[rules.required]"
                  v-model="nombre"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="py-3">
                <label class="login-label">
                  Correo
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
                <div class="text-center">
                  <v-btn
                    class="cincel-yellow-btn"
                    :loading="loading"
                    color
                    
                    variant="primary"
                    :disabled="!valid"
                    @click="login"
                  > <span v-if="selectedPeriod===0">Iniciar sesión</span> <span v-else>Registrarme</span></v-btn>
                </div>

              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import rules from "~/assets/js/rules";

export default {
  props:{
      loading:{
          type:Boolean,
          default: false,
      }
  },
  components: {},
  data() {
    return {
      email: "",
      password: "",
      nombre:"",
      valid: false,
      type:[{id:1, values:"login", str:"Login"}, {id:2, values:"registro", str:"Registro"}],
      rules,
      selectedPeriod:0
    };
  },
  methods: {
    async login() {
      if (this.valid) {
        this.$emit('submitForm',{
          email: this.email,
          password: this.password,
          name: this.nombre,
          switchPath:this.selectedPeriod
        });
      }
    }
  }
}
</script>
<style lang="css" scoped>
.tab-on {
  background-color: white;
  color: #000;
  font-weight: bold;
}

.tab-container {
  background-color: #d8d8d8;
  border-radius: 40px;
  overflow: hidden;
  padding: 4px;
}
.tab-container > .v-tabs-bar,
.v-tabs > .v-tabs-bar {
  height: 36px !important;
  background-color: #d8d8d8 !important;
}
.v-tab--active {
  border-radius: 40px;
  overflow: hidden;
  box-shadow: 1px 2px 9px 0 rgba(0, 0, 0, 0.2) !important;
}

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
