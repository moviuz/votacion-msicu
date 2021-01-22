import { api } from "~/assets/js/helpers"
export const state = () => ({

})

export const mutations = {

}

export const actions = {
    async creatSurvey(vuexContext, payload) { 
        let postResponse = await api.post(this,"/ask/create_survey", {
            question: payload.pregunta,
            answerOne: payload.consulta1,
            answerTwo: payload.consulta2,
            anwerTree:payload.consulta3,
        }).catch((error) => { 
            console.log('error login %o', error)
            vuexContext.dispatch("alerts/addErrorAlert", error.message || error, {root:true})
        })
        console.log(postResponse)
        if (postResponse.intercepted === true) {
            if (postResponse.payload.userData) { 
                vuexContext.dispatch('alerts/addSuccessAlert', 'Se creo una nuesva encuesta', { root: true })
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
