<template>
  <div v-if="signer">
    <v-card class="signCard mb-4 elevation-4">
      <v-card-text>
        <template>
          <div class="SignerTitle">
            {{ signer.name }}
            <div
              @click="deleteSigner()"
              class="caption font-weight-bold float-right red--text text--darken-2 selector"
              v-if="!signer.idInvitation"
            >Eliminar</div>
          </div>
          <div class="SignerInfo d-inline-block text-truncate">{{signer.email}}</div>
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
  </div>
</template>

<script>
export default {
  props: ["signer", "currentSigner"],
  mounted() {
    // console.log(this.signer);
  },
  data() {
    return {};
  },
  methods: {
    deleteSigner() {
      this.$emit("deleteSigner", this.signer);
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
.SignerInfo {
  color: #042c5c !important;
  width: 85%;
}
.selector{
  cursor: pointer;
}
</style>


