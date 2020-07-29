<template>
  <div>
    <v-card elevation="0" class="trasparent">
      <v-card-text>
        <v-form ref="file_form" autocomplete="off">
          <div class="form-label">1. Nombrea tu documento</div>
          <v-text-field
            class="field mb-0"
            v-model="newFile.name"
            :rules="[rules.required]"
            placeholder="Escribe el nombre del documento"
            outlined
            dense
            name="file_name"
          ></v-text-field>
          <v-text-field
            class="field mb-0"
            v-model="newFile.description"
            :rules="[rules.required]"
            placeholder="Descripción"
            outlined
            dense
          ></v-text-field>
          <div class="form-label">2. Carga tu archivo en formato PDF</div>
          <div
            class="body-2 pl-3 pt-2 greey--text"
          >&nbsp; &nbsp;Selecciona el archivo desde tu computadora</div>
          <div>
            <v-card class="fill-height upload-card" elevation="0">
              <v-card-text v-if="file" class="fill-height pa-0">
                <embed width="100%" class="fill-height" height="100%" :src="file" />
              </v-card-text>
            </v-card>
          </div>
          <div>
            <v-card class="elevation-0" style="border:solid 2px #c0c1c5">
              <v-card-text style="overflow:auto">
                <v-input
                  :value="newFile.file"
                  @click="clearFileLoader"
                  hide-details
                  :rules="[rules.required]"
                >
                  <input type="file" id="files" accept="application/pdf" @change="onFileChange" />
                </v-input>
              </v-card-text>
            </v-card>
            <div class="docment-attributes pt-4">
              <stong class="form-label">
                <v-checkbox label="Deseo poder firmar este documento" v-model="newFile.invitation"></v-checkbox>
              </stong>
            </div>
          </div>
        </v-form>
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
import rules from "~/assets/js/rules";
export default {
  props: {
    files: {
      type: Object
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.clearForm();
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
      }
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
      this.$refs.file_form.resetValidation();
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
    }
  }
};
</script>
<style scoped>
</style>