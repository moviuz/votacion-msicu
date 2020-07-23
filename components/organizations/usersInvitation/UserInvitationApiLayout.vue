<template>
  <ApiLayout
    :items="invitationsUsers"
    itemsName="invitations"
    :formOpen="formOpen"
    :selectedItem="selectedInvitation"
    :rendering="rendering"
    iconName="mdi-email-send-outline"
    title="Api Invitaciones Usuarios Organizaciones"
    @createItem="createItem"
    @editItem="editItem"
    @deleteItem="deleteItem"
    @closeForm="closeForm"
    @refresh="refresh"
  ></ApiLayout>
</template>
<script>
export default {
  props: {
    organization: Object,
    default: function() {
      return { id: 0 };
    }
  },
  components: {},
  data() {
    return {
      selectedInvitation: null,
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
      if (this.organization && this.organization.id > 0) {
        let fetchInvitations = await this.$store.dispatch(
          "organizations/getOrganizationInvitations",
          {},
          { root: true }
        );
        this.closeForm();
        return true;
      }
    },
    createItem() {},
    editItem() {},
    deleteItem() {},
    closeForm() {}
  },
  computed: {
    invitationsUsers() {
      return this.$store.getters["organizations/currentOrganizationInvites"];
    }
  },
  watch: {
    organization: function() {
      console.log("catcherCalledInvitations");
      this.refresh();
    }
  }
};
</script>
<style scoped>
</style>