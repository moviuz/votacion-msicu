<template>
  <div>
    <v-card
      class="signCard mb-4"
      :class="{'elevation-1':((signer.signed && signer.id != currentSigner) || signer.id != currentSigner),'elevation-4':!signer.signed}"
    >
      <v-card-text
        :class="{'grey lighten-3':((signer.signed && signer.id != currentSigner) || signer.id != currentSigner),'white':!signer.signed,}"
      >
        <template>
          <div class="SignerTitle">
            {{signer.title}}
            <v-icon
              v-if="signer.status == 'signed'"
              class="float-right success--text"
            >mdi-check-circle</v-icon>
            <v-icon v-else class="float-right red--text text--darken-2">mdi-close-circle</v-icon>
          </div>
          <div class="SignerInfo d-inline-block text-truncate">
            <strong>{{signer.name}}</strong>
            <span>- {{signer.email}}</span>
          </div>
        </template>
        <v-btn
          class="mt-2 elevation-0"
          color="primary"
          block
          v-if="signer.status != 'signed' && currentSigner == signer.id"
          @click="SignDocument()"
        >Firmar</v-btn>
      </v-card-text>
    </v-card>
    <v-container>
      <v-dialog v-model="dialog" max-width="630" persistent>
        <v-card :class="{'Rotation':currentSizeRotate == 'xs' }">
          <v-card-title class="headline blue-grey--text">Firma:</v-card-title>

          <v-card-text>
            <span class="pl-2">
              Elije el color de tu firma:
              <v-radio-group
                hide-details
                style="display:inline-block"
                dense
                v-model="penColor"
                class="mt-0"
                row
              >
                <v-radio label="Negro" color="black" value="black"></v-radio>
                <v-radio label="Azul " color="blue " value="blue "></v-radio>
              </v-radio-group>
            </span>
            <v-card xs12>
              <v-card-text class="pa-0">
                <VueSignaturePad
                  class="text-center justify-center"
                  style="border:solid 1px"
                  width="384px"
                  height="225px"
                  ref="signaturePad"
                  :options="{ onEnd,penColor 
                  }"
                  :class="{'Resize': currentSizeRotate== 'xs' }"
                />
              </v-card-text>
            </v-card>
            <div class="text-center pt-2" style="font-size:20px">
              <strong>{{signer.title}}</strong>
              &nbsp; {{signer.name}}
            </div>
          </v-card-text>

          <v-card-actions class="px-5">
            <v-btn color="red darken-1" text outlined @click="cancelarFirma()">Cancelar</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary darken-1" text outlined @click="deshacerFirma()">Borrar</v-btn>
            <v-btn
              outlined
              color="green darken-1"
              text
              :disabled="!signReady"
              @click="firmar()"
            >Aceptar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["signer", "currentSigner"],
  mounted() {},
  data() {
    return {
      dialog: false,
      signReady: false,
      penColor: "black",
      backgroundColor: "rgb(238,238,238)"
    };
  },
  methods: {
    SignDocument() {
      //console.log('firmando!');
      this.dialog = true;
    },
    deshacerFirma() {
      this.$refs.signaturePad.clearSignature();
      this.signReady = false;
    },
    cancelarFirma() {
      this.$refs.signaturePad.clearSignature();
      this.dialog = false;
    },
    async firmar() {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
      let response = await this.$store.dispatch("cincel/postSignature", {
        signature: data
      });
      console.log("response on dialog %o", response);
      if (response == true) {
        setTimeout(function() {
          location.reload();
        }, 3000);
      }
    },
    onEnd() {
      this.signReady = true;
    }
  },
  computed: {
    currentSize() {
      //console.log(this.$vuetify.breakpoint.name)
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "sm";
        case "sm":
          return "sm";
        case "md":
          return "md";
        case "lg":
          return "md";
        case "xl":
          return "md";
      }
    },
    currentSizeRotate() {
      //console.log(this.$vuetify.breakpoint.name)
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          console.log("ESTAS EN XS de FERCHOS");
          return "xs";
        case "sm":
          console.log("ESTAS EN SM");
          return "sm";
        case "md":
          console.log("ESTAS EN MD");
          return "md";
        case "lg":
          console.log("ESTAS EN LG");
          return "md";
        case "xl":
          console.log("ESTAS EN XL");
          return "md";
      }
    }
  }
};
</script>

<style>
.signCard {
  font-size: 13px !important;
  color: #042c5c !important;
}
.SignerTitle {
  text-transform: uppercase;
  font-weight: bold;
  color: #042c5c !important;
}
.Resize {
  width: "205px";
  height: "384px";
}
.Rotation {
  transform: rotate(-90deg);
  width: "25px";
  height: "584px";
}

.SignerInfo {
  color: #042c5c !important;
  width: 85%;
}
</style>