<template>
  <div>
    <v-row no-gutters row wrap justify="center">
      <v-col cols="12" class="text-center pb-2">
        <div class="desktop-title">¿Necesitas usuarios extra?</div>
        <br />
        <div class="desktop-subtitle">Puedes agregar usuarios si es necesario</div>
      </v-col>
      <v-col cols="12" sm="5" md="3" class="pb-2">
        <!-- <v-tabs
          background-color="white"
          color="yellow accent-4 text--accent-4"
          centered
          grow
          v-model="selectedPeriod"
          class="tab-container"
          hide-slider
          small
        >
          <v-tab active-class="tab-on" v-for="i in periods" :key="i.name">{{i.str}}</v-tab>
        </v-tabs>-->
      </v-col>
    </v-row>
    <v-row row wrap justify="center">
      <v-col cols="12" sm="5" lg="3">
        <v-card class="extra-card">
          <v-card-text>
            <div class="plan-price pt-4">
              1
              <br />Usuario
            </div>
            <div class="pb-2">
              <br />
            </div>
            <div class="plan-description">
              <v-row row wrap no-gutters>
                <v-col cols="2" class="text-center pb-3">
                  <v-icon small class="yellow--text text--accent-4">mdi-check-circle-outline</v-icon>
                </v-col>
                <v-col cols="10">
                  <div class="form-title">
                    <span v-if="selectedPeriod == 0" UserExtra.subscription_plans>
                      {{UserExtra.subscription_plans[selectedPeriod].amount/100 | currency }}
                      <br />Mensual
                      <br />
                    </span>
                    <span v-else>
                      {{(UserExtra.subscription_plans[selectedPeriod].amount/100) | currency }}
                      <br />Anual
                      <br />
                    </span>
                  </div>
                </v-col>
              </v-row>
            </div>
            <br />
            <br />
            <div class="text-center py-5">
              <v-btn
                @click="procespayment(UserExtra.subscription_plans[selectedPeriod])"
                class="cincel-yellow-btn"
              >Agregar</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: ["user_plan"],
  data() {
    return {
      periods: [
        { id: 1, value: "mensual", str: "Mensual" },
        {
          id: 2,
          value: "anual",
          str: "Anual"
        }
      ],
      selectedPeriod: 0
    };
  },
  methods: {
    async procespayment(idExtra) {
      let process = await this.$store.dispatch("payment/dataPaymentsFromUser", {
        extraPaymentId: idExtra
      });
    }
  },
  computed: {
    UserExtra() {
      let plans = this.$store.getters["subscriptions/getPlansInfo"];
      console.log(
        "valores buscnaod %o",
        plans.filter(p => p.name == "extra_user")[0]
      );
      return plans.filter(p => p.name == "extra_user")[0];
    }
  }
};
</script>

<style scoped>
.tab-on {
  background-color: white;
}

.tab-container {
  background-color: #d8d8d8;
  border-radius: 40px;
  overflow: hidden;
  padding: 4px;
}

.v-tab--active {
  border-radius: 40px;
  overflow: hidden;
  box-shadow: 1px 2px 9px 0 rgba(0, 0, 0, 0.2) !important;
}

.v-slide-group .v-tabs-bar {
  background-color: #d8d8d8 !important;
}

.tab-container > .v-tabs-bar,
.v-tabs > .v-tabs-bar {
  height: 36px !important;
  background-color: #d8d8d8 !important;
}
</style>