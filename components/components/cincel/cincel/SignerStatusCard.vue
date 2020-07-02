<template>
  <div>
    <v-card
      class="signCard mb-4"
      :class="{'elevation-1':(signer.has_sign),'elevation-4':!signer.has_sign}"
    >
      <v-card-text :class="{'grey lighten-3':signer.has_sign ,'white':!signer.has_sign,}">
        <template>
          <div class="SignerTitle">
            {{signer.name}}
            <span v-if="signer.has_sign" class="float-right">
              <span class="overline" style="text-transform:none">Firmado</span>
              <v-icon small class="success--text">mdi-check-circle</v-icon>
            </span>
            <span v-else class="float-right caption">
              <span class="caption" style="text-transform:none">Sin firma</span>
              <v-icon small class="red--text text--darken-2">mdi-close-circle</v-icon>
            </span>
          </div>
          <div class="SignerInfo d-inline-block text-truncate">{{signer.email}}</div>
        </template>
        <v-btn
          class="mt-2 elevation-0"
          color="primary"
          block
          v-if="localSigner && localSigner.id && !signing && !signer.has_sign && aviableByStage && !Bloqueado "
          @click="signing = true;"
        >Firmar</v-btn>
        <v-btn
          class="mt-2 elevation-0"
          color="yellow darken-2"
          block
          v-if="!localSigner && !signer.has_sign && aviableByStage && !Bloqueado && (disableReminder == false)"
          
          @click="SendReminder()"
        >Enviar recordatorio</v-btn>
      </v-card-text>
      <v-card-text v-if="signing" class="pt-0">
        <v-row>
          <v-col cols="12" class="py-0"></v-col>
          <v-col cols="12" class="pt-0">
            <SignaturePanel
              :Bloqueado="Bloqueado"
              @cancelSignature="signing = false"
              :document="document"
              :signer="localSigner"
            ></SignaturePanel>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import SignaturePanel from "~/components/cincel/cincel/SignaturePanel";
export default {
  props: [
    "signer",
    "currentSigner",
    "document",
    "Bloqueado",
    "stage",
    "activeStage",
    "signers"
  ],
  components: {
    SignaturePanel
  },
  mounted() {
    //console.log("CURRENTSIGNER signStatus %o", this.currentSigner);
    //console.log("SIGNER signStatus %o", this.signer);
    //console.log(this.signers);
    if (!this.$route.query.email) {
      
      if (this.signer.email == this.currentSigner.email) {
        //console.log(this.signer,this.currentSigner);
        let firmante = this.signers.find(s=>s.user.email == this.signer.email)
        //console.log(firmante)
       
        this.localSigner = {
          ...this.signer,
          id: firmante.id,
          type: 'local',
        };
        //console.log(this.localSigner,this.signers);
        //console.log("11**LOCAL ID %o", this.localSigner,this.signer,this.currentSigner);
      }
    } else {
      this.disableReminder = true;
      if (this.signer.email == this.$route.query.email) {
        let firmante = this.signers.find(s=>s.email == this.$route.query.email);
        //console.log(firmante,this.signers);
        //console.log('yo soy',this.currentSigner,this.signer);
        this.localSigner = {
          email: firmante.email,
          id: firmante.id,
          type:'external',
        };
        //this.currentSigner.id = this.signer.idInvitation;
        //console.log("22**LOCAL ID %o", this.localSigner);
      } else{
        //console.log('no entra');
      }
    }

    if (this.activeStage == null) {
      //esto significa que ya firmaron todos
      this.aviableByStage = false;
    } else if (this.activeStage == this.stage) {
      //esto significa que esta tarjeta es de una etapa activa
      //  console.log(this.activeStage,this.stage);
      this.aviableByStage = true;
    }
  },
  data() {
    return {
      dialog: false,
      signReady: false,
      penColor: "black",
      backgroundColor: "rgb(238,238,238)",
      localSigner: null,
      signing: false,
      aviableByStage: false,
      disableReminder:false,
    };
  },
  methods: {
    async SendReminder() {
      this.$store.dispatch("cincel/postReminder", {
        idInvitation: this.signer.idInvitation,
        Authorization: this.$store.getters["auth/tokenObj"]
        // Anterior Authorization: this.$store.getters.token
      });
    }
  },
  computed: {
    bloquedByStage() {}
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
.SignerInfo {
  color: #042c5c !important;
  width: 85%;
}
</style>