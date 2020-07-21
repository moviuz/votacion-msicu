<template>
  <ApiLayout
    :items="organizations"
    itemsName="organizaciones"
    :formOpen="formOpen"
    :selectedItem="selectedOrganization"
    :rendering="rendering"
    title="Api Organizaciones"
    @createItem="createItem"
    @itemClicked="itemClicked"
    @editItem="editItem"
    @deleteItem="deleteItem"
    @closeForm="closeForm"
    @refresh="refresh"
  > 
    <template slot="default-item">
      <v-row no-gutters>
          <v-col cols="12">
            <strong> Organizacion actual:</strong>  {{ selectedOrganization.name }}
          </v-col>
      </v-row>
    </template>
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
//import OrganizationList from "~/components/organizations/OrganizationList";
import OrganizationForm from "~/components/organizations/OrganizationForm";
//import OrganizationUserForm from "~/components/organizations/OrganizationUserForm";
export default {
  components: {
    OrganizationForm
  },
  data() {
    return {
      selectedOrganization: {},
      formOpen: false,
      rendering: true,
      loading: false
    };
  },
  async mounted() {
    this.rendering = true;
    await this.refresh();
    this.selectedOrganization = this.$store.getters['organizations/currentOrganization'];
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
      //this.selectedOrganization = null;
      this.formOpen = true;
    },
    editItem(item) {
      this.formOpen = false;
      this.selectedOrganization = item;
      this.$emit("setOrganization", this.selectedOrganization);
      if(item.id != 0){
        this.formOpen = true;
      }
      
    },
    itemClicked(item){
      this.selectedOrganization = item;
      this.$emit("setOrganization", this.selectedOrganization);
    },
    deleteItem(item) {},
    closeForm(item) {
      //this.selectedOrganization = null;
      this.formOpen = false;
      //this.$emit("closeUser", false);
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