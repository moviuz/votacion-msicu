<template>
  <div>
    <v-row no-gutters row wrap justify="center">
      <v-col cols="12" class="text-center pb-2">
        <div class="desktop-title">Paquetes de contratos de acuerdo a tus necesidades</div>
        <br />
        <div
          class="desktop-subtitle"
        >Todos nuestros paquetes contienen constancia de conservación NOM151.</div>
      </v-col>
    </v-row>
    <v-row row wrap justify="center">
      <v-col cols="12" sm="5" lg="3">
        <v-card class="extra-card">
          <v-card-text>
            <div class="plan-price pt-4">
              <span>{{Plan10.amount / 100 | currency}}</span>
            </div>
            <div class="pb-2">
              <br />
            </div>
            <div class="plan-description">
              <v-row row wrap no-gutters>
                <v-col cols="2" class="text-center pb-3">
                  <v-icon small class="yellow--text text--accent-4">mdi-check-circle-outline</v-icon>
                </v-col>
                <v-col cols="10">10 documentos</v-col>
                <v-col cols="2" class="text-center pb-3">
                  <v-icon small class="yellow--text text--accent-4">mdi-check-circle-outline</v-icon>
                </v-col>
                <v-col cols="10">Precio por documento: $ 100.00</v-col>
              </v-row>
            </div>
            <br />
            <br />
            <div class="text-center py-5">
              <v-btn @click="procespayment(Plan10.id)" class="cincel-yellow-btn">Agregar</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="5" lg="3">
        <v-card class="extra-card">
          <v-card-text>
            <div class="plan-price pt-4">
              <span>
                <span>{{Plan50.amount / 100 | currency}}</span>
              </span>
            </div>
            <div class="plan-description font-weight-bold text-center pb-2">10% de descuento</div>
            <div class="plan-description">
              <v-row row wrap no-gutters>
                <v-col cols="2" class="text-center pb-3">
                  <v-icon small class="yellow--text text--accent-4">mdi-check-circle-outline</v-icon>
                </v-col>
                <v-col cols="10">50 documentos</v-col>
                <v-col cols="2" class="text-center pb-3">
                  <v-icon small class="yellow--text text--accent-4">mdi-check-circle-outline</v-icon>
                </v-col>
                <v-col cols="10">Precio por documento: $ 100.00</v-col>
              </v-row>
            </div>
            <br />
            <br />
            <div class="text-center py-5">
              <v-btn @click="procespayment(Plan50.id)" class="cincel-yellow-btn">Agregar</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="5" lg="3">
        <v-card class="extra-card">
          <v-card-text>
            <div class="plan-price pt-4">
              <span>{{Plan100.amount / 100 | currency}}</span>
            </div>
            <div class="plan-description font-weight-bold text-center pb-2">30% de descuento</div>
            <div class="plan-description">
              <v-row row wrap no-gutters>
                <v-col cols="2" class="text-center pb-3">
                  <v-icon small class="yellow--text text--accent-4">mdi-check-circle-outline</v-icon>
                </v-col>
                <v-col cols="10">100 documentos</v-col>
                <v-col cols="2" class="text-center pb-3">
                  <v-icon small class="yellow--text text--accent-4">mdi-check-circle-outline</v-icon>
                </v-col>
                <v-col cols="10">Precio por documento: $ 70.00</v-col>
              </v-row>
            </div>
            <br />
            <br />
            <div class="text-center py-5">
              <v-btn @click="procespayment(Plan100.id)" class="cincel-yellow-btn">Agregar</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="5" lg="3">
        <v-card class="extra-card">
          <v-card-text>
            <div class="plan-price pt-4">
              <span>{{Plan500.amount / 100 | currency}}</span>
            </div>
            <div class="plan-description font-weight-bold text-center pb-2">60% de descuento</div>
            <div class="plan-description">
              <v-row row wrap no-gutters>
                <v-col cols="2" class="text-center pb-3">
                  <v-icon small class="yellow--text text--accent-4">mdi-check-circle-outline</v-icon>
                </v-col>
                <v-col cols="10">500 documentos</v-col>
                <v-col cols="2" class="text-center pb-3">
                  <v-icon small class="yellow--text text--accent-4">mdi-check-circle-outline</v-icon>
                </v-col>
                <v-col cols="10">Precio por documento: $ 40.00</v-col>
              </v-row>
            </div>
            <br />
            <br />
            <div class="text-center py-5">
              <v-btn @click="procespayment(Plan500.id)" class="cincel-yellow-btn">Agregar</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" class="text-center">
        <v-btn class="cincel-yellow-txt">Saltar este paso, y empezar mi plan ></v-btn>
        <br />¿Necesitas más de 500 documentos? Contáctanos para cotizar un plan a tu medida
        <v-btn class="cincel-border-btn">Contáctanos</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: ["user_plan"],
  methods: {
    async procespayment(idExtra) {
      //console.log("IDEXTRAPLANMETODO PAGAR %o", idExtra);
      let process = await this.$store.dispatch("payment/extraPayment", {
        extraPaymentId: idExtra
      });
    }
  },
  computed: {
    Plan500() {
      let extra = this.$store.getters["subscriptions/getExtraPayments"];
      return extra.filter(e => e.name == "signed_documents_500")[0];
    },
    Plan100() {
      let extra = this.$store.getters["subscriptions/getExtraPayments"];
      return extra.filter(e => e.name == "signed_documents_100")[0];
    },
    Plan50() {
      let extra = this.$store.getters["subscriptions/getExtraPayments"];
      return extra.filter(e => e.name == "signed_documents_50")[0];
    },
    Plan10() {
      let extra = this.$store.getters["subscriptions/getExtraPayments"];
      //console.log("extra component docyments %o", extra);
      //return extra;
      return extra.filter(e => e.name == "signed_documents_10")[0];
    }
  }
};
</script>

<style>
</style>