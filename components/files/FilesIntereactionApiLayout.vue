<template>
  <ApiLayout
    :items="files"
    itemsName="files"
    :formOpen="formOpen"
    :selectedItem="selectedFile"
    :rendering="rendering"
    title="Api interaction Files"
    @createItem="createItem"
    @editItem="editItem"
    @deleteItem="deleteItem"
    @closeForm="closeForm"
    @refresh="refresh"
  >
    <template slot="form-content">
      <UpdateFileForm
        :files="selectedFile"
        @saveItem="saveItem"
        :user="currentUser"
        @loading="loading"
      ></UpdateFileForm>
    </template>
  </ApiLayout>
</template>
<script>
import UpdateFileForm from "~/components/files/UpdateFileForm";
export default {
  components: {
    UpdateFileForm
  },
  data() {
    return {
      selectedFile: null,
      formOpen: false,
      rendering: true,
      loading: false,
      formUser: false,
      formPreview: false
    };
  },
  async mounted() {
    this.rendering = true;
    await this.refresh();
    this.rendering = false;
  },
  methods: {
    async refresh() {
      let fetchFiles = await this.$store.dispatch("files/fetchFiles", "", {
        root: true
      });
    },
    createItem() {
      this.formUser = false;
      this.formOpen = false;
      this.selectedFile = null;
      this.formOpen = true;
    },
    async editItem(item) {
      this.formOpen = false;
      this.$store.dispatch("files/setDocument", item);
      await this.$store.dispatch("files/getDocument");
      this.selectedFile = item;
      this.formOpen = true;
      console.log("selecyed item files %o", item);
    },

    async deleteItem(item) {},
    closeForm() {
      this.selectedFile = null;
      this.formOpen = false;
    },
    async saveItem(item) {
      this.loading = true;
      this.$store.dispatch("files/setNewFile", item, { root: true });
      let postResponse = await this.$store.dispatch("files/postDocument");
      if (postResponse.ok) {
        //mando la el id de a respyesta para asociar el documento con el id
        this.$store.dispatch("files/setDocument", postResponse.payload);
        let creatFile = await this.$store.dispatch(
          "files/createFileOnDocument"
        );
        if (item.invitation == true) {
          let nuevoFirmante = await this.$store.dispatch(
            "files/addInvitationToDocument"
          );
          if (nuevoFirmante.ok) {
            (this.formOpen = false),
              (this.formUser = true),
              await this.refresh();
            this.loading = false;
          }
        }
      }
    },
    async saveItemUser(item) {
      this.loading = true;
      let confirmation;
      if (item.confirmDocumentSigners == true) {
        confirmation = await this.$store.dispatch(
          "files/confirmDocumentSigners"
        );
        this.formOpen = false;
      } else {
        confirmation = await this.$store.dispatch("files/activateDocument");
        this.formOpen = false;
      }
      this.loading = false;
    }
  },
  computed: {
    files() {
      return this.$store.getters["files/getAllFiles"];
    },
    currentUser() {
      return this.$store.getters["auth/currentUser"];
    }
  }
};
</script>
<style scoped>
</style>