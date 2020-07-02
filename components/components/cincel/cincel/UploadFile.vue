<template>
  <v-form @submit.prevent="uploadTantra" v-model="valid" class="fill-height">
    <v-card class="fill-height pt-3 fill-height">
      <v-card-text class="pb-1">
        <v-row>
          <v-col cols="12" sm="12" md="5" lg="5" >
            <div class=" form-title">1. Nombra tu documento</div>

            <v-row justify="center">
              <v-col cols="11">
                <div class="form-label">
                  Nombre del documento
                  <span class="red--text">*</span>
                </div>
                <v-text-field
                  class="field "
                  v-model="document.name"
                  :rules="[rules.required]"
                  placeholder="Escribe el nombre"
                  dense
                  outlined
                ></v-text-field>

                <div class="form-label ">
                  Descripción
                  <span class="red--text">*</span>
                </div>
                <v-text-field
                  class="field"
                  v-model="document.description"
                  :rules="[rules.required]"
                  placeholder="Descripción breve"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
            <div class="form-title">
              2. Carga tu archivo en formato PDF
              <div
                class="body-2 pl-3 grey--text"
              >&nbsp; &nbsp;Selecciona el archivo desde tu computadora</div>
            </div>
          </v-col>
          <v-col cols="7" md="6" lg="6 offset-1" class="hidden-sm-and-down">
            <v-card class="fill-height upload-card " elevation="0"   >
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
            <div class="document-attributes pt-4" v-if="!document_id">
             <strong class="form-label"> <v-checkbox label="Deseo poder firmar este documento" v-model="invitation"></v-checkbox> </strong>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
              large
              
              class="cincel-border-btn"
              @click="CancelUpload()"
            >Cancelar</v-btn>&nbsp;&nbsp;&nbsp;
            <v-btn
              large
              class="cincel-yellow-btn"
              type="submit"
              :loading="loading"
              :disabled="loading || !valid "
            >Enviar</v-btn>
            <v-spacer>  </v-spacer>
      </v-card-actions>
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
      document: { name:'',description:'', status: "unsigned" },
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
      //console.log(this.file)
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
        //si no tiene id, es un documento nuevo
        let newDocument = await this.$store.dispatch('files/postDocument',{document:this.document})
        //console.log("RESPUESTA newDocument %o",newDocument)
        if(newDocument == false){
          this.loading = false;
        } else {
          this.createFile(
            newDocument.id,
            this.file,
            `/documents/${newDocument.id}/addSigners`);
        }
      } else {
        //al tener id, se creara una nueva version de un doc existente
        await this.createFile(
          this.document_id,
          this.file,
          `/documents/${this.document_id}/show`
        );
      }

      
    },
    async createFile(document_id, file, redirect_to) {
        let postNewFile = await this.$store.dispatch('files/createFileOnDocument',{
          document_id:document_id,
          doc:this.fileBase,
        });
        //console.log(postNewFile);
        let auxFirmante = {
          invite_name: this.user.name,
          invite_email: this.user.email
        };
        if (this.invitation){
          let nuevoFirmante = await this.$store.dispatch('files/addInvitationToDocument',{
            signer:auxFirmante,
            user:this.user.id,
            document_id:document_id
          });
        }

        //this.$emit("reload");
        //this.$emit("SavedFile");
        this.loading = false;
        this.$router.push(redirect_to);

       
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


/*
/deep/.v-text-field--outline > .v-input__control > .v-input__slot {
  background-color: white !important;
}
*/
.v-text-field--outline input {
  margin-top: 10px !important;
}
</style>