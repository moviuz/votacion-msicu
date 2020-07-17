<template>
  <ApiLayout
    :items="users"
    :formOpen="formOpen"
    :selectedItem="selectedUser"
    :rendering="rendering"
    iconName="mdi-account-check"
    title="Api Usuarior de Organizaciones"
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
      loading: false,
      organizationData: this.organization
    };
  },
  async mounted() {
    console.log("entro a mounted");
    this.rendering = true;
    await this.refresh();
    this.rendering = false;
  },
  methods: {
    async refresh() {
      let fetchResponse = await this.$store.dispatch(
        "organizations/getUserByOrganization",
        this.organization,
        { root: true }
      );
      return fetchResponse;
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
    saveItem(item) {}
  },
  computed: {
    users() {
      return this.$store.getters["organizations/currentOrganizationUsers"];
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