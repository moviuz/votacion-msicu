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
  >
    <!--    <template v-slot:item-content="slotProps">
      <div>
        <v-icon class="pr-1">mdi-email-send-outline</v-icon>
        {{slotProps.item.invite_email}}
      </div>
    </template>-->
  </ApiLayout>
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
    async deleteItem(item) {
      this.$store.dispatch("organizations/setCurrentInvitation", item, {
        root: true
      });
      let deleteResponse = await this.$store.dispatch(
        "organizations/deleteInvitationFromOrganization"
      );
      if (deleteResponse && deleteResponse.ok) {
        this.refresh();
      }
    },
    closeForm() {}
  },
  computed: {
    invitationsUsers() {
      return this.$store.getters["organizations/currentOrganizationInvites"];
    }
  },
  watch: {
    organization: function() {
      this.refresh();
    }
  }
};
</script>
<style scoped>
</style>