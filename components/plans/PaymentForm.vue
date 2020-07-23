<template>
  <div>
    <v-card elvation="0" class="transparent">
      <v-card-text>
        <v-form ref="payment_form" autocomplete="off">
          <Stripe :spk="spk">
            <Elements>
              <v-row>
                <v-col cols="12">
                  <div class="form-label">Numero de tarjeta</div>
                  <card-number
                    ref="cardNumber"
                    :options="stripeOptions"
                    :rules="[rules.required]"
                    @change="number = $event.complete"
                  ></card-number>
                </v-col>
                <v-col cols="6">
                  <div class="form-label">Fecha de expiración</div>
                  <card-expiry
                    ref="cardExpiry"
                    :options="stripeOptions"
                    :rules="[rules.required]"
                    @change="expiry = $event.complete"
                  ></card-expiry>
                </v-col>
                <v-col cols="6">
                  <div class="form-label">Codigo de seguridad</div>
                  <card-cvc
                    ref="cardCvc"
                    :options="stripeOptions"
                    :rules="[rules.required]"
                    @change="cvc = $event.complete"
                  ></card-cvc>
                </v-col>
                <v-card-actions>
                  <v-btn @click="clearForm" text :disabled="!aviableSaving || loading">Limpiar</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn :loading="loading" @click="saveItem" text :disbable="!aviableSaving">Pagar</v-btn>
                </v-card-actions>
              </v-row>
            </Elements>
          </Stripe>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import {
  Stripe,
  Elements,
  CardNumber,
  CardCvc,
  CardExpiry,
  getStripe
} from "@kenkou/vue-stripe-elements";
import rules from "~/assets/js/rules";
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    spk: {
      type: String
    }
  },
  components: {
    Stripe,
    Elements,
    CardNumber,
    CardCvc,
    CardExpiry
  },
  mounted() {
    this.clearForm();
  },
  data() {
    return {
      rules,
      complete: false,
      paymentData: {
        number: false,
        expiry: false,
        cvc: false,
        cardNumber: false
      },
      number: false,
      expiry: false,
      cvc: false,
      stripeOptions: {
        // see https://stripe.com/docs/stripe.js#element-options for details
        style: {
          base: {
            color: "#303238",
            fontSize: "12px",
            fontSmoothing: "antialiased",
            "::placeholder": {
              color: "#ccc"
            }
          }
        },
        valid: false
      }
    };
  },
  methods: {
    switchPayment() {
      this.payMethod();
    },
    async payMethod() {},
    clearForm() {
      (this.number = false), (this.cvc = false), (this.expiry = false);

      //this.$ref.payment_form.reserValidation();
    },
    async saveItem() {
      const cardNumber = this.$refs.cardNumber.element();
      this.$emit("saveItem", cardNumber);
    },
    update() {
      this.complete = this.number && this.expiry && this.cvc;
      // update the "valid" parent's property
      this.$emit("update:valid", this.complete);
      // field completed, find field to focus next
      if (this.number) {
        if (!this.expiry) {
          this.$refs.cardExpiry.focus();
        } else if (!this.cvc) {
          this.$refs.cardCvc.focus();
        }
      } else if (this.expiry) {
        if (!this.cvc) {
          this.$refs.cardCvc.focus();
        } else if (!this.number) {
          this.$refs.cardNumber.focus();
        }
      }
    }
  },
  computed: {
    aviableSaving() {
      if (!this.number && !this.expiry && !this.cvc) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
<style scoped>
</style>