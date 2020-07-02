<template>

    <v-dialog
      persistent
      medium
      content-class="form-dialog"
      v-model="open" >
        <v-card>
            <v-card-text class="pt-5">
                <v-row justify="center" row wrap no-gutters>
                    <v-col cols="11" sm="7">
                        <div class="form-label">
                            Nombre de organización
                        </div>
                        <v-text-field
                            class="field mb-0"
                            v-model="name"
                            :rules="[rules.required]"
                            placeholder="Escribe el nombre"
                            outlined
                            dense
                        ></v-text-field>
                    </v-col>
                    <v-col cols="10" sm="7" class="py-5" >
                      <v-card class="fill-height" color="grey lighten-5 ">
                        <v-card-text class="fill-height text-center ">
                            <v-row  align-content="center" class="fill-height">
                                <v-col cols="12">
                                    <img  :src="image" alt />
                                </v-col>
                            </v-row>          
                        </v-card-text>
                      </v-card>
                    </v-col>
                    <v-col cols="10" sm="7" >
                      <v-card class="elevation-0" style="border:solid 2px #c0c1c5">
                        <v-card-text style="overflow:auto">
                          <v-row no-gutters>
                            <v-col cols="6">
                              <image-uploader
                                :maxWidth="320"
                                :quality="0.7"
                                :preview="false"
                                :className="['fileinput', { 'fileinput--loaded' : hasImage }]"
                                :capture="true"
                                accept="image/*"
                                doNotResize="['gif', 'svg']"
                                @input="setImage"
                              ></image-uploader>
                            </v-col>
                            <v-col cols="6"></v-col>
                          </v-row>
                        </v-card-text>
                      </v-card>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions class="text-center">
                <v-spacer></v-spacer>
                <v-btn class="cincel-border-btn" @click="close">Cancelar</v-btn>
                <v-spacer></v-spacer>
                <v-btn :loading="loading" :disabled="validChanges" class="cincel-yellow-btn" @click="saveChanges">Aceptar</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>

</template>

<script>
import rules from "~/assets/js/rules";
export default {
  props: {
    open: Boolean,
    organization:Object,
  },
  components:{
   
  },
  mounted(){
    this.image = this.organization.image;
    this.name = this.organization.name;
  },
  data() {
    return {
        rules,
        file: "",
        fileBase: "",
        name:'',
        image:'',
        hasImage:true,
        loading:false,
    };
  },
  methods:{
  	close(){
  		this.$emit('Closing',false);
    },
    setImage: function(output) {
      this.image = output;
    },
    async saveChanges(){
       this.loading = true;
       let response = await this.$store.dispatch("organizations/putOrganization",{name:this.name,imagotype:this.image});
       this.loading = false;
       this.$emit('Closing',false);
    }
  },
  computed:{
      validChanges(){
        if (!this.name)
          return true
        if(this.image && (this.image != this.organization.image) || this.name != this.organization.name)
          return false;
        return true;
      }
  }
}
</script>

<style >
    .form-dialog{
        max-width:800px;
    }
</style>