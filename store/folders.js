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
    // LLamada para conseguir todos los folders de mi cuenta o de una organizacion
    async fetchFolders(vuexContext,payload) {
        let fetchPath = '/folders';
        let currentOrg = vuexContext.rootGetters['organizations/currentOrganization'];
        if(currentOrg.id != 0){
            fetchPath = fetchPath+'?organization_id='+currentOrg.id;
        }
        let allFolders = await api.get(this,fetchPath);
        if(allFolders.ok){
            vuexContext.commit('setFolders',allFolders.payload);
        }
        return allFolders;
    },
    // llamada para crear folders en mi cuenta o una organizacion 
    async createFolder(vuexContext, payload) {
        let postParams = {
            name:payload.name
        }
        if (payload.organizationId && payload.organizationId != 0 ){
            postParams.id = payload.organizationId
        }
        let createResponse = await api.post(this,'/folders/',postParams);
        if(createResponse && createResponse.ok){
            vuexContext.dispatch('alerts/addSuccessAlert', 'Se ha creado con exito el folder', {root:true})
        }
        return createResponse
    },
    //Llamada para editar un folder de mi cuenta o una organizacion
    async updateFolder(vuexContext,payload){
        let putParams = { id:payload.id,name:payload.name};
        if(payload.organizationId && payload.organizationId != 0)
            putParams.organizationId = payload.organizationId;
        let updateResponse = await api.put(this,'/folders/'+putParams.id,putParams);
        if(updateResponse && updateResponse.ok){
            vuexContext.dispatch('alerts/addSuccessAlert', 'Se ha actualizado con exito el folder', {root:true})
        } 
        return updateResponse;
    },
    //Llamada para borrar folder de mi cuenta o una organizacion
    async deleteFolder(vuexContext, payload) {
        let delFolder = await api.delete(this,'/folders/' + payload.id,payload);
        if (delFolder.ok == true) { 
            vuexContext.dispatch('alerts/addSuccessAlert', 'Se ha eliminado con exito el folder', {root:true})
        }
        return delFolder;
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