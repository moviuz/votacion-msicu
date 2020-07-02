<template>
  <div>
    <v-row justify="center" v-if="!Bloqueado ">
      <v-col cols="12" class="title text-center">
        <v-icon small @click="cancelSignature" class="float-right pt-2">mdi-close</v-icon>¿Cómo deseas firmar?
      </v-col>
      <v-col cols="6" class="text-center">
        <v-btn
          :class="{'cincel-yellow-btn':dialog}"
          small
          @click="autograpSignature()"
          style="text-transform:none"
          color
        >Autógrafa</v-btn>
      </v-col>
      <v-col cols="6" class="text-center">
        <v-btn
          active-class="cincel-yellow-btn"
          small
          disabled
          @click="advanceSignature()"
          :class="{'cincel-yellow-btn':eSignature}"
          style="text-transform:none"
          color
        >eFirma</v-btn>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <v-card>
          <v-card-text class>
            <div class="text-center title" style="font-weight: normal">
              <v-icon class="primary--text">mdi-shield-check-outline</v-icon>Certificado y asegurado por
              <br />
              <img class="logo" src="/img/CINCEL-LOGO-MINI.png" alt style="width:70px" />
              <br />
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="eSignature">
      <v-col cols="12">
        <AdvanceSignature :document="document" :signer="signer" @reload="successSignature"></AdvanceSignature>
      </v-col>
    </v-row>

    <SignatureDialog
      @closeDialog="closeDialog"
      @successSignature="successSignature"
      :signer="signer"
      :dialog="dialog"
      :document="document"
    ></SignatureDialog>
  </div>
</template>

<script>
import SignatureDialog from "~/components/cincel/cincel/AutographSignatureDialog";
import AdvanceSignature from "~/components/cincel/cincel/AdvanceSignaturePanel";

export default {
  props: ["signer", "document", "Bloqueado"],
  components: {
    SignatureDialog,
    AdvanceSignature
  },
  mounted() {
    //console.log("signature panel mounted", this.signer, this.document);
  },
  data() {
    return {
      dialog: false,
      signReady: false,
      eSignature: false
    };
  },

  methods: {
    autograpSignature() {
      this.eSignature = false;
      this.dialog = true;
    },
    advanceSignature() {
      this.dialog = false;
      this.eSignature = !this.eSignature;
    },
    closeDialog() {
      this.dialog = false;
    },
    successSignature(signature) {
      console.log("firma Exitosa", signature);

      setTimeout(() => {
        window.location.reload(true);
      }, 4000);
    },
    cancelSignature() {
      this.$emit("cancelSignature");
    }
  }
};
</script>

<style>
</style>

