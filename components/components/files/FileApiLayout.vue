<template>
  <ApiLayout
    :items="files"
    itemsName="documents"
    :formOpen="formOpen"
    :selectedItem="selectedFile"
    :rendering="rendering"
    title="Api Documents"
    @createItem="createItem"
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
      selectedFile: null,
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
      let fetchFiles = await this.$store.dispatch("files/fetchFiles");
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
    async saveItem(item) {}
  },
  computed: {
    files() {
      return this.$store.getters();
    }
  }
};
</script>
<style scoped>
</style>