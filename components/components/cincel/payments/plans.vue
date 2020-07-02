<template>
  <div>
    <v-row no-gutters row wrap justify="center">
      <v-col cols="12" class="text-center pb-2">
        <div class="desktop-title">Nuestros planes</div>
        <br />
        <div class="desktop-subtitle">Elige el paquete para comenzar</div>
      </v-col>
      <v-col cols="12" sm="5" md="3" class="pb-2">
        <v-tabs
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
        </v-tabs>
      </v-col>
    </v-row>
    <v-row row wrap justify="center">
        <v-col cols="12" sm="5"  lg="3">
            <v-card class="plan-card" :class="{'active-plan':activePlan.name == 'base'}">
                <v-card-text style="height:296px">
                    <div class="plan-title">
                        Carbono
                    </div>
                    <div class="plan-price">$ 0</div>
                    <div class="plan-description">
                        <v-row row wrap no-gutters="">
                            <v-col cols="2" class="text-center pb-3"> 
                                <v-icon small class="yellow--text text--accent-4">mdi-check-circle-outline</v-icon>
                            </v-col>
                            <v-col cols="10"> 1 usuario </v-col>
                            <v-col cols="2" class="text-center pb-3"> 
                                <v-icon small class="yellow--text text--accent-4">mdi-check-circle-outline</v-icon>
                            </v-col>
                            <v-col cols="10"> 1 documento certificado </v-col>
                            <v-col cols="2" class="text-center pb-3"> 
                                <v-icon small class="yellow--text text--accent-4">mdi-check-circle-outline</v-icon>
                            </v-col>
                            <v-col cols="10"> 10 GB almacenamiento </v-col>
                            <v-col cols="2" class="text-center pb-3"> 
                                <v-icon small class="yellow--text text--accent-4">mdi-check-circle-outline</v-icon>
                            </v-col>
                            <v-col cols="10">  Cifrado de documentos end-to-end </v-col>
                        </v-row>                        
                    </div>
                    <br><br><br>
                </v-card-text>
                <v-card-actions class="text-center">
                    <v-spacer></v-spacer>
                    <v-btn class="cincel-yellow-btn" 
                        :disabled="activePlan.name == 'base' || !aviablePlan"
                        @click="$router.push('/client/home')">
                            <span v-if="activePlan.name == 'base'">
                                Tu plan
                            </span>
                            <span v-else>
                                Comenzar plan
                            </span>
                        </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-col>
        <v-col cols="12" sm="5"  lg="3">
            <v-card class="plan-card" :class="{'active-plan':activePlan.name == 'genesis'}">
                <v-card-text style="height:296px" >
                    <div class="plan-title">
                        Oro
                    </div>
                    <div class="plan-price">
                        <span v-if="selectedPeriod == 0">
                            {{GenesisPlan.subscription_plans[selectedPeriod].amount/100 | currency}}
                        </span>
                        <span v-else>
                            {{(GenesisPlan.subscription_plans[selectedPeriod].amount/100)/12 | currency}}
                        </span>
                        </div>
                    <div class="plan-description">
                        <v-row row wrap no-gutters="">
                            <v-col cols="2" class="text-center pb-3"> 
                                <v-icon small class="yellow--text text--accent-4">mdi-check-circle-outline</v-icon>
                            </v-col>
                            <v-col cols="10"> 3 usuarios </v-col>
                            <v-col cols="2" class="text-center pb-3"> 
                                <v-icon small class="yellow--text text--accent-4">mdi-check-circle-outline</v-icon>
                            </v-col>
                            <v-col cols="10"> 10 documento certificado </v-col>
                            <v-col cols="2" class="text-center pb-3"> 
                                <v-icon small class="yellow--text text--accent-4">mdi-check-circle-outline</v-icon>
                            </v-col>
                            <v-col cols="10"> 200 GB almacenamiento </v-col>
                            <v-col cols="2" class="text-center pb-3"> 
                                <v-icon small class="yellow--text text--accent-4">mdi-check-circle-outline</v-icon>
                            </v-col>
                            <v-col cols="10">  Cifrado de documentos end-to-end </v-col>
                            <v-col cols="2" class="text-center pb-3"> 
                                <v-icon small class="yellow--text text--accent-4">mdi-check-circle-outline</v-icon>
                            </v-col>
                            <v-col cols="10"> Precio adicional por usuario $250 MXN. </v-col>
                        </v-row>                        
                    </div>
                </v-card-text>
                <v-card-actions class="text-center" >
                    <v-spacer></v-spacer>
                    <v-btn class="cincel-yellow-btn" 
                        :disabled="activePlan.name == 'genesis' || !aviablePlan"
                         @click="dataToPay(GenesisPlan.subscription_plans[selectedPeriod])">
                        <span v-if="activePlan.name == 'genesis'">
                            Tu plan
                        </span>
                        <span v-else>
                            Comenzar plan
                        </span>
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-col>
        <v-col cols="12" sm="5"  lg="3">
            <v-card class="plan-card" :class="{'active-plan':activePlan.name == 'stone'}">
                <v-card-text style="height:296px">
                    <div class="plan-title">
                        Diamante
                    </div>
                    <div class="plan-price">
                        <span v-if="selectedPeriod == 0">
                            {{StonePlan.subscription_plans[selectedPeriod].amount/100 | currency }}
                        </span>
                        <span v-else>
                            {{(StonePlan.subscription_plans[selectedPeriod].amount/100)/12 | currency }}
                        </span>
                        
                    </div>
                    <div class="plan-description">
                        <v-row row wrap no-gutters="">
                            <v-col cols="2" class="text-center pb-3"> 
                                <v-icon small class="yellow--text text--accent-4">mdi-check-circle-outline</v-icon>
                            </v-col>
                            <v-col cols="10"> 6 usuarios </v-col>
                            <v-col cols="2" class="text-center pb-3"> 
                                <v-icon small class="yellow--text text--accent-4">mdi-check-circle-outline</v-icon>
                            </v-col>
                            <v-col cols="10"> 25 documento certificado </v-col>
                            <v-col cols="2" class="text-center pb-3"> 
                                <v-icon small class="yellow--text text--accent-4">mdi-check-circle-outline</v-icon>
                            </v-col>
                            <v-col cols="10"> 1 TB almacenamiento </v-col>
                            <v-col cols="2" class="text-center pb-3"> 
                                <v-icon small class="yellow--text text--accent-4">mdi-check-circle-outline</v-icon>
                            </v-col>
                            <v-col cols="10">  Cifrado de documentos end-to-end </v-col>
                            <v-col cols="2" class="text-center pb-3"> 
                                <v-icon small class="yellow--text text--accent-4">mdi-check-circle-outline</v-icon>
                            </v-col>
                            <v-col cols="10"> Precio adicional por usuario $250 MXN. </v-col>
                        </v-row>                        
                    </div>
                </v-card-text>
                <v-card-actions class="text-center">
                    <v-spacer></v-spacer>
                    <v-btn class="cincel-yellow-btn" 
                        :disabled="activePlan.name == 'stone' || !aviablePlan"
                         @click="dataToPay(StonePlan.subscription_plans[selectedPeriod])">
                        <span v-if="activePlan.name == 'stone'">
                            Tu plan
                        </span>
                        <span v-else>
                            Comenzar plan
                        </span>
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-col>
        <v-col cols="12" sm="5"  lg="3" v-if="false">
            <v-card class="plan-card">
                <v-card-text style="height:296px">
                    <div class="plan-title">
                       Engrave
                    </div>
                    <div class="text-center plan-description pt-1 pb-4 font-weight-bold">Contactanos para cotizar</div>
                    <div class="plan-description">
                        <v-row row wrap no-gutters="">
                            <v-col cols="2" class="text-center pb-3"> 
                                <v-icon small class="yellow--text text--accent-4">mdi-check-circle-outline</v-icon>
                            </v-col>
                            <v-col cols="10"> usuarios incluidos </v-col>
                            <v-col cols="2" class="text-center pb-3"> 
                                <v-icon small class="yellow--text text--accent-4">mdi-check-circle-outline</v-icon>
                            </v-col>
                            <v-col cols="10"> documentos certificados </v-col>
                            <v-col cols="2" class="text-center pb-3"> 
                                <v-icon small class="yellow--text text--accent-4">mdi-check-circle-outline</v-icon>
                            </v-col>
                            <v-col cols="10"> almacenamiento cloud </v-col>
                            <v-col cols="2" class="text-center pb-3"> 
                                <v-icon small class="yellow--text text--accent-4">mdi-check-circle-outline</v-icon>
                            </v-col>
                            <v-col cols="10">  Cifrado de documentos end-to-end </v-col>
                            <v-col cols="2" class="text-center pb-3"> 
                                <v-icon small class="yellow--text text--accent-4">mdi-check-circle-outline</v-icon>
                            </v-col>
                            <v-col cols="10"> Precio por usuario.<br><br> </v-col>
                        </v-row>                        
                    </div>
                    <div class="text-center py-5" v-if="false">
                        <v-btn class="cincel-yellow-btn">Cotizar plan</v-btn>
                    </div>
                </v-card-text>
                <v-card-actions class="text-center">
                    <v-spacer></v-spacer>
                    <v-btn class="cincel-yellow-btn">Cotizar plan</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    activePlan: {
      type: Object,
      default: {}
    }
  },
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
    async dataToPay(values) {
      //console.log(values);
      let dataPayment = await this.$store.dispatch("payment/dataPayments", {
        data: values
      });
    }
  },
  computed: {
    BasicPlan() {
      let plans = this.$store.getters["subscriptions/getPlansInfo"];
      //console.log(plans);
      return plans.filter(p => p.name == "basic");
    },
    GenesisPlan() {
      let plans = this.$store.getters["subscriptions/getPlansInfo"];
      //console.log(plans.filter(p =>  p.name == 'genesis'));
      return plans.filter(p => p.name == "genesis")[0];
    },
    StonePlan() {
      let plans = this.$store.getters["subscriptions/getPlansInfo"];
      //console.log(plans);
      return plans.filter(p => p.name == "stone")[0];
    },
    aviablePlan() {
      if (this.activePlan.type == "premium") return false;
      else return true;
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

.active-plan {
  background-color: #dfe2e6;
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.05) !important;
}
/*
.plan-card.active-plan > .v-card__text > * {
    color:#fff !important;
}
*/
.selected-plan {
  background-color: #373b3f;
  box-shadow: 0 0 40px 5px rgba(0, 0, 0, 0.2) !important;
  border: solid 1px #f6c434;
  color: #fff !important;
}

.plan-card.selected-plan > .v-card__text > * {
  color: #fff !important;
}
</style>