<template>
  <ApiLayout
    :items="plans"
    itemsName="plans"
    :formOpen="formOpen"
    :selectedItem="selectedPlan"
    :rendering="rendering"
    title="Api Planes"
    @editItem="editItem"
    @deleteItem="deleteItem"
    @closeForm="closeForm"
    @refresh="refresh"
  >
    <template slot="form-content">
      <PaymentForm @saveItem="saveItem" @loading="loading" :spk="spk"></PaymentForm>
    </template>
  </ApiLayout>
</template>
<script>
import { getStripe, Stripe } from "@kenkou/vue-stripe-elements";
import PaymentForm from "~/components/plans/PaymentForm";
export default {
  components: {
    PaymentForm
  },
  data() {
    return {
      Stripe,
      selectedPlan: null,
      formOpen: false,
      rendering: true,
      loading: false,
      spk: null,
      planData: {}
    };
  },
  beforeMount() {
    this.getTokenStripeStore();
  },
  async mounted() {
    this.rendering = true;
    await this.refresh();
    await this.stripeService();
    this.rendering = false;
  },
  methods: {
    async refresh() {
      let fetchPlans = await this.$store.dispatch("plans/fetchPlans", "", {
        root: true
      });
      let fetchDocuments = await this.$store.dispatch(
        "plans/fetchDocuments",
        "",
        { root: true }
      );
      return true;
    },
    editItem(item) {
      this.formOpen = false;
      //console.log("PLAN DATA %o", item);
      this.planData = item;
      this.selectedPlan = item;
      this.formOpen = true;
    },
    closeForm(item) {
      this.selectedPlan = null;
      this.formOpen = false;
    },
    deleteItem(item) {},
    async saveItem(item) {
      await this.$store.dispatch("payments/setCurrentPlan", this.planData, {
        root: true
      });
      const stripe = await getStripe();
      //false = son las subscripciones
      if (this.planData.extraPayment == false) {
        const paymentStripe = await stripe.createPaymentMethod({
          type: "card",
          card: item
        });
        await this.$store.dispatch("payments/setPaymentStripe", paymentStripe, {
          root: true
        });
        let paymentEndPoint = await this.$store.dispatch(
          "payments/paymentMethod"
        );
      } else {
        //Si entra aqui quiere decir que se pagara un paquete de documentos
        let paymentIntentBack = await this.$store.dispatch(
          "payments/createPaymentIntent",
          { root: true }
        );

        let submitPayment = await stripe.confirmCardPayment(
          paymentIntentBack.payload.client_secret,
          {
            payment_method: {
              card: item
            }
          }
        );
        if (submitPayment.paymentIntent.status == "succeeded") {
          this.$store.dispatch(
            "alerts/addSuccessAlert",
            "Se ha realizado con exito el cobro",
            { root: true }
          );
        }
      }
    },
    async stripeService() {
      let tok = await this.$store.dispatch("payments/stipeToken", "", {
        root: true
      });
      this.getTokenStripeStore();
    },
    getTokenStripeStore() {
      this.spk = this.$store.getters["payments/getTokenStripe"];
    }
  },
  computed: {
    plans() {
      let documents = this.$store.getters["plans/getAllDocuments"];
      let plans = this.$store.getters["plans/getAllPlans"];
      return plans.concat(documents);
    }
  }
};
</script>
<style scoped>
</style>