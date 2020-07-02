
import orgCincel from "~/data/defaultOrg";
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

const actions = {};
const getters = {
    currentOrganization:state=>{
        return state.currentOrganization;
    }
};
const organizationModule = {
    state:state,
    mutations:mutations,
    actions:actions,
    getters:getters,
};
export default organizationModule;