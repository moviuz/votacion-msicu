<template>
  <div>
    <v-card elevation="0" class="transparent">
      <v-card-text>
        <v-form ref="organization_form" v-model="valid" autocomplete="off">
          <div class="form-label">1.Nombre de Organización</div>
          <v-text-field
            class="field mb-0"
            v-model="newOrganization.name"
            :rules="[rules.required]"
            placeholder="Escribe el nombre"
            outlined
            dense
            name="nombre_organizacion"
          ></v-text-field>
          <div class="form-label">
            2.Carga el logo de tu organización
            <div class="body-2 pl-3 pt-2 pb-3 greey--text">
              &nbsp;&nbsp;Selecciona el archivo desde tu computadora
              <br />&nbsp;&nbsp;El archivo debe pesar menos de 1MB
            </div>
          </div>
          <div>
            <v-card class="fill-height upload-card">
              <v-card-text class="fill.height text-center">
                <v-row align-content="center" class="fill-height">
                  <v-col cols="12">
                    <img :src="newOrganization.imagotype" alt />
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </div>
          <div>
            <v-card class="elevation-0" style="border:solid 2px #c0c1c5">
              <v-card-text style="overflow:auto">
                <v-row no-gutters>
                  <v-col cols="12">
                    <image-uploader
                      :maxWidth="110"
                      :quality="0.7"
                      :maxSize="0.9"
                      :preview="false"
                      :className="['fileinput',{'fileinput--loaded': hasImage}]"
                      :campute="true"
                      accept="image/*"
                      doNotResize="['gif','svg']"
                      @input="setImage"
                    ></image-uploader>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
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
    organization: {
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
      newOrganization: {
        name: null,
        imagotype: null,
        organizationId: null
      },
      valid: false,
      hasImage: null
    };
  },
  methods: {
    clearForm() {
      if (this.organization && this.organization.id) {
        this.newOrganization.name = this.organization.name;
        this.newOrganization.imagotype = this.organization.imagotype;
        this.newOrganization.organizationId = this.organization.id;
      } else {
        this.newOrganization = {
          name: null,
          imagotype: null,
          organizationId: null
        };
      }
      this.$refs.organization_form.resetValidation();
    },
    saveItem() {
      this.$emit("saveItem", this.newOrganization);
    },
    setImage: function(output) {
      this.hasImage = true;
      this.newOrganization.imagotype = output;
    }
  },
  computed: {
    aviableSaving() {
      if (this.organization && this.organization.id) {
        if (
          this.newOrganization.name != this.organization.name ||
          this.newOrganization.imagotype != this.organization.imagotype
        ) {
          return true;
        }
      } else {
        if (this.newOrganization.name && this.newOrganization.imagotype) {
          return true;
        }
      }
      return false;
    }
  },
  watch: {
    organization: function() {
      this.clearForm();
    }
  }
};
</script>
<style scoped>
</style>