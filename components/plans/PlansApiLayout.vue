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
import PaymentForm from "~/components/plans/PaymentForm";
export default {
  components: {
    PaymentForm
  },
  data() {
    return {
      selectedPlan: null,
      formOpen: false,
      rendering: true,
      loading: false,
      spk: null
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
      return fetchPlans;
    },
    editItem(item) {
      this.formOpen = false;
      console.log("valor spk %o", this.spk);
      this.selectedPlan = item;
      this.formOpen = true;
    },
    closeForm(item) {
      this.selectedPlan = null;
      this.formOpen = false;
    },
    deleteItem(item) {},
    saveItem(item) {
      console.log("estas en save item de planes %o", item);
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
      return this.$store.getters["plans/getAllPlans"];
    }
  }
};
</script>
<style scoped>
</style>