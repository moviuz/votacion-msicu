<template>
  <v-form @submit.prevent="uploadTantra" v-model="valid" class="fill-height">
    <v-card class="fill-height pt-4">
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="12" md="5">
            <div class="mb-5 title font-weight-black black--text">1. Nombra tu documento</div>
            <br />
            <v-row justify="center">
              <v-col cols="11">
                <label class="label font-weight-bold">
                  Nombre del documento
                  <span class="red--text">*</span>
                </label>
                <v-text-field
                  class="field mb-4"
                  v-model="document.name"
                  :rules="[rules.required]"
                  placeholder="Escribe el nombre"
                  outlined
                ></v-text-field>

                <label class="label font-weight-bold">
                  Descripción
                  <span class="red--text">*</span>
                </label>
                <v-text-field
                  class="field"
                  v-model="document.description"
                  :rules="[rules.required]"
                  placeholder="Descripción breve"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>

            <br />
            <div class="mb-5 title font-weight-black black--text">
              2. Carga tu archivo en formato PDF
              <div
                class="body-2 pl-3 grey--text"
              >&nbsp; &nbsp;Selecciona el archivo desde tu computadora</div>
            </div>
          </v-col>
          <v-col cols="7" class="hidden-sm-and-down">
            <v-card class="fill-height" color="grey lighten-5 ">
              <v-card-text v-if="file" class="fill-height pa-0">
                <embed width="100%" class="fill-height" height="100%" :src="file" />
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card class="elevation-0" style="border:solid 2px #c0c1c5">
              <v-card-text style="overflow:auto">
                <v-input
                  :value="file"
                  @click="clearFileLoader "
                  hide-details
                  :rules="[rules.required]"
                >
                  <input type="file" id="files" accept="application/pdf" @change="onFileChange" />
                </v-input>
              </v-card-text>
            </v-card>
            <div class="document-attributes" v-if="!document_id">
              <v-checkbox label="Deseo poder firmar este documento" v-model="invitation"></v-checkbox>
            </div>
          </v-col>
          <v-col cols="12" class="text-center">
            <v-btn
              style="border:solid 1px orange!important"
              large
              outlined
              class="yellow lighten-5 orange--text"
              @click="CancelUpload()"
            >Cancelar</v-btn>&nbsp;&nbsp;&nbsp;
            <v-btn
              large
              class="yellow accent-4"
              type="submit"
              :loading="loading"
              :disabled="loading || !valid "
            >Enviar</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-form>
</template>

<script>
import rules from "~/assets/js/rules";
import parser from "~/assets/js/parsersApi";
import { post } from "~/assets/js/helpers";
export default {
  props: ["document_id"],
  data() {
    return {
      rules,
      file: "",
      fileBase: "",
      document: { status: "unsigned" },
      invitation: true,
      loading: false,
      valid: false
    };
  },
  computed: {
    user() {
      return this.$store.getters["auth/currentUser"];
    }
  },
  methods: {
    onFileChange(e) {
      //let input = document.getElementById('files');
      //this.file = URL.createObjectURL(input.files[0])

      this.file = "";
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      this.file = URL.createObjectURL(files[0]);

      var file = files[0];

      const name = file.name;
      if (file) {
        const reader = new FileReader();

        reader.onload = e => {
          this.fileBase = e.target.result;
          //No se si se ocupa el name
        };

        reader.readAsDataURL(file);
      }
    },
    async uploadTantra() {
      this.loading = true;
      if (!this.document_id) {
        let postResponse = await this.$store.dispatch('files/postDocument',{document:this.document})
      
      /*
        await this.$axios
          .$post(`/users/${this.user.id}/documents`, this.document)
          .then(data => {
            if (!data.ok) {
              this.$store.commit(
                "showErrorNotification",
                parser.errors(data.errors)
              );
              return;
            }
            return this.createFile(
              data.payload.id,
              this.file,
              `/documents/${data.payload.id}/addSigners`
            );
          })
          .catch(error => {
            this.$store.commit("showErrorNotification", error.message || error);
          });
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



      /*
      //let baseOfFile = window.btoa(file);
      await this.$axios
        .$post(`/documents/${document_id}/files`, {
          doc: this.fileBase,
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
            if (this.invitation)
              await post(
                this,
                "users/" +
                  this.user.id +
                  "/documents/" +
                  document_id +
                  "/invitations",
                auxFirmante
              );
          } catch (error) {
            console.log(error);
          }
          
          this.$emit("reload");
          this.$emit("SavedFile");
          this.$router.push(redirect_to);
        })
        .catch(error => {
          this.$store.commit("showErrorNotification", error.message || error);
          this.$emit("reload");
          this.$router.push(redirect_to);
        });
        */
       
    },
    CancelUpload() {
      this.$emit("CancelUpload");
    },
    clearFileLoader() {
      this.file = "";
      let input = document.getElementById("files");
      if (input.length) {
        input[0].reset();
      }
    }
  }
};
</script>

<style lang="css">
.c-file::-webkit-file-upload-button {
  visibility: hidden;
}
.c-file::before {
  content: "SELECCIONAR";
  display: inline-block;
  background: grey;
  border-radius: 2px;
  padding: 6px 8px;
  margin-right: 10px;
  outline: none;
  white-space: nowrap;
  -webkit-user-select: none;
  cursor: pointer;
  font-weight: 500;
  font-size: 12pt;
  color: white;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
.c-file:hover::before {
  border-color: white;
}
.c-file:active::before {
  background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
}

.label {
  color: #949494;
  font-size: 1.1em;
  margin-bottom: 10px;
  display: block;
}
/*
/deep/.v-text-field--outline > .v-input__control > .v-input__slot {
  background-color: white !important;
}
*/
.v-text-field--outline input {
  margin-top: 10px !important;
}
</style>