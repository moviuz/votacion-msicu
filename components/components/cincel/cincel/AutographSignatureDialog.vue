<template>
  <div>
    <v-dialog v-model="dialog" :max-width="currentSizeRotate" persistent>
      <v-card>
        <v-card-title class="headline blue-grey--text pb-0" style="display:block;width:100%">
          Firma:
          <v-icon @click=" cancelarFirma" class="float-right">mdi-close</v-icon>
        </v-card-title>
        <v-card-text class="pb-0">
          <span class="pl-2" v-if="false">
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
          <v-card>
            <v-card-text class="pa-0">
              <VueSignaturePad
                class="text-center justify-center"
                style="border:solid 1px"
                :width="currentSizeRotate"
                :height="padHeight"
                ref="signaturePad"
                :options="{ onEnd,penColor , onBegin: () => {$refs.signaturePad.resizeCanvas()} }"
              />
            </v-card-text>
          </v-card>
          <div class="text-center pt-2" style="font-size:20px">
            <strong>{{signer.title}}</strong>
            &nbsp; {{signer.name}}
          </div>
        </v-card-text>
        <v-card-actions class="px-5">
          <v-btn class="cincel-border-btn"  @click="deshacerFirma()">Borrar</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            class="cincel-yellow-btn"
            :loading="loading"
            :disabled="!signReady"
            @click="firmar()"
          >Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { CommonMixins } from "~/mixins/Common";
export default {
  props: ["signer", "dialog", "document"],
  mixins: [CommonMixins],
  mounted() {
   // console.log('signer',this.signer,this.document);
    //console.log("VALOR CORREO AUTOGRAF %o", this.$route.query.email);
    let file = this.document.files.filter(
      file => file.version == this.document.last_version
    );
    
    if (!this.$route.query.email) {
      this.currentSigner = this.signer.id;
    }
  },
  data() {
    return {
      //dialog:false,
      signReady: false,
      penColor: "black",
      backgroundColor: "rgb(238,238,238)",
      currentSigner: {},
      loading: false
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
      this.$emit("closeDialog");
    },
    async firmar() {
     // console.log(this.currentSigner)
      //console.log(this.signer);
      if (!this.$route.query.email) {
        // Firma autografa de un usuario registrado
        const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
        this.loading = true;
        
        let response = await this.$store.dispatch("cincel/postSignature", {
          user: this.currentSigner,
          signature: data
        });
        
        //console.log(response);
        this.loading = false;
        //  vueContext.$store.commit('showSuccessNotification','Se ha firmado con exito el documento');
        let successMessage = {
          type: "autograph",
          signature: data
        };
        if(response){
          this.$emit("successSignature", successMessage);
        }
        
      } else {
        // Firma autografa de un usuario con token
        const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
        this.loading = true;
     
        
        let response = await this.$store.dispatch(
          "cincel/postSignatureWithToken",
          {
            user: this.signer.id,
            token: this.$route.query.invitation_token,
            signature: data
          }
        );
     
        //console.log(response);
        this.loading = false;
          if(response){
          let successMessage = {
            type: "autograph",
            signature: data
          };
          this.$emit("successSignature", successMessage);
            
        }
 
      }
    },
    onEnd() {
      this.signReady = true;
    }
  },
  computed: {
    currentSizeRotate() {
      //console.log(this.$vuetify.breakpoint.name)
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          //console.log("ESTAS EN XS de FERCHOS");
          return "330";
        case "sm":
          //console.log("ESTAS EN SM");
          return "430";
        case "md":
          //console.log("ESTAS EN MD");
          return "630";
        case "lg":
          //console.log("ESTAS EN LG");
          return "630";
        case "xl":
          //console.log("ESTAS EN XL");
          return "630";
      }
    },
    padHeight() {
      let size = this.currentBreakpoint;
      if (size == "lg") {
        return "225px";
      } else {
        return "200px";
      }
    }
  }
};
</script>

<style>
</style>