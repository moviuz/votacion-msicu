import { api } from "~/assets/js/helpers"

const state = () => ({
    files: [],
    newFile: {},
    document: {},
    fileBase:""
});

const mutations = {
    setFiles(state, files) {
        state.files = files
    },
    setNewFile(state, newFile) {
        state.newFile = newFile
    },
    setDocument(state, document) {
        state.document = document
    },
    setFileBase(state, fileBase) {
        state.fileBase = fileBase
    }
}

const actions = {
    //Funciones 
    async fetchFiles(vuexContext, payload) {
        let currentUser = vuexContext.rootGetters['auth/currentUser'];
        let currentOrganization = vuexContext.rootGetters['organizations/currentOrganization'];
        let query;
        if (currentOrganization.id == 0) {
            query = "/users/" + currentUser.id + "/documents";
        } else {
            query = "users/" + currentUser.id + "/documents?organization_id=" + currentOrganization.id;
        }
        let postResponse = await api.get(this, query)

        if(currentOrganization.id == 0){
            let organizations = vuexContext.rootGetters['organizations/userOrganizations'];
            vuexContext.commit("setFiles", postResponse.payload)
            //documents = documents.filter(d => d.owner_type == 'User' || organizations.findIndex(o => o.id == d.owner_id) == -1)
          }        
    },
    async postDocument(vuexContext, payload) {
        let currentUser = vuexContext.rootGetters['auth/currentUser'];
        let currentOrganization = vuexContext.rootGetters['organizations/currentOrganization']; 
        let newFile = vuexContext.getters.getNewFile;
        let query
        let postParams = { name:newFile.name, description:newFile.description, status:newFile.status }
        if (currentOrganization.id != 0) {
            query = '/users/' + currentUser.id + '/documents?organization_id=' + currentOrganization.id;
        } else {
            query = '/users/' + currentUser.id + '/documents';
        }
        let postResponse = await api.post(this, query, postParams)
        return postResponse
    },

    async createFileOnDocument(vuexContext, payload) {     
        let documentData = vuexContext.getters.getDocument;
        let newFile = vuexContext.getters.getNewFile;
        let path = '/documents/' + documentData.id + '/files';
        let postParams = {doc: newFile.fileBase , status:"unsigned"}
        let postResponse = await api.post(this, path, postParams)
        if (postResponse.ok) {
            vuexContext.dispatch('alerts/addSuccessAlert', 'Se ha creado con exito el documento', { root: true })
            return postResponse;
        }
        return false;
    },

    async addInvitationToDocument(vuexContext, payload) {
        let documentData = vuexContext.getters.getDocument;
        let currentUser = vuexContext.rootGetters['auth/currentUser'];
        let path = 'users/' + currentUser.id + '/documents/' + documentData.id + '/invitations';
        let postParams = {
            invitate_name: currentUser.name,
            invitate_email: currentUser.email
        }
        let postResponse = await api.post(this, path, postParams)
        return postResponse
    },
    //Mutations a store
    async setNewFile(vuexContext, payload) {
        vuexContext.commit("setNewFile", payload);
    },
    async setDocument(vuexContext, payload) {
        vuexContext.commit("setDocument", payload)
    },
    async setFileBase(vuexContext, payload) {
        vuexContext.commit("setFileBase", payload)
    },
}

const getters = {
    getAllFiles: state => {
        return state.files;
    },
    getNewFile: state => {
        return state.newFile
    },
    getDocument: state => {
        return state.document
    },
    getFileBase: state => {
        return state.fileBase
    }
}

const fileModule = {
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
};

export default fileModule;
