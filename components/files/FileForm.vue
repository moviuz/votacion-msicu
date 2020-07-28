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
                  :value="file"
                  @click="clearFileLoader"
                  hide-details
                  :rules="[rules.required]"
                >
                  <input type="file" id="files" accept="application/pdf" @change="onFileChange" />
                </v-input>
              </v-card-text>
            </v-card>
            <div class="docment-attributes pt-4" v-if="!document_id">
              <stong class="form-label">
                <v-checkbox label="Deseo poder firmar este documento" v-model="invitation"></v-checkbox>
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
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      rules,
      newFile: {
        name: false,
        description: false
      }
    };
  }
};
</script>
<style scoped>
</style>