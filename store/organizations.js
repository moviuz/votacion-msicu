import { api } from "~/assets/js/helpers"
import orgCincel from "~/data/defaultOrg";
import { updateExpression } from "@babel/types";
const state = () => ({
    currentOrganization:orgCincel,
    currentOrganizationUsers:[],
    currentOrganizationInvites:[],
    organizations:[],
    invitation: [],
    currentInvitation: []
});

const mutations = {
    setCurrentOrganization(state,organization){
        state.currentOrganization = organization;
        /*
        state.currentOrganization.active = true;
        let userOrganizations = state.organizations;
        for(let i in userOrganizations){
          if(userOrganizations[i].id != organization.id)
            userOrganizations[i].active = false
          else 
            userOrganizations[i].active = true;
        };
        */
        sessionStorage.setItem('currentOrg',JSON.stringify(organization))
        //state.organizations = userOrganizations;
    },
    setCurrentOrganizationUsers(state,users){
      state.currentOrganizationUsers = users;
    },
    setCurrentOrganizationInvites(state,users){
      state.currentOrganizationInvites = users;
    },
    setOrganizations(state,userOrganizations){
        //console.log(userOrganizations);
        state.organizations = userOrganizations;     
    },
    setInvitation(state,invitation){
      let inv = [];
      for (let i in invitation) {   
        if (invitation[i].status == "pending"){
          inv.push(invitation[i]);
        }
      }
      state.invitation = inv;  
    },
    setCurrentInvitation(state, invitation) {
      state.currentInvitation = invitation;
    }
};

const actions = {
  //Llamada para conseguir todas mis organizaciones ( es el renew para el JWT  del login , es la unica forma de obtener mis organizaciones)
  async fetchOrganizations(vuexContext, payload) {
    let postResponse = await api.post(this, '/login/renew')
    if (postResponse.ok) {
      await vuexContext.dispatch("auth/saveLogin", postResponse.payload,{root:true})
      }
    return postResponse
  },
  // Crea una organizacion
  async createOrganization(vuexContext, payload) {
    let postParams = {
      name: payload.name,
      imagotype: payload.imagotype
    }
    let createResponse = await api.post(this, '/organizations', postParams);
    if (createResponse && createResponse.ok) {
      vuexContext.dispatch('alerts/addSuccessAlert', 'se ha creado con exito la organizacion', {root:true})
    }
    return createResponse
  },
  // Manda a mutation una organizacion.
  async setCurrentOrganization(vuexContext,organization){
    vuexContext.commit('setCurrentOrganization',organization);
  },
  // Actualiza la informacion de una organizacion
  async updateOrganization(vuexContext, payload) {
    let postParams = {
      name: payload.name,
      imagotype: payload.imagotype
    } 
    let updateResponse = await api.put(this, '/organizations' + payload.organizationId, postParams);
    if (updateResponse && updateResponse.ok) {
      vuexContext.dispatch('alerts/addSuccessAlert','Se ha actualizado con exito la organizacion', {root:true})
    }
    return updateResponse
  },
  // Recupera a los usuarios registrados en una organizacion
  async getOrganizationUsers(vuexContext, payload) {
    let currentOrganization = vuexContext.getters.currentOrganization;
    let usersOrganizationPath = '/organizations/' + currentOrganization.id + '/users'
    let  usersOrganization = await api.get(this, usersOrganizationPath);
      if (usersOrganization.ok) {
      vuexContext.commit('setCurrentOrganizationUsers', usersOrganization.payload)
    }
    return usersOrganization
  },
  async getOrganizationInvitations(vuexContext, organization) {
    let currentOrganization = vuexContext.getters.currentOrganization;
    let invitations;
    if(currentOrganization.id != 0){
      invitations = await api.get(this,'/organizations/'+currentOrganization.id+'/organization_invitations', {});
      if (invitations.ok) {
        vuexContext.commit('setCurrentOrganizationInvites',invitations.payload);
      }
    }
    return invitations;
  },
  /*async deleterOrganization(vuexContext, payload) {
    let delResponse = await api.delete(this,)
  }*/
  async sendInvitationOrganization(vuexContext, payload) {
    // payload debe de traer los datos de invitacion, el unico requerido es el correo y los permisos, se asume que ya existe el array de permisos..
    let currentOrganization = vuexContext.getters.currentOrganization;
    let assignedPermission = false;
    let postParams = {
      invite_email :payload.email,
      invite_name:  payload.name,
      message: "Acepta la invitacion para ser miembro de mi equipo de trabajo"
    };
    if(currentOrganization.id != 0){
      let  invitationPath = 'organizations/' +currentOrganization.id +'/organization_invitations/'
      let postResponse = await api.post(this, invitationPath, postParams);
      if (!postResponse && postResponse.ok) {
        //vuexContext.dispatch('alerts/addSuccessAlert', 'Se ha enviado con exito la invitacion', { root: true })
        let permissionsRequest = paylod.permissions.map(function (permiso) {
          return {
            organization_invitation_id:postRes,...permiso
          }
        });
        assignedPermission =  await vuexContext.dispatch('addPermissionsInvitationOrganization',permissionsRequest);
      }
      console.log(postResponse,assignedPermission)
      return postResponse;
    }
    
  },
  // Asigna permisos a una invitacion a participar en organizacion
  async addPermissionsInvitationOrganization(vuexContext, payload) {
    let currentOrganization = vuexContext.getters.currentOrganization;
    //console.log(currentOrganization,payload);
    let path = '/organizations/'+currentOrganization.id+'/organization_permissions/batch';
    let invitationsReady = [];
    let postResponse = await api.post(this,path,{permissions:payload});
      if(postResponse.ok){
        vuexContext.dispatch('alerts/addSuccessAlert','Invitaciones creadas correctamente',{root:true})
      } 
      return postResponse.data.payload;
  },
  
  //Manda a mutations la invitacion seleccionada
  async setCurrentInvitation(vuexContext, invitation) {
    vuexContext.commit('setCurrentInvitation',invitation); 
  },
  


  async deleteInvitationFromOrganization(vuexContext, payload) {
    let currentInvitation = vuexContext.getters.currentInvitation;
    let delInvitation = await api.delete(this, 'organization_invitations/' + currentInvitation.id);
    if (delInvitation.ok == true) {
        vuexContext.dispatch('alerts/addSuccessAlert','Se ha eliminado la invitación', {root:true})
    }
    return delInvitation
  }
};


const getters = {
    currentOrganization:state=>{
        return state.currentOrganization;
    },
    getAllOrganizations: state => {
      return state.organizations
    },
    currentOrganizationUsers: state => {
      return state.currentOrganizationUsers
    },
    currentOrganizationInvites:state => {
      return state.currentOrganizationInvites;
    },
    currentInvitation:state => {
    return state.currentInvitation;
    }

};
const organizationModule = {
    state:state,
    mutations:mutations,
    actions:actions,
    getters:getters,
};
export default organizationModule;