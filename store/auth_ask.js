import { api } from "~/assets/js/helpers"
export const state = () => ({
    count: 0,
    token:null,
    loggedIn: null,
    surveyAuth: {
        consulta1:null,
        consulta2:null,
        consulta3:null,
        pregunta:null
    }
})

export const mutations = {
    setToken(state, token) {
        state.token = token;
        state.loggedIn = true;
    },
    setSurvAth(state, data) { 
        state.surveyAuth = data;
    }

}

export const actions = {
    async tryLogin(vuexContext, payload) { 
        let postResponse = await api.post(this,"/user/login", {
            email: payload.email,
            password: payload.password
        }).catch((errors) => { 
            vuexContext.dispatch("alerts/addErrorAlert", error.message || error, {root:true})
        })
        if (postResponse.intercepted === true) {
            if (postResponse.payload.userData) { 
                vuexContext.dispatch('alerts/addSuccessAlert', 'Bienvenido', { root: true })
                vuexContext.commit("setToken", postResponse.payload.token)
                this.$axios.setToken(postResponse.payload.token)
                this.$router.push("/")

            }
        } 
    },
    async register(vuexContext,payload) { 
        let postResponse = await api.post(this, "/user", {
            email: payload.email,
            password: payload.password,
            name: payload.name
        }).catch((error) => { 
            vuexContext.dispatch('alerts/addErrorAlert', error.message || error, {root:true})
        })
        if (postResponse.ok == true) {
            //if (postResponse.message) { 
                vuexContext.dispatch('alerts/addSuccessAlert', postResponse.payload.message, {root:true})
            //}
        } 
    }
}

export const getters = {
    isAuthenticated(state) {
        return state.loggedIn;
    },
    getSurvAtuh(state) { 
        return state.surveyAuth;
    }
}

const loginModule = {
    state: state,
    mutations: mutations,
    actions: actions,
    getters:getters
}

export default loginModule;
