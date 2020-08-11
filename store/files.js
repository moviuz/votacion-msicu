import { api } from "~/assets/js/helpers"
import { signersOfFileByStage } from '~/assets/js/helpers';

const state = () => ({
    files: [],
    newFile: {},
    document: {},
    fileBase: "",
    signers: [],
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
    },
    setSigners(state, data) {
        state.signers = [...data]
    }
}

const actions = {
    //Funciones 
    async fetchFiles(vuexContext, payload) {
        let currentUser = vuexContext.rootGetters['auth/currentUser'];
        let currentOrganization = vuexContext.rootGetters['organizations/currentOrganization'];
        console.log("valor de currentOrganization %o", currentOrganization)
        let query;
        if (currentOrganization.id == 0) {
            query = "/users/" + currentUser.id + "/documents";
        } else {
            query = "users/" + currentUser.id + "/documents?organization_id=" + currentOrganization.id;
        }

        let postResponse = await api.get(this, query)
        if (postResponse.ok) {
            vuexContext.commit("setFiles", postResponse.payload)
        }
        return postResponse
        /*if(currentOrganization.id == 0){
            let organizations = vuexContext.rootGetters['organizations/userOrganizations'];
            vuexContext.commit("setFiles", postResponse.payload)
            //documents = documents.filter(d => d.owner_type == 'User' || organizations.findIndex(o => o.id == d.owner_id) == -1)
        }     */  
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
        console.log("entrar a invitacion")
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
    async getDocument(vuexContext, payload) {
        let queryToken = vuexContext.rootGetters['auth/token'];
        let documentData = vuexContext.getters.getDocument;
        let currentSigner = vuexContext.rootGetters['auth/currentUser']
        let path = '/documents/' + documentData.id;
        let postParams = {
            token:queryToken,
            signer_id:currentSigner.id
        }
        let postResponse = await api.get(this, path, postParams);
        if (postResponse.ok) {
            let rawDocument = postResponse.payload;
            let lastVersionFile = rawDocument.files.find(d => d.version == rawDocument.last_version);
            let signersByStage = signersOfFileByStage(rawDocument, lastVersionFile);
            rawDocument.last_version_file = { ...lastVersionFile };
            vuexContext.commit('setDocument',rawDocument);
            vuexContext.commit("setSigners", signersByStage)

        }
    },
    async confirmDocumentSigners(vuexContext, payload) {
        let documentData = vuexContext.getters.getDocument;
        let firmantes = await vuexContext.dispatch("addSignersToDocument")
        if (!firmantes) return false
        let path='/documents/'+documentData.id
        let putResponse = await api.put(this, path, { active: true })
        if (putResponse.ok) {
            vuexContext.dispatch('alerts/addSuccessAlert', 'Documento correctamente configurado', { root: true })
        } else return false
    },
    async addSignersToDocument(vuexContext, payload) {
        let signers = vuexContext.getters.externalSigners;
        let documentData = vuexContext.getters.getDocument;
        let newSigners = signers.reduce((acc, etapa) => acc.concat(etapa), [])
        newSigners = newSigners.filter(signer => !signer.idInvitation)
        let path = '/documents/'+documentData.id+'/batch_invitations'
        let postResponse = await api.post(this, path, { invitations: newSigners })
        if (postResponse.ok) {
            return true
        } else return false
    },
    async activateDocument(vuexContext, payload) {
        let documentData = vuexContext.getters.getDocument;
        let path = '/documents' / +documentData.id
        let putResponse = await api.put(this, path, { active: true })
        if (putResponse.ok) {
            vuexContext.dispatch('alerts/addSuccessAlert', 'Documento correctamente configurado', { root: true })
        }else return false
    },
    async updateVersionDocument(vuexContext) {
        let file = vuexContext.getters.getFileBase;
        let documentData = vuexContext.getters.getDocument;
        let path = '/documents/' + documentData.id + '/files'
        let postParams = {
            doc: file,
            status: "unsigned"
        }
        let postResponse = await api.post(this, path , postParams)
        if (postResponse.ok) {
            let invitation = await vuexContext.dispatch('addInvitationToDocument')
            console.log("valor de invitation %o", invitation)
             if (invitation.ok == true) {
                vuexContext.dispatch('alerts/addSuccessAlert', 'Se genero una nueva version el documento', { root: true })
            }
        }

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
    },
    externalSigners: state => {
        return state.signers
    },
}

const fileModule = {
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
};

export default fileModule;
