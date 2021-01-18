<template>
  <v-app  :light="true">
    <v-app-bar
      
      class="blue"
      :clipped-left="clipped"
      :fixed="fixed"
      :absolute="!fixed"
      app
      elevate-on-scroll
    >
    <v-menu>
        <template v-slot:activator="{ on }">
                <v-btn
                  outlined
                  tile
                  style="
                    height: 100%;
                    text-transform: capitalize !important;
                    border: none !important;
                  "
                  v-on="on"
                >
                  <v-avatar>
                      
                  </v-avatar>
                  &nbsp;
                  <span v-if="currentBreakpoint == 'lg'">{{ userName }}</span>
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
              </template>
    </v-menu>
       
        <span> Sistema de preguntas</span>
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
  }
}
</script>
<style lang="css" >
  .v-toolbar__content{
    height: 100%!important;
  }
</style>
