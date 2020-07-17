<template>
  <ApiLayout
    :items="folders"
    :formOpen="formOpen"
    :selectedItem="selectedFolder"
    iconName="mdi-folder"
    :rendering="rendering"
    @createItem="createItem"
    @editItem="editItem"
    @deleteItem="deleteItem"
    @closeForm="closeForm"
    @refresh="refresh"
  >
    <!-- ejemplo de como se personalizan datos dentro de un slot
        <template  v-slot:item-content="slotProps">
            {{ slotProps.item.name }} 
        </template>
    -->
    <template slot="form-content">
      <!-- Aqui va el selector de organizaciones -->
      <FolderForm :folder="selectedFolder" @saveItem="saveItem" @loading="loading"></FolderForm>
    </template>
  </ApiLayout>
</template>

<script>
import FolderList from "~/components/folders/FolderList";
import FolderForm from "~/components/folders/FolderForm";
export default {
  components: {
    FolderList,
    FolderForm
  },
  data() {
    return {
      selectedFolder: null,
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
      let fetchResponse = await this.$store.dispatch(
        "folders/fetchFolders",
        "",
        { root: true }
      );
      return fetchResponse;
    },
    createItem() {
      this.formOpen = false;
      this.selectedFolder = null;
      this.formOpen = true;
    },
    editItem(item) {
      this.formOpen = false;
      this.selectedFolder = item;
      this.formOpen = true;
    },
    async deleteItem(item) {
      let deleteResponse = await this.$store.dispatch(
        "folders/deleteFolder",
        item
      );
      if (deleteResponse && deleteResponse.ok) {
        this.refresh();
      }
    },
    closeForm(item) {
      this.selectedFolder = null;
      this.formOpen = false;
    },
    async saveItem(item) {
      this.loading = true;
      if (item.id) {
        let putResponse = await this.$store.dispatch(
          "folders/updateFolder",
          item
        );
        if (putResponse && putResponse.ok) this.formOpen = false;
        console.log("put %o", item);
      } else {
        let postResponse = await this.$store.dispatch(
          "folders/createFolder",
          item
        );
        if (postResponse && postResponse.ok) this.formOpen = false;
      }
      await this.refresh();
      this.loading = false;
    }
  },
  computed: {
    folders() {
      return this.$store.getters["folders/getAllFolders"];
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