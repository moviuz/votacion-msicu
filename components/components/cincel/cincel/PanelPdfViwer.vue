<template>
  <v-row no-gutters >
    <v-col cols="12">
      <v-card :height="panelSize">
        <v-card-text class="pa-4 fill-height">
          <v-row no-gutters>
            <v-col
              v-if="openedPanel && mode == 'lg'"
              cols="12"
              class="pa-0 ma-0"
              style="font-size:15px"
            >
              <span>Documento</span>
             
              <strong
                style="font-size:18px;"
                class="blue-grey--text text--darken-2"
              >{{document.name}} </strong>
              <a class="float-right" style="text-decoration:none" :href="this.urlPdf" target="_blank">
                  <v-icon>mdi-open-in-new</v-icon>
              </a>
             
            </v-col>
            <v-col v-else cols="12" class="pa-0 ma-0" style="font-size:15px;cursor:pointer">
              <strong style="font-size:18px" class="blue-grey--text text--darken-2">
                <a class="doc-link" :href="this.urlPdf" target="_blank">
                  {{document.name}} 
                </a>
                <a class="float-right" style="text-decoration:none" :href="this.urlPdf" target="_blank">
                  <v-icon>mdi-open-in-new</v-icon>
              </a>
              </strong>
              
            </v-col>
          </v-row>
          <v-row no-gutters class="pt-4 fill-height">
            <v-col cols="12" class="fill-height">
              <object
                :data="urlPdf"
                width="100%"
                height="92%"
                type="application/pdf"
                :onload="frameLoaded('object')"
              >
                El navegador no soporta documentos,
                <a
                  class="newTabLink"
                  :href="urlPdf"
                  target="_blank"
                >abrir archivo en nueva ventana</a>
              </object>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
//import pdf from "pdfvuer";

import { CommonMixins } from "~/mixins/Common";

export default {
  props: {
    document: {
      type: Object,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    openedPanel: {
      type: Boolean,
      default: true
    },
    urlPdf: {},
    mode: {
      type: String,
      default: "lg"
    }
  },
  mixins: [CommonMixins],
  components: {},
  async mounted() {
    
  },
  data() {
    return {
      frameRendered: false,
    };
  },
  methods: {
    togglePdf() {
      this.$emit("togglePdf");
    },
    frameLoaded(frame) {
      this.frameRendered = true;
     // console.log("fram rendered");
    },
    async downloadPdf() {
      //Se deja la función pero ya no se usa, con 
      try{
        let response = await this.$axios.get(this.urlPdf, { responseType: 'arraybuffer'})
        this.base64 = Buffer.from(response.data, 'binary').toString('base64')
      } catch(e){
        console.log(e)
      }
    },
    openNewWindow(){

    }
  },
  computed: {},
  watch: {
    mode: function(oldv, newv) {
      console.log(oldv, newv);
    }
  }
};
</script>
<style scoped>
.newTabLink {
  font-size: 18px;
}

.fill-aviable {
  height: -webkit-fill-available;
}
.doc-link {
  font-weight: bold;
  font-size:18px;
  text-decoration: none;
}
</style>