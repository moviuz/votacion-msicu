<template>
  <v-flex xs12 sm12 md6>
    <br />
    <v-card :height="panelHeight" :class="{'PanelCincel':currentSize == 'md'}">
      <v-card-title primary-title class="DocInfo">
        <span v-if="currentSize == 'sm' && openSmallPanel == true" @click="toggleSmallPanel">
          <v-icon class="primary--text">mdi-arrow-left</v-icon>&nbsp;
        </span>
        <span style="font-weight:300">{{currentDocument.name}}</span>

        <v-spacer></v-spacer>
        <div v-if="currentSize == 'sm' && openSmallPanel == false" @click="toggleSmallPanel">
          <v-icon class="primary--text">mdi-arrow-right</v-icon>
        </div>
      </v-card-title>
      <v-card-text style="height:89%" v-if="(currentSize == 'md') ">
        <v-divider class="mb-2 CincelDivider"></v-divider>
        <object
          :data="'https://docs.google.com/viewer?url=' + ASSETS_HOST + currentDocument.url + '&embedded=true'"
          type="application/pdf"
          style="width:100%;height:100%"
        >
          <iframe
            :src="'https://docs.google.com/viewer?url=' + ASSETS_HOST + currentDocument.url + '&embedded=true'"
            width="100%"
            height="100%"
            style="width: 100%; height: 100%;"
            frameborder="0"
            lo
            scrolling="no"
          ></iframe>
        </object>
      </v-card-text>
      <v-card-text style="height: 520px;" v-if="(currentSize == 'sm' && openSmallPanel == true)">
        <v-divider class="mb-2 CincelDivider"></v-divider>
        <!-- <pdf :src="ASSETS_HOST+currentDocument.url" style="width:100%;height:100%"></pdf>-->
        <iframe
          :src="'https://docs.google.com/viewer?url=' +ASSETS_HOST + currentDocument.url + '&embedded=true'"
          width="100%"
          height="100%"
          style="width: 100%; height: 100%;"
          frameborder="0"
          lo
          scrolling="no"
        ></iframe>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  props: ["currentDocument"],
  mounted() {
    console.log(this.currentDocument);
  },
  data() {
    return {
      openSmallPanel: false,
      dialog: false,
      signReady: false,
      penColor: "black",
      backgroundColor: "rgb(238,238,238)",
      ASSETS_HOST: process.env.ASSETS_HOST,
      panelHeight: 728
    };
  },
  methods: {
    toggleSmallPanel() {
      this.openSmallPanel = !this.openSmallPanel;
    },
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

.PanelCincel {
  height: 620px;
  overflow: auto;
}
.SignerInfo {
  color: #042c5c !important;
  width: 85%;
}
</style>