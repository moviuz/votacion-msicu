import Planes from '~/data/plans.js'
import { api } from "~/assets/js/helpers"
export const state = () => ({
    plans: [],
    documents: [],
    userPlans:[],
    extra: [],
    currentActivePlan:{}
});
// coment errro
export const mutations = {
    setGenesis(state,data){
        state.plans = data;
    },
    setPlans(state,data){
        state.plans = data;
    },
    setExtraDocuments(state, data) {
        state.extra = data;
       // state.documents = data;
    },
    setUserPlans(state,data){
        state.userPlans = data;
    },
    setCurrentActivePlan(state,data){
        state.currentActivePlan = data;
    }
};

export const actions = {
    async planProducts(vuexContext) {
        let response = await api.get(this,'/plan_products');
        if(response.ok && response.ok == true){
            console.log(response,Planes);
        }
        return response.payload;
    },

}

export const getters = {
    getPlanGenesis: state => {
        return state.plans
    },
    getPlansInfo: state => {
        return state.plans;
    },
    getExtraPayments: state => {
        return state.extra;
    },
    getUserPlans: state => {
        return state.userPlans;
    },
    getCurrentActivePlan:state => {
        return state.currentActivePlan;
    }
}

const subscriptionModule = {
    state:state,
    mutations:mutations,
    actions:actions,
    getters:getters,
};

export default subscriptionModule;