export const state = () => ({
    survey: {
    }
})
export const mutations = {
    setSurvey(state,data){
        state.survey = data;
        console.log('esto es lo que hay %o',state.survey)
    },
  };

export const actions = {
    socket_newMessage(cxt, data) { 
        console.log('Mensaje recibido frontA ', data)
        console.log('data llegando %o', data.survey.data)
        cxt.commit("setSurvey", data.survey.data)
    },
    socket_newVote(cxt, data) { 
        
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