import { api } from "~/assets/js/helpers"
export const state = () => ({
    count: 0,
    token:null,
    loggedIn:null,
})

export const mutations = {
    setToken(state,token){
        state.token = token;
        state.loggedIn = true;
      },
}

export const actions = {
    async tryLogin(vuexContext, payload) { 
        console.log(payload)
        let postResponse = await api.post(this,"/user/login", {
            email: payload.email,
            password: payload.password
        }).catch((error) => { 
            console.log('error login %o', error)
            vuexContext.dispatch("alerts/addErrorAlert", error.message || error, {root:true})
        })
        console.log(postResponse)
        if (postResponse.intercepted === true) {
            if (postResponse.payload.userData) { 
                vuexContext.dispatch('alerts/addSuccessAlert', 'Bienvenido', { root: true })
                vuexContext.commit("setToken",postResponse.payload.token)
                this.$router.push("/")

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

export const getters = {
    isAuthenticated(state) {
        return state.loggedIn;
    },
}

const loginModule = {
    state: state,
    mutations: mutations,
    actions: actions,
    getters:getters
}

export default loginModule;
