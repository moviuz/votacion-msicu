import { statement } from "@babel/template";

export const state = () => ({
    survey: {
    },
    votacion1: 0,
    voto: 0,
    votacion3: 0,
    isDisable: false

})
export const mutations = {
    setSurvey(state,data){
        state.survey = data;
        //console.log('esto es lo que hay %o',state.survey)
    },
    setVotacion1(state, data) { 
        //console.log("state votacion $o", data)
        state.votacion1 += data;
    },
    setVotacion2(state, data) { 
        state.voto += data;
    },
    setVotacion3(state, data) { 
        state.votacion3 +=data
    },
    defaultValues(state) {
        state.votacion1 = 0,
        state.voto = 0,
        state.votacion3 = 0;
    },
    setDisable(state,data) { 
        state.isDisable = data
    }
        
  };

export const actions = {
    socket_newMessage(cxt, data) { 
        console.log('Mensaje recibido frontA ', data)
        console.log('data llegando %o', data.survey.data)
        cxt.commit("setSurvey", data.survey.data)
        cxt.commit("setDisable", false)

        
    },
    socket_newVote1(cxt, data) { 
        console.log("votaciondata %o", data)
        cxt.commit("setVotacion1", data)
        //cxt.commit("setVotacion2", data)
    },
    socket_newVote2(cxt, data) { 
        console.log("votaciondata %o", data)
        cxt.commit("setVotacion2",data)
    },
    socket_newVote3(cxt, data) { 
        console.log("votaciondata %o", data)
        cxt.commit("setVotacion3",data)
    }
} 

export const getters = {
    getSurvey(state){
        return state.survey;
      },
} 

const socketModule = {
    state:state,
    mutations:mutations,
    actions:actions,
    getters:getters
};
export default socketModule