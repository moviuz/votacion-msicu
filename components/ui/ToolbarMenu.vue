<template>
  <div class="">
    <v-badge
      class=""
              v-if="invitations && m_screenSize == 'lg'"
              style="z-index:3"
              bordered
              :value="invitations.length == 0 ? false:true"
              offset-x="25"
              color="error"
              :content="invitations.length"
              overlap>
              <v-menu  class="" offset-y :position-x="10" content-class="menu-toolbar" >
                <template v-slot:activator="{ on }">
                  
                    <v-btn outlined tile icon style="height:100%;;text-transform: capitalize!important; border:none!important" v-on="on">
                    <v-icon>mdi-bell</v-icon>
                    &nbsp;
                    <span >
                      
                    </span>
                    </v-btn>
                  
                </template>
                <v-list>
                  <v-list-item v-for="i in invitations" :key="'i'+i.id" >
                    <v-list-item-content>
                      <v-row no-gutters >
                        <v-col cols="2" align-content="center" >
                          <br>
                          <v-icon>mdi-plus-circle</v-icon>
                        </v-col>
                        <v-col cols="10">
                          <v-row no-gutters  >
                            <v-col cols="12" class="py-2">
                              {{i.sender.email}} quiere agregarte a su organización
                            </v-col>
                            <v-col cols="6" class="pb-1 text-center">
                              <v-btn small elevation="0" 
                                @click="acceptInvitation(i)"
                                class="btn-menu cincel-yellow-btn"> Aceptar</v-btn>
                            </v-col>
                            <v-col cols="6" class="text-center">
                              <v-btn small elevation="0" 
                              class="btn-menu cincel-border-btn"> Cancelar </v-btn>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider></v-divider>
                  <v-divider v-if="false"></v-divider>
                  <v-list-item v-if="invitations.length == 0">
                    <v-list-item-content>
                      <v-list-item-title class="text-center"> No hay notificaciones </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider></v-divider>
                  <v-list-item class="menu-all-notifications" nuxt link exact to="/client/notifications">
                    <v-list-item-content class="justify-center"> Ver todas las notificaciones </v-list-item-content>
                    
                  </v-list-item>
                
                </v-list>
              </v-menu>
            </v-badge>
            &nbsp;
            <v-divider  style="border-width: 0.6px!important;display:inline" vertical v-if="m_screenSize == 'lg'"></v-divider>
            &nbsp;
            <v-menu offset-y content-class="menu-toolbar" v-if="m_screenSize == 'lg'">
              <template v-slot:activator="{ on }">
                <v-btn outlined tile class="menu-btn" style="height:50px;text-transform:capitalize!important; border:none!important;" v-on="on">
                  <img :src=" userAvatar" style="width:26px;border-radius: 20px;max-height: 30px;" alt="">
                  &nbsp;
                  &nbsp;
                  <span v-if="m_screenSize == 'lg'">
                    {{userName }}
                  </span>
                  &nbsp;&nbsp;
                  <v-icon>mdi-chevron-down</v-icon>
                  
                  
                </v-btn>

              </template>
              <v-list>
                <v-list-item  to="/client/organizations" nuxt link  v-if="currentActivePlan && currentActivePlan.name != 'base'">
                  <v-list-item-title> Mis organizaciones </v-list-item-title>
                </v-list-item>
                <v-list-item to="/client/profile" nuxt link>
                  <v-list-item-title>  Perfil &nbsp;&nbsp; </v-list-item-title>
                </v-list-item>
                <v-list-item to="/client/plans/?upgrade=true" nuxt link exact>
                  <v-list-item-title>  Ver planes de pago &nbsp;&nbsp; </v-list-item-title>
                </v-list-item>
                <v-list-item to="/client/plans/users" nuxt link exact v-if="currentActivePlan && currentActivePlan.name != 'base'" >
                  <v-list-item-title>  Agregar usuarios &nbsp;&nbsp; </v-list-item-title>
                </v-list-item>
                <v-list-item to="/client/plans/documents" nuxt link exact>
                  <v-list-item-title>  Agregar documentos &nbsp;&nbsp; </v-list-item-title>
                </v-list-item>
                <v-list-item to="/login" nuxt link    >
                  <v-list-item-title>  Salir &nbsp;&nbsp; </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-toolbar-items v-else>
               <v-btn icon nuxt link exact to="/client/notifications">
                  <v-icon>mdi-bell</v-icon>
                </v-btn>

                <v-btn icon nuxt link exacto to="/client/profile">
                  <img :src=" userAvatar" style="width:26px;border-radius: 20px;max-height: 30px;" alt="">
                </v-btn>

            </v-toolbar-items>

  </div>
</template>

<script>
import {ResponsiveMixins} from '~/mixins/ResponsiveMixins';
import {PlanControls} from '~/mixins/PlanControls'
import userAvatar from '~/data/userAvatar.js';

export default {
    props:{
        invitations:{
            type:Array,
            default:function(){return []}
            
        }
    },
    mixins:[ResponsiveMixins,PlanControls],
    computed:{
      userName() {
         let currentName = this.$store.getters['auth/currentUser'].name.split(' ');
        return currentName[0];
      },
      userAvatar(){
        let storeUser = this.$store.getters['auth/currentUser']; 
        if(!storeUser || storeUser.avatar_url == null){
          //console.log('no profile image')
          return userAvatar.image;
        } else
          return  process.env.ASSETS_HOST + storeUser.avatar_url
      },
    }
}
</script>

<style scoped>
.v-menu__content{

    border-radius: 4px!important;
    width:268px!important;
    font-size:12px!important;
    font-family: Heebo;
    line-height: 1.33;
    letter-spacing: normal;
    color: #3f4448;
  }

  .menu-btn{
    font-size:12px!important;
    font-family: Heebo;  
  }

 

  .menu-toolbar > .v-list,
  .menu-toolbar > .v-list > .v-list-item > *,
  .menu-toolbar > .v-list > .v-list-item > .v-list-item__content > *,
  .menu-toolbar > .v-list-item__title  {
     
    font-size:12px!important;
    font-family: Heebo;
    line-height: 1.33;
    letter-spacing: normal;
    color: #3f4448;
    padding:0px;
  }

  .menu-all-notifications {
      background-color: rgba(246, 196, 52, 0.09)!important;
      text-align:center!important;
      min-height:35px;
      font-weight: bold;
      text-decoration: underline;
  }

</style>