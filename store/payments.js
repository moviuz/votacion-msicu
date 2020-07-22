import { api } from "~/assets/js/helpers"
const state = () => ({
    tokenStripe:''
})

const mutations = {
    setTokenStripe(state, data) {
        state.tokenStripe = data;
    }
}

const actions = {
    async createPaymentIntent(vuexContext, payload) {
        
    },

    async paymentMethod(vuexContext, payload) {
        
    },

    async stipeToken(vuexContext, payload) {
        let stripeToken = await api.get(this, '/config');
        if (stripeToken.ok) {
            vuexContext.commit('setTokenStripe', stripeToken.payload.stripe_public_key)
        }
        return stripeToken;
    }
}

const getters = {
    getTokenStripe: state => {
        return state.tokenStripe;
    }
}

const paymentModule = {
    state: state,
    mutations: mutations,
    actions: actions,
    getters:getters
}

export default paymentModule;
