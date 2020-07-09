<template>
  <div>
    <v-card >
        <v-card-text>
            <v-form ref="folder_form" v-model="valid" autocomplete="off">
                <div class="form-label">Nombre la carpeta</div>
                <v-text-field
                class="field mb-0"
                v-model="newFolder.name"
                :rules="[rules.required]"
                placeholder="Escribe el nombre"
                outlined
                dense
                name="nombre_carpeta"
                ></v-text-field>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-btn @click="clearForm" text>Limpiar</v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="clearForm" text>Guardar</v-btn>    
        </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import rules from "~/assets/js/rules";
export default {
    props:{
        folder:{
            type:Object,
            default:() => { return {name:null,organizationId:null} }
        }
    },
    mounted(){
        this.clearForm()
    },
    data(){
        return {
            rules,
            newFolder:{
                name:null,
                organizationId:null
            },
            valid:false,
        }
    },
    methods:{
        clearForm(){
            this.newFolder.name = this.folder.name;
            this.newFolder.organizationId = this.folder.organizationId;
            this.$refs.folder_form.resetValidation();
        }
    }
}
</script>

<style>

</style>