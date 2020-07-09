<template>
    <ApiLayout 
        :items="folders" 
        :formOpen="formOpen"
        :selectedItem="selectedFolder"
        iconName="mdi-folder"
        @createItem="createItem"
        @editItem="editItem"
        @deleteItem="deleteItem"
        @closeForm="closeForm"
        @refresh="refresh">
        <!-- ejemplo de como se personalizan datos dentro de un slot
        <template  v-slot:item-content="slotProps">
            {{ slotProps.item.name }} 
        </template>
        -->
    </ApiLayout>
</template>

<script>

import FolderList from '~/components/folders/FolderList'
import FolderForm from '~/components/folders/FolderForm'
export default {
    components:{
        FolderList,
        FolderForm
    },
    data(){
        return {
            selectedFolder:null,
            formOpen:false,
        }
    },
    mounted(){
        this.$store.dispatch('folders/fetchFolders','',{root:true});
    },
    methods:{
        refresh(){},
        createItem(){
            this.formOpen = false;
            this.selectedFolder = null;
            this.formOpen = true;
        },
        editItem(item){
            this.formOpen = false;
            this.selectedFolder = item;
            this.formOpen = true;
        },
        deleteItem(item){},
        closeForm(item){
            this.selectedFolder = null;
            this.formOpen = false;
        },
        saveItem(item){
            if(item.id) {
                console.log('put %o',item);
            } else {
                console.log('post %o',item);
            }
        }
    },
    computed:{
        folders(){
            return this.$store.getters['folders/getAllFolders'];
        }
    }
}
</script>

<style scoped>
.desktop-card {
  box-shadow: none!important;
  overflow:auto;
  border-radius: 4px!important;
  border: solid 1px #dfe2e6!important; 
}
.dash-card { 
  border-radius: 6px !important;
  box-shadow: 0 2px 20px 4px rgba(0, 0, 0, 0.05)!important;
  border: solid 1px rgba(132, 140, 149, 0.1);
}


</style>