import { api } from "~/assets/js/helpers"
const state = () => ({
    plans: [],
    documents: []
});

const  mutations = {
    setPlans(state, plans) {
        state.plans = plans;
    },
    setDocuments(state, documents) {
        state.documents = documents;
    }
}

const actions = {
    async fetchPlans(vuexContext, payload) {
        let postResponse = await api.get(this, '/plan_products')
        if (postResponse.ok) {
            let processedPlan=[]
            for (let i = 0; i < postResponse.payload.length; i++) {              
                for (let x = 0; x < postResponse.payload[i].subscription_plans.length; x++) {
                    if (postResponse.payload[i].name != 'base') {
                        
                    if (postResponse.payload[i].subscription_plans[x].status == "active") {
                        let  processedPlanObj = {
                            id: postResponse.payload[i].id,
                            extraPayment:false
                       }
                        processedPlanObj.name = postResponse.payload[i].name + ' '+postResponse.payload[i].subscription_plans[x].name,
                        processedPlanObj.id = postResponse.payload[i].subscription_plans[x].id,
                        processedPlanObj.amount = postResponse.payload[i].subscription_plans[x].amount
                        processedPlan.push(processedPlanObj)
                        }
                    }
                    }
            }
            vuexContext.commit('setPlans',processedPlan)
        }
        
        return postResponse
    },
    async fetchDocuments(vuexContext, payload) {
        let postResponse = await api.get(this, '/benefits_packets_plans')
        if (postResponse.ok) {
            let processedPacket = []
            for (let i = 0; i < postResponse.payload.length; i++){
                if (postResponse.payload[i].status == 'active') {
                    let processedPacketObject = {
                        id: postResponse.payload[i].id,
                        name: postResponse.payload[i].name,
                        amount: postResponse.payload[i].amount,
                        extraPayment: true
                    }
                    processedPacket.push(processedPacketObject)
                }
            }
            vuexContext.commit('setDocuments', processedPacket)
            }
    },
       
    }

const getters = {
    getAllPlans: state => {
        return state.plans
    },
    getAllDocuments: state => {
        return state.documents
    }
}

const plansModule = {
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
}

export default plansModule;