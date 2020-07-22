import { api } from "~/assets/js/helpers"
const state = () => ({
    plans: {}
});

const  mutations = {
    setPlans(state, plans) {
        state.plans = plans;
    }
}

const actions = {
    async fetchPlans(vuexContext, payload) {
        let postResponse = await api.get(this, '/plan_products')
        if (postResponse.ok) {
            console.log("postResponse??? %o", postResponse)
            let processedPlan=[]
            for (let i = 0; i < postResponse.payload.length; i++) {
                let size;              
                for (let x = 0; x < postResponse.payload[i].subscription_plans.length; x++) {
                    if (postResponse.payload[i].name != 'base') {
                        
                    if (postResponse.payload[i].subscription_plans[x].status == "active") {
                        let  processedPlanObj = {
                            id: postResponse.payload[i].id
                       }
                        processedPlanObj.name = postResponse.payload[i].name + ' '+postResponse.payload[i].subscription_plans[x].name,
                        processedPlanObj.id = postResponse.payload[i].subscription_plans[x].id,
                        processedPlanObj.amount = postResponse.payload[i].subscription_plans[x].amount
                        //console.log("valors process obj %o", processedPlanObj)
                        processedPlan.push(processedPlanObj)
                        }
                    }
                    }
            }
            vuexContext.commit('setPlans',processedPlan)
        }
        
        return postResponse
        }
       
    }

const getters = {
    getAllPlans: state => {
        return state.plans
    }
}

const plansModule = {
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
}

export default plansModule;