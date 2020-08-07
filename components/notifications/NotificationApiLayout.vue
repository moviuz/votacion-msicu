<template>
  <ApiLayout
    :items="notifications"
    itemsName="notifications"
    :formOpen="formOpen"
    :selectedItem="selectedNotification"
    titel="Api Notification"
    :rendering="rendering"
    @editItem="editItem"
    @deleteItem="deleteItem"
    @closeForm="closeForm"
    @refresh="refresh"
  ></ApiLayout>
</template>
<script>
export default {
  data() {
    return {
      selectedNotification: null,
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
      let fetchOrganizationInv = await this.$store.dispatch(
        "notifications/getInvitationByUser",
        "",
        { root: true }
      );
      let fetchDocumentInv = await this.$store.dispatch(
        "notifications/getDocInvitation",
        "",
        { root: true }
      );
      return true;
    },
    async editItem(item) {
      this.loading = true;
      if (item.type == "organizacion") {
        this.$store.dispatch("notifications/setInvitation", item, {
          root: true
        });
        let response = await this.$store.dispatch(
          "notifications/acceptInvitation"
        );
        if (response.ok) {
          await this.refresh();
        }
        this.loading = false;
      }
      this.loading = false;
    },
    async deleteItem(item) {
      this.loading = true;
      if (item.type === "organizacion") {
        this.$store.dispatch("notifications/setInvitation", item, {
          root: true
        });
        let response = await this.$store.dispatch(
          "notifications/declineInvitation"
        );
        if (response.ok) {
          await this.refresh();
        }
        this.loagin = false;
      }
      this.loagin = false;
    },
    closeForm() {}
  },
  computed: {
    notifications() {
      let notification = this.$store.getters[
        "notifications/getAllInvitationOrganization"
      ];
      let document = this.$store.getters[
        "notifications/getAllInvitationDocument"
      ];
      console.log("esto esta en el array %o", notification.concat(document));
      return notification.concat(document);
    }
  }
};
</script>
<style scoped>
</style>