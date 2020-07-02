<template>
  <div :height="panelHeight" style="overflow:hidden">
    <v-row v-if="document.files.length == 1" justify="center">
      <v-col
        cols="10"
        class="title text-center"
      >Para activar esta funcionalidad debes de tener disitnas versiones.</v-col>
    </v-row>
    <v-row>
      <template v-for="f in document.files">
        <v-col cols="12" :key="f.id" v-if="f.id != lastVersionFile.id">
          <v-card class="elevation-0" style="border:1px solid #c0c1c5;border-radius:5px!important">
            <v-card-text class="black--text">
              <router-link
                class="history-link"
                :key="f.id"
                nuxt-link
                :to="'/documents/'+document.id+'/files/'+f.id+'/show'"
              >
                <div class="font-weight-bold">{{document.name}}</div>
                {{f.created_at | dateFilter('full pretty')}}
              </router-link>
            </v-card-text>
          </v-card>
        </v-col>
      </template>
    </v-row>
    <v-row>
      <v-col cols="12" class="text-center" v-if="document.files.length == 1 && !Bloqueado">
        <v-btn
          class="cincel-yellow-btn"
          text
          small
          @click="uploadingNewVersion = !uploadingNewVersion"
        >¿Quieres hacer una nueva versión?</v-btn>
      </v-col>
      <v-col
        cols="12"
        v-if="(!Bloqueado && document.files.length > 1) || (!Bloqueado && uploadingNewVersion)"
      >
        <v-form @submit.prevent v-model="valid">
          <label for class="label black--text">Cargar archivo nuevo</label>

          <v-card class="elevation-1" style="border:solid 1px #c0c1c5 !important">
            <v-card-text>
              <v-input :value="file" hide-details :rules="[rules.required]">
                <input type="file" accept="application/pdf" @change="onFileChange" />
              </v-input>
            </v-card-text>
            <v-card-actions>
              <v-btn
                v-if="valid"
                block
                class="cincel-yellow-btn"
                @click="upload"
                :loading="loading"
                :disabled="loading || !valid "
              >Actualizar</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" v-if="Bloqueado">
        <v-card class="grey lighten-3 elevation-1 text-center">
          <v-card-text
            class="title"
          >No es posible crear nuevas versiones después de firmar el documento</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import rules from "~/assets/js/rules";
import parser from "~/assets/js/parsersApi";
import { post } from "~/assets/js/helpers";

export default {
  name: "DocumentHistory",
  props: [
    "document",
    "lastVersionFile",
    "Bloqueado",
    "document_id",
    "panelHeight"
  ],
  mounted() {
    console.log(this.document);
  },
  data() {
    return {
      uploadingNewVersion: false,
      rules,
      file: "",
      //document: {status:"unsigned"},
      invitation: true,
      loading: false,
      valid: false
    };
  },
  methods: {
    onFileChange(e) {
      this.file = "";
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      var file = files[0];
      const name = file.name;

      if (file) {
        const reader = new FileReader();

        reader.onload = e => {
          this.file = e.target.result;
          //No se si se ocupa el name
          let data = {
            name: name,
            base64: this.file
          };
        };

        reader.readAsDataURL(file);
      }
    },
    async upload() {
      this.loading = true;
      if (!this.document_id) {
        console.log(
          "upload function is trying to create a new file instead a new version"
        );
        /*
        await this.$axios
        .$post(`/users/${this.user.id}/documents`, this.document)
        .then(data => {
          if (!data.ok) {
            this.$store.commit(
              'showErrorNotification',
              parser.errors(data.errors)
            )
            return
          }
          return this.createFile(data.payload.id,this.file, `/documents/${data.payload.id}/addSigners`)
        })
        .catch(error => {
          this.$store.commit('showErrorNotification', error.message || error)
        })
        */
      } else {
        //se creara una nueva version de un doc existente
        await this.createFile(
          this.document_id,
          this.file,
          `/documents/${this.document_id}/show`
        );
      }
      this.loading = false;
    },
    async createFile(document_id, file, redirect_to) {
      await this.$axios
        .$post(`/documents/${document_id}/files`, {
          doc: file,
          status: "unsigned"
        })
        .then(async res => {
          if (!res.ok) {
            this.$store.commit(
              "showErrorNotification",
              parser.errors(res.errors)
            );
            return;
          }
          try {
            let auxFirmante = {
              invite_name: this.user.name,
              invite_email: this.user.email
            };
            if (this.invitation) {
              await post(
                this,
                "users/" +
                  this.user.id +
                  "/documents/" +
                  document_id +
                  "/invitations",
                auxFirmante
              );
            }
          } catch (error) {
            console.log(error);
          }
          this.$emit("reload");
          //this.$emit("SavedFile");
           /*
          this.$router.push(redirect_to);
         
          setTimeout(() => {
            window.location.reload(true);
          }, 3000);
          */
        })
        .catch(error => {
          this.$store.commit("showErrorNotification", error.message || error);
          /*
          this.$emit("reload");
          setTimeout(() => {
            window.location.reload(true);
          }, 4000);
          */
          // this.$router.push(redirect_to)
        });
    },
    CancelUpload() {
      this.$emit("CancelUpload");
    }
  },
  computed: {
    user() {
      return this.$store.getters["auth/currentUser"];
      // anterior return this.$store.getters.user;
    }
  }
};
</script>

<style lang="css" scoped>
.history-link {
  text-decoration: none;
  color: black;
  font-size: 15px;
}
</style>
