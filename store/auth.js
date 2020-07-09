import { decodeJwt,api } from "~/assets/js/helpers"
//import parser from '~/assets/js/parsersApi'
import orgCincel from "~/data/defaultOrg";
const tokenName = "tokenCincel"
const expirationName = "expirationCincel"
const userName = "userCincel"


const state = () => ({
    token:null,
    user:null,
    account_limits:null,
    loggedIn:null,
});

const mutations = {
  setToken(state,token){
    state.token = token;
    state.loggedIn = true;
  },
  setUser(state,user){
      state.user = user;
      
  },
  setAccountLimits(state,limits){
      state.account_limits = limits;
  },

};

const actions = {
    async login(vuexContext,payload){
        let postResponse = await api.post(this,'/login',payload) //this.$axios.$post('/login', payload);
        if (postResponse.ok == true){
          await vuexContext.dispatch('saveLogin',postResponse.payload);
          await vuexContext.dispatch('suscriptions/planProducts',{},{root:true});
          this.$router.push("/")
          return true;
        } else {
          return false;
        }
    },
    async saveLogin(vuexContext,data){
      let tokenContent = decodeJwt(data.token);
      let tokenObj = {
          token: data.token,
          expiration: tokenContent.exp
      }

      //Almacenar info de user en session storage
      sessionStorage.setItem(tokenName,tokenObj.token)
      sessionStorage.setItem(expirationName,tokenObj.expiration) 
      
      //Almacenar usuario en session storage
      sessionStorage.setItem(userName,JSON.stringify({
          ...data.user,
          documents:[],
          organizations:[
              orgCincel,
              ...data.user.organizations,
          ],
      }))

      //Almacenar organizaciones del usuario en session storage
      sessionStorage.setItem('userOrganizations',
          JSON.stringify([orgCincel,
          ...data.user.organizations]));
      

      // guardamos token en store
      vuexContext.commit("setToken",tokenObj)

      //establecer token en todas las request de axios
      this.$axios.setToken(tokenObj.token,'Bearer')

      //inicializar usuario en store
      vuexContext.commit("setUser",data.user)
      await vuexContext.dispatch("sync/checkout",{},{root:true});
      //TODO: redireccionar con base en tipo de usuario
      //TODO: integrar invitaciones a organizacion y a firmas en un solo action de store e inicializar aqui 
      //TODO: Cerrar sesion al expirar el tiempo del token

      //inicializar timer para cerrar sesión con base en expiration
      // vuexContext.dispatch('setLogoutTimer',tokenObj.expiration)
      
      //contenido de token en user
      //data.token_content = tokenContent


      return true;
    },
    async initAuth(vuexContext){
      const token = sessionStorage.getItem(tokenName)
      const expiration = sessionStorage.getItem(expirationName) || 0;
      const user = JSON.parse(sessionStorage.getItem(userName)) || "";
      const currentOrg = JSON.parse(sessionStorage.getItem('currentOrg')) || orgCincel;
      const userOrganizations = JSON.parse(sessionStorage.getItem('userOrganizations')) || [orgCincel];
     
      // TODO preguntar que pedo con esto... jeje :)
      if(!token || new Date().getTime() > new Date(expiration).getTime()){
          console.log("expired or not found token")
          return null
      }

      //Seteamos store con parametros basicos para middleware de auth
      this.$axios.setToken(token,'Bearer')   //agregamos al token al header de axios
      vuexContext.commit("setToken",{token,expiration})
      vuexContext.commit("setUser",user)
      vuexContext.commit("organizations/setOrganizations",userOrganizations,{root:true});
      vuexContext.commit("organizations/setCurrentOrganization",currentOrg,{root:true});
      await vuexContext.dispatch("sync/checkout",{},{root:true});

      // aqui se hacen llamadas que requieren del token configurado en axios y 
      // del usuario en store

      const account_limits = await vuexContext.dispatch("getAccountLimits",{currentOrg:currentOrg});

      vuexContext.commit("setAccountLimits",account_limits);
     //const invitations = await vuexContext.dispatch("notifications/getNotifications",{},{root:true});
      //vuexContext.dispatch("setLogoutTimer",Number(expiration)) //timer para logout antes de que expire el token
   
      return token
    },
    async getAccountLimits(vuexContext,payload){
      let getResponse;
      if(payload.currentOrg.id == 0){
          //hablamos del contexto de cuenta y cincel...
          getResponse = await api.get(this,'/account_limits'); //await this.$axios.$get("/account_limits");
   
      } else {
          getResponse = await api.get(this,"/organizations/"+ payload.currentOrg.id +"/account_limits"); //await this.$axios.$get("/organizations/"+ payload.currentOrg.id +"/account_limits");
          //console.log("organization account limits",getResponse.payload);
      }
      return getResponse.payload;
  }
};

const getters = {
  token(state){
    //el valor real esta dentro de token
    return state.token ? state.token.token : null
  },
  tokenObj(state){
      return state.token
  },
  isAuthenticated(state) {
      return state.loggedIn;
  },
  currentUser(state){
      return state.user;
  },
  currentAccountLimits(state){
      return state.account_limits;
  }
};

const securityModule = {
    state:state,
    mutations:mutations,
    actions:actions,
    getters:getters
};
export default securityModule