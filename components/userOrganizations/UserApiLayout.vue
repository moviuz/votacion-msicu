<template>
  <ApiLayout
    :items="users"
    itemsName="usuarios"
    :formOpen="formOpen"
    :selectedItem="selectedUser"
    :rendering="rendering"
    iconName="mdi-account-check"
    title="Api Usuarios de Organizaciones"
    @createItem="createItem"
    @editItem="editItem"
    @deleteItem="deleteItem"
    @closeForm="closeForm"
    @refresh="refresh"
  >
     <template  v-slot:item-content="slotProps">
       <v-row no-gutters>
          <v-col cols="7">
            <div v-if="slotProps.item.nombre">
              <v-icon class="pr-1" >mdi-account-check</v-icon>
              {{ slotProps.item.nombre }} 
            </div>
            <div v-else>
              <v-icon class="pr-1" >mdi-email-send-outline</v-icon>
              {{ slotProps.item.invite_email }}
            </div>
          </v-col>
          <v-col cols="5" class="text-right">
          </v-col>
       </v-row>

     </template>
    <template slot="form-content">
      <UserForm :user="selectedUser" @saveItem="saveItem" @loading="loading"></UserForm>
    </template>
  </ApiLayout>
</template>
<script>
import UserList from "~/components/userOrganizations/UserList";
import UserForm from "~/components/userOrganizations/UserForm";
export default {
  props: {
    organization: {
      type: Object,
      default: function() {
        return { id: 0 };
      }
    },
    refreshComponentListUser: {
      type: Boolean,
      default: false
    }
  },
  components: {
    UserList,
    UserForm
  },
  data() {
    return {
      selectedUser: null,
      formOpen: false,
      rendering: true,
      loading: false
      // organizationData: this.organization
    };
  },
  async mounted() {
    this.rendering = true;
    await this.refresh();
    this.rendering = false;
  },
  methods: {
    async refresh() {
      if (this.organization && this.organization.id > 0) {
        let fetchUsers = await this.$store.dispatch("organizations/getOrganizationUsers",{},{ root: true });
        let fetchInvitations = await this.$store.dispatch('organizations/getOrganizationInvitations',{},{ root: true })
        this.closeForm();
        return true;
      }
    },
    createItem() {
      this.formOpen = false;
      this.selectedUser = null;
      this.formOpen = true;
    },
    editItem(item) {
      this.formOpen = false;
      this.selectedUser = item;
      this.formOpen = true;
    },
    deleteItem(item) {},
    closeForm(item) {
      this.selectedUser = null;
      this.formOpen = false;
    },
    async saveItem(item) {
      item.ordanizationId = this.organization.id;
      //console.log("RECUPERANDO ITEMS VALORES %o", item);
      this.loading = true;
      if (item.invite_rol) {
        let putResponse = await this.$store.dispatch(
          "organizations/sendInvitationOrganization",
          item
        );
      this.loading = false;
      }
    }
  },
  computed: {
    users() {
      let users = this.$store.getters["organizations/currentOrganizationUsers"];
      let invites = this.$store.getters["organizations/currentOrganizationInvites"];

      return invites.concat(users); 
    }
  },
  watch: {
    organization: function() {
      //console.log("watchList check");
      this.refresh();
    }
  }
};
</script>
<style scoped>
.desktop-card {
  box-shadow: none !important;
  overflow: auto;
  border-radius: 4px !important;
  border: solid 1px #dfe2e6 !important;
}
.dash-card {
  border-radius: 6px !important;
  box-shadow: 0 2px 20px 4px rgba(0, 0, 0, 0.05) !important;
  border: solid 1px rgba(132, 140, 149, 0.1);
}
</style> 