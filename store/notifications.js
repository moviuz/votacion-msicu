import { api } from "~/assets/js/helpers"
const state = () => ({
    notifications: [],
    document: [],
    organization: [],
    invitation:{}
});

const mutations = {
    addInviteNotification(state, payload) {
        state.notifications = payload
    },
    setInvitationOrganization(state, invitation) {
        state.organization = invitation
    },
    setInvitationDocument(state, document) {
        state.document = document
    },
    setInvitation(state, invitation) {
        state.invitation = invitation
    }
};

const actions = {
    async getInvitationByUser(vuexContext, payload) {
        let path = 'users/organization_invitations'
        let getResponse = await api.get(this, path)
        if (getResponse.ok) {
            let processedInvitationOrganization = []
            for (let i = 0; i < getResponse.payload.length; i++) {
                let processedInvitation = {
                    name: "Organizacion" + " "+getResponse.payload[i].organization.name + " "+getResponse.payload[i].status,
                    id: getResponse.payload[i].id,
                    status: getResponse.payload[i].status,
                    type: 'organizacion',
                    document_id:'0'
                }
                processedInvitationOrganization.push(processedInvitation)
            }
            vuexContext.commit("setInvitationOrganization", processedInvitationOrganization)
        }
    },
    async getDocInvitation(vuexContext) {
        let currentUser = vuexContext.rootGetters['auth/currentUser'];
        let path = '/users/' + currentUser.id + "/invitations/received";
        let getResponse = await api.get(this, path)
         if (getResponse.ok) {
             let processedInvitationDocument = []
             for (let i = 0; i < getResponse.payload.length; i++){
                let processedInvitation = {
                    name: 'Documento' + " "+getResponse.payload[i].invite_name + " "+getResponse.payload[i].status,
                    id: getResponse.payload[i].id,
                    status: getResponse.payload[i].status,
                    type: 'documento',
                    document_id: getResponse.payload[i].document_id,
                 } 
                 processedInvitationDocument.push(processedInvitation)          
             }
             vuexContext.commit("setInvitationDocument", processedInvitationDocument)
        }
    },
    async getAllNotifications(vuexContext,payload){
        // let getResponse = 
     },
    
    async acceptInvitation(vuexContext) {
        let invitation = vuexContext.getters.getInvitation;
        let path = '/organization_invitations/' + invitation.id + '/accept'
        let putResponse = await api.put(this, path)
        if (putResponse.ok) {
            vuexContext.dispatch('alerts/addSuccessAlert', 'Invitacion a organizacion aceptada', { root: true })
            return putResponse
        }
        return false
    },

    async declineInvitation(vuexContext) {
        let invitation = vuexContext.getters.getInvitation;
        let path = '/organization_invitations/' + invitation.id + '/reject'
        let putResponse = await api.put(this, path)
        if (putResponse.ok) {
            vuexContext.dispatch('alerts/addSuccessAlert', 'Invitacion rechazada', { root: true })
            return putResponse
        }
        return false
    },

    //Mutations a store
    async setInvitation(vuexContext, payload) {
        vuexContext.commit('setInvitation', payload)
    }

};
const getters = {
    getNotifications: state => {
        return state.notifications;
    },
    getAllInvitationDocument: state => {
        return state.document
    },
    getAllInvitationOrganization: state => {
        return state.organization
    },
    getInvitation: state => {
        return state.invitation
    }
};
const notificationsModule = {
    state:state,
    mutations:mutations,
    actions:actions,
    getters:getters,
};
export default notificationsModule;