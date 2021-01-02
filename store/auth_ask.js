import { api } from "~/assets/js/helpers"
const state = () => ({
    count: 0
})

export const mutations = {

}

export const actions = {
    async tryLogin(payload) { 
        console.log(payload)
        let postResponse = await api.post(this,"/user/login", {
            email: payload.email,
            password: payload.password
        }).catch((error) => { 
            this.$store.dispatch("alerts/addErrorAlert", error.message || error, {root:true})
        })
        if (postResponse.ok === false) {
            console.log("entro a false")
        } else { 
            console.log("estas logeado")
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
            this.$store.dispatch('alerts/addErrorAlert', error.message || error, {root:true})
        })
        if (postResponse.ok === false) {
            console.log('entro false registro')
        } else { 
            console.log('SALTO FALSE registro')
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
