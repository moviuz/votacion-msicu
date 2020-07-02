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
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      v-if="m_screenSize == 'lg'"
      class="primary"
      :clipped-left="clipped"
      :fixed="fixed"
      :absolute="!fixed"
      app
      elevate-on-scroll
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="false" />
      <OrganizationLogo  v-if="isLoggedin" :elevation="true" :organization="currentOrganization" :size="'sm' " ></OrganizationLogo>
        <v-spacer></v-spacer>
        <img :src="imagotype" style="width:100px" alt="">
        <v-spacer ></v-spacer>
        <ToolbarMenu style="height:100%" ></ToolbarMenu>

    </v-app-bar>
    <v-main>
      <AlertCard></AlertCard>
      <v-container>
        
        <nuxt />
      </v-container>
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
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
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
