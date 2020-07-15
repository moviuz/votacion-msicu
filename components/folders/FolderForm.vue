<template>
  <div>
    <v-card elevation="0" class="transparent">
      <v-card-text>
        <v-form ref="folder_form" v-model="valid" autocomplete="off">
          <div class="form-label">Nombre la carpeta</div>
          <v-text-field
            class="field mb-0"
            v-model="newFolder.name"
            :rules="[rules.required]"
            placeholder="Escribe el nombre"
            outlined
            dense
            name="nombre_carpeta"
          ></v-text-field>
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
    folder: {
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
      newFolder: {
        name: null,
        organizationId: null
      },
      valid: false
    };
  },
  methods: {
    clearForm() {
      if (this.folder && this.folder.id) {
        this.newFolder.id = this.folder.id;
        this.newFolder.name = this.folder.name;
        this.newFolder.organizationId = this.folder.organizationId;
      } else {
        this.newFolder = { name: null, organizationId: null };
      }

      this.$refs.folder_form.resetValidation();
    },
    saveItem() {
      this.$emit("saveItem", this.newFolder);
    }
  },
  computed: {
    aviableSaving() {
      if (this.folder && this.folder.id) {
        if (
          this.newFolder.name != this.folder.name ||
          this.newFolder.organizationId != this.folder.organizationId
        ) {
          return true;
        }
      } else {
        if (this.newFolder.name) {
          return true;
        }
      }
      return false;
    }
  },
  watch: {
    folder: function() {
      console.log("watchCalled");
      this.clearForm();
    }
  }
};
</script>

<style>
</style>