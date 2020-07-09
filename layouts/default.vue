<template>
  <v-app  :light="true">
    <v-navigation-drawer
      v-model="drawer"
      temporary
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
        
        >
          <v-list-item-action>
            <v-icon></v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title  />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      
      class="primary"
      :clipped-left="clipped"
      :fixed="fixed"
      :absolute="!fixed"
      app
      elevate-on-scroll
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="false" />
        <OrganizationLogo   v-if="false" :elevation="true" :organization="currentOrganization" :size="'sm' " ></OrganizationLogo>
        
        <img :src="imagotype" style="width:100px" alt="">
        <v-spacer ></v-spacer>
        <ToolbarMenu  v-if="isLoggedin"></ToolbarMenu>
    </v-app-bar>
    <v-main class="bgCincel">
      <AlertCard></AlertCard>
      <nuxt />
    </v-main>

  </v-app>
</template>

<script>

import {ResponsiveMixins} from '~/mixins/ResponsiveMixins';
import OrganizationLogo from '~/components/ui/OrganizationLogo';
import ToolbarMenu from '~/components/ui/ToolbarMenu'
export default {
  components:{
      OrganizationLogo,
      ToolbarMenu
  },
  mixins:[ResponsiveMixins],
  data () {
    return {
      imagotype:'/cincel/cincel-imagotype.png',
      clipped: false,
      drawer: false,
      fixed: true,
      miniVariant: true,
    
    }
  },
  methods:{},
  computed:{
    isLoggedin(){
      return this.$store.getters['auth/isAuthenticated'];
    },
    currentOrganization(){
      
      return this.$store.getters['organizations/currentOrganization']
    }
  }
}
</script>
<style lang="css" >
  .v-toolbar__content{
    height: 100%!important;
  }
</style>
