import { api } from "~/assets/js/helpers"
import orgCincel from "~/data/defaultOrg";
import { updateExpression } from "@babel/types";
const state = () => ({
    currentOrganization:orgCincel,
    currentOrganizationUsers:[],
    currentOrganizationInvites:[],
    organizations:[],
    invitation:[],
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
  async getUserByOrganization(vuexContext, payload) {
    let usersOrganizationPath = '/organizations/' + payload.id + '/users'
    let  usersOrganization = await api.get(this, usersOrganizationPath);
      if (usersOrganization.ok) {
      vuexContext.commit('setCurrentOrganizationUsers', usersOrganization.payload)
    }
    return usersOrganization
  },
  /*async deleterOrganization(vuexContext, payload) {
    let delResponse = await api.delete(this,)
  }*/
  async sendInvitationOrganization(vuexContext, payload) {
    let postParams = {
      invitate_email :payload.email,
      message: "Acepta la invitacion para ser miembro de mi equipo de trabajo"
    };
   let  invitationPath = 'organizations/' +payload.ordanizationId +'/organization_invitations/'
    let postResponse = await api.post(this, invitationPath, postParams);
    if (!postResponse && postResponse.ok) {
      vuexContext.dispatch('alerts/addSuccessAlert', 'Se ha enviado con exito la invitacion', { root: true })
      console.log("RESPUESTA DE INVITACION PERMISO %o", postResponse)
    /*  let permissionsRequest = paylod.permissions.map(function (permiso) {
        return {
          organization_invitation_id:postRes,...permiso
        }
      })*/
    }
    return postResponse;
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
    }
};
const organizationModule = {
    state:state,
    mutations:mutations,
    actions:actions,
    getters:getters,
};
export default organizationModule;