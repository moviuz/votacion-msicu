import { api } from "~/assets/js/helpers"
const state = () => ({
    folders:[]
});


const mutations = {
    setFolders(state, folders) {
        state.folders = folders;
    }
}

const actions = {
    async createFolder(vuexContext, payload) {
        let postParams = {
            name:payload.name
        }
        if (payload.organizationId && payload.organizationId != 0 ){
            postParams.id = payload.organizationId
        }
        let createResponse = await api.post(this,'/folders',postParams);
        return createResponse
    },
    async fetchFolders(vuexContext,payload) {
        let fetchPath = '/folders'
        if(payload && payload.organizationId){
            fetchPath = fetchPath+'?organization_id='+payload.organizationId;
        }
        let allFolders = await api.get(this,fetchPath);
        if(allFolders.ok){
            vuexContext.commit('setFolders',allFolders.payload);
        }
        return allFolders;
    },
    async deleteFolder(vuexContext, payload) {
        let delFolder = await this.$axios.delete('/folders/' + payload);
        if (delFolder.ok == true) { 
            vuexContext.dispatch('alerts/addSuccessAlert', 'Se ha eliminado con exito el folder', {root:true})
        }
        
    }
}

const getters = {
    getAllFolders:state => {
        return state.folders;
    }
}

const foldersModule = {
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
}

export default foldersModule;