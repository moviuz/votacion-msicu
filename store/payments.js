import { api } from "~/assets/js/helpers"
const state = () => ({
    tokenStripe:'',
    paymentStripe: {},
    currentPlan: {},
})

const mutations = {
    setTokenStripe(state, data) {
        state.tokenStripe = data;
    },
    setPaymentStripe(state, idpayment) {
        state.paymentStripe = idpayment;
    },
    setCurrentPlan(state, plan) {
        state.currentPlan = plan;
    }
}

const actions = {
    async createPaymentIntent(vuexContext, payload) {
        
    },

    //hay que checar los errores de este methodo por lo que puede estar regresando
    async paymentMethod(vuexContext, payload) {
        let currentPlan = vuexContext.getters.getCurrentPlan;
        let paymentMethod = vuexContext.getters.getPaymentStripe;
        let postResponse = await api.post(this, '/users/subscriptions', {
            payment_method_id: paymentMethod.id,
            subscripion_plan_id: currentPlan.id,
            quantity: 1
        });
        if (postResponse && postResponse.ok) {
            vuexContext.dispatch('alerts/addSuccessAlert', 'Transacción realizada con éxito', { root: true });
        }
        return postResponse
    },

    async stipeToken(vuexContext, payload) {
        let stripeToken = await api.get(this, '/config');
        if (stripeToken.ok) {
            vuexContext.commit('setTokenStripe', stripeToken.payload.stripe_public_key)
        }
        return stripeToken;
    },
    //Manda mutations con el id de payment, generado con el servicio de stripe
    async setPaymentStripe(vuexContext, paymentStripe) {
        vuexContext.commit('setPaymentStripe', paymentStripe);
    },
    // Mando a mutations el objeto del plan seleccionado para procesar el pago con los datos necesarios
    async setCurrentPlan(vuexContext, plan) {
        vuexContext.commit('setCurrentPlan', plan);
    },
    async createPaymentIntent(vuexContext, payload) {
        let currentPlan = vuexContext.getters.getCurrentPlan;
        let postResponse = await api.post(this, '/users/benefits_packets/create_payment_intent', { benefits_packet_plan_id: currentPlan.id });
        if (postResponse.ok) {
            return postResponse
        }
        return false
    }
}

const getters = {
    getTokenStripe:state => {
        return state.tokenStripe;
    },
    getPaymentStripe:state => {
        return state.paymentStripe;
    },
    getCurrentPlan:state => {
        return state.currentPlan;
    }
}

const paymentModule = {
    state: state,
    mutations: mutations,
    actions: actions,
    getters:getters
}

export default paymentModule;
