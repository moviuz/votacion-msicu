import { api } from "~/assets/js/helpers"
const state = () => ({
    count: 0
})

export const mutations = {

}

export const actions = {
    async tryLogin(vuexContext, payload) { 
        console.log(payload)
        let postResponse = await api.post(this,"/user/login", {
            email: payload.email,
            password: payload.password
        }).catch((error) => { 
            vuexContext.dispatch("alerts/addErrorAlert", error.message || error, {root:true})
        })
        console.log(postResponse)
        if (postResponse.intercepted === true) {
            if (postResponse.message) { 
                vuexContext.dispatch('alerts/addSuccessAlert', postResponse.payload.message, {root:true})
            }
        } 
    },
    async register(vuexContext,payload) { 
        console.log(payload)
        let postResponse = await api.post(this, "/user", {
            email: payload.email,
            password: payload.password,
            name: payload.name
        }).catch((error) => { 
            console.log(error)
            vuexContext.dispatch('alerts/addErrorAlert', error.message || error, {root:true})
        })
        console.log('miraesto %o',postResponse)
        if (postResponse.intercepted === true) {
            if (postResponse.message) { 
                vuexContext.dispatch('alerts/addSuccessAlert', postResponse.payload.message, {root:true})
            }
        } 
    }
}

const getters = {
}

const loginModule = {
    state: state,
    mutations: mutations,
    actions: actions,
    getters:getters
}

export default loginModule;
