<template>
  <div>
    <MobilePanel v-if="false"></MobilePanel>

    <DesktopPanel title="Api Panel" subtitle="Only devs :)">
      <v-row slot="main-content">
        <v-col cols="12">
          <OrganizationApiLayout @setOrganization="setOrganization" @closeUser="closeUser"></OrganizationApiLayout>
        </v-col>
        <v-col v-if="this.organization != null" cols="12">
          <UserApiLayout :organization="organization"></UserApiLayout>
        </v-col>
        <v-col v-if="this.organization != null" cols="12">
          <div class="api-separator">
            <InvitationApiLayout :organization="organization"></InvitationApiLayout>
          </div>
        </v-col>
        <v-col cols="12">
          <div class="api-separator">
            <PlansApiLayout></PlansApiLayout>
          </div>
        </v-col>
        <v-col cols="12">
          <div class="api-separator">
            <FoldersApiLayout v-if="openFolders"></FoldersApiLayout>
          </div>
        </v-col>
        <v-col cols="12">
          <div class="api-separator">
            <FilesApiLayout></FilesApiLayout>
          </div>
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
import UserApiLayout from "~/components/organizations/users/UserApiLayout";
import PlansApiLayout from "~/components/plans/PlansApiLayout";
import InvitationApiLayout from "~/components/organizations/usersInvitation/UserInvitationApiLayout";
import FilesApiLayout from "~/components/files/FilesApiLayout";

//import OrganizationUserApiLayout con una bandera
export default {
  middleware: ["auth"],
  components: {
    MobilePanel,
    DesktopPanel,
    FoldersApiLayout,
    OrganizationApiLayout,
    UserApiLayout,
    PlansApiLayout,
    InvitationApiLayout,
    FilesApiLayout
  },
  data() {
    return {
      openFolders: false,
      organization: null,
      refreshComponentListUser: false
    };
  },
  methods: {
    setOrganization(item) {
      this.$store.dispatch("organizations/setCurrentOrganization", item, {
        root: true
      });
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