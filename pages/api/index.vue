<template>
  <div>
    <MobilePanel v-if="false"></MobilePanel>
    <DesktopPanel title="Api Panel" subtitle="Only devs :)">
      <v-row slot="main-content">
        <v-col cols="12">
          <FoldersApiLayout></FoldersApiLayout>
        </v-col>
        <v-col cols="12">
          <OrganizationApiLayout @getOrganization="getOrganization" @closeUser="closeUser"></OrganizationApiLayout>
        </v-col>
        <v-col v-if="this.organization != null" cols="12">
          <UserApiLayout :organization="organization"></UserApiLayout>
        </v-col>
      </v-row>
    </DesktopPanel>
  </div>
</template>

<script>
import MobilePanel from "~/components/ui/MobilePanel";
import DesktopPanel from "~/components/ui/DesktopPanel";
import FoldersApiLayout from "~/components/folders/FoldersApiLayout";
import OrganizationApiLayout from "~/components/organizations/OrganizationApiLayout";
import UserApiLayout from "~/components/userOrganizations/UserApiLayout";
//import OrganizationUserApiLayout con una bandera
export default {
  middleware: ["auth"],
  components: {
    MobilePanel,
    DesktopPanel,
    FoldersApiLayout,
    OrganizationApiLayout,
    UserApiLayout
  },
  data() {
    return {
      organization: null
    };
  },
  methods: {
    getOrganization(item) {
      this.organization = item;
    },
    closeUser(close) {
      if (close == false) {
        this.organization = null;
      }
    }
  }
};
</script>

<style>
</style>