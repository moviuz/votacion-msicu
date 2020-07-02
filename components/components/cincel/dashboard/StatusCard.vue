<template>
<v-card class="dash-card">
    <v-card-text>
        <v-row no-gutters="" row wrap>
            <v-col cols="11">
            <span class="dash-card-title">Status</span>
            <v-spacer></v-spacer>
            </v-col>
            <v-col cols="1" class="text-center">
            
            </v-col>
            <v-col cols="12" class="py-2">
            <v-divider></v-divider>
            </v-col>
            <v-col cols="12">
            <v-row no-gutters v-if="loading == false">
                
                <v-col cols="12" class="pb-2" v-if="false">
                    <v-chip
                    class=""
                    label>
                    Tu plan: <strong> &nbsp;{{ plan }}</strong>
                    </v-chip>
                </v-col>
                <v-col cols="8">Contratos</v-col>
                <v-col cols="4" class="text-right">{{limits.count_signed_documents}}/{{limits.max_signed_documents}}</v-col>
                <v-col cols="12" class="pt-2 pb-5">
                <v-progress-linear :value="contractPercentil" background-color="#dfe2e6" color="#f6c434"></v-progress-linear>
                </v-col>
                <v-col cols="6">Espacio</v-col>
                <v-col cols="6" class="text-right"> 
                    <span v-if="limits.count_storage > 0">{{(limits.count_storage / 1048576).toFixed(2) }}</span>
                    <span v-else> 0 </span> 
                      /  {{(limits.max_storage / 1048576).toFixed(2) }} MB </v-col>
                        
                <v-col cols="12" class="pt-2 pb-5">
                <v-progress-linear :value="storagePercentil" background-color="#dfe2e6" color="#f6c434"></v-progress-linear>
                
                </v-col>
                <v-col cols="8">Organizaciones</v-col>
                <v-col cols="4" class="text-right"> {{organizations.length}} </v-col>
                <v-col cols="12" class="pt-2 pb-5">
                <v-progress-linear value="100" background-color="#dfe2e6" color="#f6c434"></v-progress-linear>
                </v-col>
                <v-col cols="12" v-if="false">
                    <v-btn class="cincel-yellow-btn" block nuxt link to="/client/plans/documents">
                        Adquirir mas documentos
                    </v-btn>
                </v-col>
            </v-row>
            <div v-else class="text-center">
                <br><br>
                <v-progress-circular indeterminate="" color="#f6c434"></v-progress-circular>
            </div>
            </v-col>
        </v-row>
    </v-card-text>
</v-card>
</template>

<script>
import {PlanControls} from '~/mixins/PlanControls'
export default {
    props:{
        limits:{
            type:Object,
            default:function(){return {}}
        },
        loading:{
            type:Boolean,
            default:true,
        }
    },
    mixins:[PlanControls],
    mounted(){
        //console.log(this.limits);
    },
    data(){
        return {

        }
    },
    computed:{
        organizations(){
            return this.$store.getters['organizations/userOrganizations'];
        },
        plan(){
            let currentActivePlan = this.$store.getters['subscriptions/getCurrentActivePlan']
            return this.getPlanName(currentActivePlan.name)
        },
        contractPercentil(){

            return (this.count_signed_documents / this.limits.max_signed_documents) *100;
        },
        storagePercentil(){
            return (this.limits.count_storage / this.limits.max_storage)*100;
        },
        
        
    }

}
</script>

<style>

</style>