<template>
  <div>
    <br />
    <v-row justify="center" no-gutters>
      <v-col cols="12" sm="12" md="6" lg="6" xl="4">
        <v-card>
          <v-card-text>
            <v-form @submit.prevent="update">
              <div class="text-center">
                <img
                  alt="default avatar"
                  v-if="image"
                  :src="image"
                  style="border-radius:75px;"
                  width="150"
                />
                <img
                  alt="default avatar"
                  v-else
                  :src="avatar"
                  style="border-radius:75px;"
                  width="150"
                />
                <image-uploader
                  :maxWidth="320"
                  :quality="0.7"
                  :preview="false"
                  :className="['fileinput', { 'fileinput--loaded' : hasImage }]"
                  :capture="true"
                  accept="image/*"
                  doNotResize="['gif', 'svg']"
                  @input="setImage"
                >
                  <label for="fileInput" slot="upload-label">
                    <v-row justify="center">
                      <v-col cols="6">
                        <v-card class="upload-caption" style="cursor:pointer">
                          <v-card-text>
                            {{
                            hasImage ? "Cambiar imagen" : "Cambiar imagen"
                            }}
                          </v-card-text>
                        </v-card>
                      </v-col>
                    </v-row>
                  </label>
                </image-uploader>
              </div>
              <v-text-field
                outlined
                name="Nombre"
                v-model="name"
                label="Nombre *"
                id="name"
                required
              >{{user }}</v-text-field>
              <v-text-field outlined name="Correo" v-model="email" label="Email" id="mail" disabled></v-text-field>
              <v-text-field
                v-model="organization"
                :rules="[rules.required]"
                label="Tipo de organización *"
                outlined
              >
                <span class>*</span>
              </v-text-field>
              <v-text-field
                v-model="job"
                :rules="[rules.required]"
                label="Puesto de trabajo *"
                outlined
              >
                <span class>*</span>
              </v-text-field>

              <v-text-field outlined label="RFC *" disabled :rules="[rules.required]" v-model="rfc" id="rfc">
                <span class="red--text">*</span>
              </v-text-field>
              <v-text-field outlined name v-model="curp" label="CURP *" id="curp"></v-text-field>

              <div class v-if="false">
                <v-row>
                  <v-col cols="6" class="title">Organizaciones</v-col>
                  <v-col cols="6">
                    <v-btn color="yellow accent-4" nuxt link to="/client/organizations/new/config">
                      <v-icon>mdi-plus</v-icon>&nbsp; Crear organizacion
                    </v-btn>
                  </v-col>
                  <v-col cols="12">
                    <v-list>
                      <v-list-item
                        v-for="organizacion in user.organizations"
                        :key="organizacion.id"
                      >
                        <v-list-item-content>{{organizacion.name}}</v-list-item-content>
                      </v-list-item>
                      <v-list-item v-if="user.organizations.length == 0">
                        <v-list-item-title>No hay organizaciones</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-col>
                </v-row>
              </div>
              <br />
              <v-btn
                color="cincel-yellow-btn"
                type="submit"
                :loading="loading"
                :disabled="!rfc || !organization || !job"
                block
                large
              >Guardar</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import parser from "~/assets/js/parsersApi";
//import { put } from '~/assets/js/helpersApi'
import rules from "~/assets/js/rules";
import userAvatar from "~/assets/js/userAvatar.js";

export default {
  layout: "",
  middleware: ["authentication"],
  components: {
    //ImageUploader
  },
  data() {
    return {
      organizationItem: [
        "Aceleradora",
        "Aseguradoras",
        "Blockchain",
        "Consultoria",
        "Educación",
        "Finanzas",
        "Gobierno",
        "Impacto Social",
        "Industrial",
        "Legal",
        "Marketing",
        "Tecnología",
        "VC",
        "Otro"
      ],
      ASSETS_HOST: process.env.ASSETS_HOST,
      worklevelItem: ["Consultor", "Analista", "Otro"],
      email: "",
      valid: false,
      loading: false,
      name: "",
      password: "",
      rfc: "",
      curp: "",
      username: "",
      file: "",
      avatar: "",
      organization: "",
      job: "",
      image: "",
      hasImage: false,
      rpassword: "",
      rules
    };
  },

  mounted() {
    this.setUserProperties();
  },
  computed: {
    user() {
      //console.log(this.$store.getters["auth/currentUser"]);
      return this.$store.getters["auth/currentUser"];
    }
  },
  methods: {
    async update() {
      this.loading = true;
      let user_info = {
        job: this.job,
        organization_type: this.organization,
        name: this.name,
        curp: this.curp,
        rfc: this.rfc,
        username: this.name
      };
      if (this.image != "") {
        user_info.avatar = this.image;
      }
      let response = await this.$store.dispatch('auth/putUser',user_info,{root:true});
      /*
      await this.$axios
        .$put("/users", user_info)
        .then(async data => {
          if (data.errors && data.errors.length > 0) {
            this.$store.commit(
              "alerts/addErrorAlert",
              parser.errors(data.errors)
            );
            return;
          }
          //this.$store.dispatch("auth/setUser", data.payload, { root: true });
          this.$store.commit(
            "alerts/addSuccessAlert",
            "Actualización exitosa",
            {root:true}
          );
          //this.$router.push('/')
        })
        .catch(error => {
          this.$store.commit("alerts/addErrorAlert", error.message || error);
        });
        */
      this.loading = false;
    },
    setImage: function(output) {
      this.hasImage = true;
      this.image = output;
      //console.log(output);
      //console.log("ARRIBA");
      //console.log(output)
    },
    setUserProperties() {
      if (this.$store.getters["auth/currentUser"].avatar_url !== null) {
        this.hasImage = true;
        this.avatar =
          this.ASSETS_HOST + this.$store.getters["auth/currentUser"].avatar_url;
        //this.image =
      } else {
        this.image = userAvatar;
        this.hasImage = false;
      }

      //console.log(this.$store.getters.user)
      this.name = this.$store.getters["auth/currentUser"].name;
      this.email = this.$store.getters["auth/currentUser"].email;
      if (this.$store.getters["auth/currentUser"].job !== null) {
        this.job = this.$store.getters["auth/currentUser"].job;
      }

      if (this.$store.getters["auth/currentUser"].organization_type !== null) {
        this.organization = this.$store.getters[
          "auth/currentUser"
        ].organization_type;
      }

      this.curp = this.$store.getters["auth/currentUser"].curp;
      if (this.$store.getters["auth/currentUser"].rfc !== null) {
        this.rfc = this.$store.getters["auth/currentUser"].rfc;
      }
    }
  }
};
</script>

<style scoped>
#fileInput {
  display: none;
}
#profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #e7e7e7;
  padding: 100px 0;
  /* #login-box {
    padding: 40px;
    max-width: 600px;
  } */
}

.recovery-label {
  color: #949494;
  font-size: 1.1em;
  margin-bottom: 10px;
  display: block;
}

.profile-image {
  max-width: 150px;
}
</style>