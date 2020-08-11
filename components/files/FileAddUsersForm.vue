<template>
  <div>
    <v-card elevation="0" class="transparent">
      <v-card-text>
        <v-form ref="add_form" autocomplete="off">
          <v-row
            class="mx'0"
            style="max-width:100%!important"
            justify="center"
            v-if="!documentTest.active"
          >
            <v-col cols="12" v-for="(etapa,indexEtapa) in firmantes" :key="indexEtapa">
              <v-card class="elevation-0 stage-separator">
                <v-card-text>
                  <div v-for="(firmante,index) in etapa" :key="index">
                    <AddSignerCard
                      :currentSigner="1"
                      :signer="firmante"
                      @deleteSigner="removeSigner(index,indexEtapa)"
                    ></AddSignerCard>
                  </div>
                  <div class="text-center">
                    <v-btn style="text-transform:none" text @click="agregarFirmante(indexEtapa+1)">
                      <v-icon>mdi-plus</v-icon>Agregar otro firmante
                    </v-btn>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" v-if="firmantes.length == 0">
              <div class="text-center">
                <v-btn block large @click="agregarFirmante(1)">Agregar Firmante</v-btn>
              </div>
            </v-col>
          </v-row>
          <v-col cols="12" class="px-5 text-center" v-if="!documentTest.active">
            <v-divider></v-divider>
            <br />
            <v-btn block :disabled="firmantes.lenght == 0 || dacialog" @click="saveItem">Finalizar</v-btn>
          </v-col>
          <v-cols cols="12" class="px'5 text-center" v-else>
            <v-divider></v-divider>
            <br />
            <v-btn disabled>El documento ya esta configurado</v-btn>
          </v-cols>
        </v-form>
      </v-card-text>
      <v-dialog v-model="dialog" width="800" persistent>
        <v-form @submit.prevent="register">
          <v-card>
            <v-card-title class="headline blue-grey--text" style="display:block;width:100%">
              Agregar firmante
              <v-icon @click="cancel" class="float-right">mdi-close</v-icon>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    class="filed"
                    label="Nombre del firmante*"
                    outlined
                    name="nombre firmante"
                    :rules="[rules.required]"
                    v-model="auxFirmante.invite_name"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    outlined
                    label="Correo electronico *"
                    name="correo firmante"
                    v-model="auxFirmante.invite_email"
                    :rules="[rules.required,rules.email]"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions class="px-5">
              <v-spacer></v-spacer>
              <v-btn @click="guardarFirmante">Aceptar</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
    </v-card>
  </div>
</template>
<script>
import rules from "~/assets/js/rules";
import AddSignerCard from "~/components/components/cincel/cincel/AddSignerCard";
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    if (
      this.$store.getters["files/externalSigners"] &&
      this.$store.getters["files/externalSigners"][0]
    ) {
      this.initialSigners = this.$store.getters["files/externalSigners"].length;
    } else {
      this.initialSigners = 0;
    }
    this.clearForm();
  },
  data() {
    return {
      rules,
      auxFirmante: {},
      dialog: false,
      currentStage: 1,
      initialSigners: 0,
      saveData: {
        confirmDocumentSigners: false,
        activateDocument: false
      }
    };
  },
  methods: {
    clearForm() {
      this.auxFirmante = {};
    },
    parsearNuevaInvitacion(invitacionRaw, etapa) {
      return {
        invite_name: invitacionRaw.invite_name,
        invite_email: invitacionRaw.invite_email,
        name: invitacionRaw.invite_name,
        email: invitacionRaw.invite_email,
        stage: etapa
      };
    },
    guardarFirmante() {
      let index = this.currentStage - 1;
      let newSigners = JSON.parse(JSON.stringify(this.firmantes));
      if (index >= this.firmantes.length) {
        newSigners.push([this.parsearNuevaInvitacion(this.auxFirmante)]);
      } else {
        newSigners[index].splice(
          0,
          0,
          this.parsearNuevaInvitacion(this.auxFirmante)
        );
      }
      this.$store.commit("files/setSigners", newSigners);
      this.auxFirmante = {};
      this.dialog = false;
    },
    agregarFirmante(stage) {
      this.dialog = true;
      this.currentStage = stage;
    },
    saveItem() {
      let confirmation;
      if (this.firmantes[0].length > this.initialSigners) {
        //se agregaron mas firmantes y se manda el arreglo de firmantes para guardar el documento
        this.saveData.confirmDocumentSigners = true;
        this.$emit("saveItemUser", this.saveData);
      } else {
        // se quedo con el firmante base y se actualiza el status del documento
        this.saveData.activateDocument = true;
        this.$emit("saveItemUser", this.saveData);
      }
    },
    cancel() {
      this.auxFirmante = {};
      this.dialog = false;
    },
    removeSigner(indexSigner, indexEtapa) {
      let newSigners = JSON.parse(JSON.stringify(this.firmantes));
      newSigners[indexEtapa].splice(indexSigner, 1);
      if (newSigners[indexEtapa].length == 0) {
        newSigners.splice(indexEtapa, 1);
        let i, signer;
        for (i = indexEtapa; i < newSigners.length; i++) {
          for (signer of newSigners[i]) signer.stage = i + 1;
        }
      }
      this.$store.commit("file/setSigners", newSigners);
    }
  },
  computed: {
    firmantes() {
      return this.$store.getters["files/externalSigners"];
    },
    documentTest() {
      return this.$store.getters["files/getDocument"];
    }
  }
};
</script>
<style scoped>
</style>