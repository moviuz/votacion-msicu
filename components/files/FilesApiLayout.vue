<template>
  <ApiLayout
    :items="files"
    itemsName="files"
    :formOpen="formOpen"
    :selectedItem="selectedFile"
    :rendering="rendering"
    title="Api Files"
    @createItem="createItem"
    @editItem="editItem"
    @deleteItem="deleteItem"
    @closeForm="closeForm"
    @refresh="refresh"
  >
    <template slot="form-content">
      <FileForm :file="selectedFile" @saveItem="saveItem" @loading="loading"></FileForm>
    </template>
  </ApiLayout>
</template>
<script>
import FileForm from "~/components/files/FileForm";
export default {
  components: {
    FileForm
  },
  data() {
    return {
      selectedFile: null,
      formOpen: false,
      rendering: true,
      loading: false,
      formUser: false
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
      this.formOpen = false;
      this.selectedFile = null;
      this.formOpen = true;
    },
    editItem(item) {
      this.formOpen = false;
      this.selectedFile = item;
      this.formOpen = true;
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
    }
  },
  computed: {
    files() {
      return this.$store.getters["files/getAllFiles"];
    }
  }
};
</script>
<style scoped>
</style>