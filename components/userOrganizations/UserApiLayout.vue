<template>
  <ApiLayout
    :items="users"
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
        let fetchResponse = await this.$store.dispatch(
          "organizations/getUserByOrganization",
          this.organization,
          { root: true }
        );
        this.closeForm();
        return fetchResponse;
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
      console.log("RECUPERANDO ITEMS VALORES %o", item);
      this.loading = true;
      if (item.invite_rol) {
        let putResponse = await this.$store.dispatch(
          "organizations/sendInvitationOrganization",
          item
        );
      }
    }
  },
  computed: {
    users() {
      return this.$store.getters["organizations/currentOrganizationUsers"];
    }
  },
  watch: {
    organization: function() {
      console.log("watchList check");
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