<template>
  <ApiLayout
    :items="organizations"
    :formOpen="formOpen"
    :selectedItem="selectedOrganization"
    :rendering="rendering"
    title="Api Organizaciones"
    @createItem="createItem"
    @editItem="editItem"
    @deleteItem="deleteItem"
    @closeForm="closeForm"
    @refresh="refresh"
  >
    <template slot="form-content">
      <OrganizationForm
        :organization="selectedOrganization"
        @saveItem="saveItem"
        @loading="loading"
      ></OrganizationForm>
    </template>
  </ApiLayout>
</template>
<script>
import OrganizationList from "~/components/organizations/OrganizationList";
import OrganizationForm from "~/components/organizations/OrganizationForm";
//import OrganizationUserForm from "~/components/organizations/OrganizationUserForm";
export default {
  components: {
    OrganizationList,
    OrganizationForm
  },
  data() {
    return {
      selectedOrganization: null,
      formOpen: false,
      rendering: true,
      loading: false
    };
  },
  async mounted() {
    this.rendering = true;
    await this.refresh();
    this.rendering = false;
  },
  methods: {
    async refresh() {
      let fetchOrganizations = await this.$store.dispatch(
        "organizations/fetchOrganizations",
        "",
        { root: true }
      );
      return fetchOrganizations;
    },
    createItem() {
      this.formOpen = false;
      this.selectedOrganization = null;
      this.formOpen = true;
    },
    editItem(item) {
      this.formOpen = false;
      this.selectedOrganization = item;
      this.formOpen = true;
    },
    deleteItem(item) {},
    closeForm(item) {
      this.selectedOrganization = null;
      this.formOpen = false;
    },
    async saveItem(item) {
      this.loading = true;
      if (item.id) {
        let putResponse = await this.$store.dispatch(
          "organizations/updateOrganization",
          item
        );
        if (putResponse && putResponse.ok) this.formOpen = false;
      } else {
        let postResponse = await this.$store.dispatch(
          "organizations/createOrganization",
          item
        );
        if (postResponse && postResponse.ok) this.formOpen = false;
      }
      await this.refresh();
      this.loading = false;
    }
  },
  computed: {
    organizations() {
      return this.$store.getters["organizations/getAllOrganizations"];
    }
  }
};
</script>
<style scoped>
</style> 