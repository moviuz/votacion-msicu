<template>
  <v-form @submit.prevent="upload" v-model="valid" class="fill-height">
    <v-card class="fill-height pt-4 transparent elevation-0">
      <v-card-text>
        <v-layout row wrap class="justify-center">
          <v-flex xs12 style="max-height: fit-content;">
            <div class="document-attributes" v-if="!document_id">
              <label class="label">
                Nombre del documento
                <span class="red--text">*</span>
              </label>
              <v-text-field
                class="field"
                v-model="document.name"
                :rules="[rules.required]"
                placeholder="Nombre del documento"
                outline
              ></v-text-field>
              <label class="label">
                Descripción
                <span class="red--text">*</span>
              </label>
              <v-text-field
                class="field"
                v-model="document.description"
                :rules="[rules.required]"
                placeholder="Descripción"
                outline
              ></v-text-field>
              <v-checkbox label="Deseo poder firmar este documento" v-model="invitation"></v-checkbox>
            </div>
            <v-card class="elevation-0" style="border:solid 2px rgba(0,0,0,.6)">
              <v-card-text>
                <v-input :value="file" hide-details :rules="[rules.required]">
                  <input type="file" accept="application/pdf" @change="onFileChange" />
                </v-input>
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs12 v-if="file" class="fill-height" style="height: 250px">
            <embed width="100%" class="fill-height" :src="file" />
          </v-flex>
          <v-flex xs12>
            <v-layout row wrap class="justify-center">
              <v-flex xs6 class="pt-4 text-xs-center">
                <v-btn
                  large
                  class="primary"
                  type="submit"
                  :loading="loading"
                  :disabled="loading || !valid "
                >Actualizar</v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
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
    },
    CancelUpload() {
      this.$emit("CancelUpload");
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