<template>
  <div>
    <v-card elevation="0" class="transparent">
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-text>
                <v-tabs
                  grow
                  background-color="white"
                  next-icon="mdi-chevron-right"
                  prev-icon="mdi-chevron-left"
                  v-model="tab"
                  class="mb-4"
                >
                  <v-tab style="fornt-size:11px!important;text-transform:none">Comentar</v-tab>
                  <v-tab style="fornt-size:11px!important;text-transform:none">Historial</v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab">
                  <v-tab-item class="fill-height">
                    <ChatPanel
                      class="fill-height"
                      :comments="lastVersionFile.comments"
                      :Bloqueado="DocumentoBloqueado"
                      @commentCreatd="addComment($event)"
                      :user_id="user.user_id"
                      :file_id="document.id"
                    ></ChatPanel>
                  </v-tab-item>
                  <v-tab-item class="fill-height">
                    <HistoryPanel
                      :document_id="document.id"
                      :document="document"
                      :lastVersionFile="lastVersionFile"
                      :Bloqueado="DocumentoBloqueado"
                    ></HistoryPanel>
                  </v-tab-item>
                </v-tabs-items>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="clearForm" text :disabled="!aviableSaving || loading">Limpiar</v-btn>
        <v-spacer></v-spacer>
        <v-btn :loading="loading" @click="saveItem" text :disabled="!aviableSaving">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import { signersOfFileByStage, statusOfDocument } from "~/assets/js/helpers";
import rules from "~/assets/js/rules";
import ChatPanel from "~/components/components/cincel/cincel/ChatPanel";
import HistoryPanel from "~/components/components/cincel/cincel/HistoryPanel";
export default {
  props: {
    files: {
      type: Object
    },
    loading: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object
    }
  },
  mounted() {
    //this.clearForm();
    if (statusOfDocument(this.document) === "Firmado por todos") {
      this.DocumentoBloqueado = true;
    }
  },
  data() {
    return {
      rules,
      newFile: {
        name: false,
        description: false,
        file: false,
        status: "unsigned",
        invitaiton: false,
        fileBase: ""
      },
      tab: 0,
      DocumentoBloqueado: false,
      signersOfFileByStage,
      statusOfDocument
    };
  },
  methods: {
    clearForm() {
      if (this.files && this.file.id) {
        this.newFile.name = this.file.name;
        this.newFile.description = this.file.description;
      } else {
        this.newFile = {
          name: null,
          description: null,
          file: null
        };
      }
      // this.$refs.file_form.resetValidation();
    },
    saveItem() {
      this.$emit("saveItem", this.newFile);
    },
    onFileChange(e) {
      this.newFile.file = "";
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      this.newFile.file = URL.createObjectURL(files[0]);
      var file = files[0];
      const name = file.name;
      if (file) {
        const reader = new FileReader();
        reader.onload = e => {
          this.newFile.fileBase = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    clearFileLoader() {
      this.newFile.file = "";
      let input = document.getElementById("files");
      if (input.length) {
        input[0].reset();
      }
    }
  },
  computed: {
    aviableSaving() {
      if (this.newFile.name && this.newFile.description && this.newFile.file) {
        return true;
      }
    },
    BloquearFirma() {
      if (this.lastVersionFile && this.lastVersionFile.id) {
        let invitation = this.document.invitations.find(
          i => i.invite_email == this.user.email
        );
        if (!invitation) return true;
        let signer = this.lastVersionFile.signers.find(
          s => s.user_id == this.user.id
        );
        return signer && signer.status == "signed" ? true : false;
      }
      return true;
    },
    lastVersionFile() {
      if (this.document.files && this.document.files.length > 0) {
        //la ultima version de file debe ser igual a la version de document

        return this.document.files.find(
          d => d.version == this.document.last_version
        );
      }
      return false;
    },
    document() {
      return this.$store.getters["files/getDocument"];
    }
  }
};
</script>
<style scoped>
</style>