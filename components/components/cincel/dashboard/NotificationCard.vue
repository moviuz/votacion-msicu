<template>
<v-card class="dash-card card-first-row"  >
    <v-card-text class="pb-1">
        <v-row no-gutters="" row wrap>
            <v-col cols="11">
            <span class=" dash-card-title selector" @click="$router.push('/client/notifications')">Notificaciones</span>
            <v-spacer></v-spacer>
            </v-col>
            <v-col cols="1" class="text-center">
            <v-icon @click="$router.push('/client/notifications')">mdi-chevron-right</v-icon>
            </v-col>
            <v-col cols="12" class="pt-2">
            <v-divider></v-divider>
            </v-col>
            <v-col cols="12" v-if="loading">
                <div class="text-center">
                    <br><br><br>
                    <v-progress-circular indeterminate="" color="#f6c434"></v-progress-circular>
                </div>
            </v-col>
            <v-col cols="12" class="size-notifications-area" v-else>
            <v-list dense="">
                <v-list-item v-for="i in invitations" :key="'i'+i.id" style="border-bottom:solid 1px #dfe2e6" >
                <v-list-item-content class="small-size" >
                    <v-row no-gutters >
                    <v-col cols="2" align-content="center" >
                        <br>
                        <v-icon>mdi-plus-circle</v-icon>
                    </v-col>
                    <v-col cols="10">
                        <v-row no-gutters  >
                        <v-col cols="12" class="py-2" >
                            <strong>{{i.sender.email}}</strong> quiere agregarte a su organización
                        </v-col>
                        <v-col cols="6" class="pb-1 text-">
                            <v-btn small elevation="0" 
                            @click="acceptInvitation(i)"
                            class="btn-menu cincel-yellow-btn"> Aceptar</v-btn>
                        </v-col>
                        <v-col cols="6" class="text-">
                            <v-btn small elevation="0" 
                            class="btn-menu cincel-border-btn"> Cancelar </v-btn>
                        </v-col>
                        </v-row>
                    </v-col>
                    </v-row>
                </v-list-item-content>
                </v-list-item>
                <v-list-item v-if="invitations.length == 0">
                <v-list-item-content>
                    <v-list-item-title class="text-center"> No hay notificaciones </v-list-item-title>
                </v-list-item-content>
                </v-list-item>      
            </v-list>
            </v-col>
        </v-row>
    </v-card-text>
</v-card>
</template>

<script>
export default {
    props:{
        invitations:{
            type:Array,
            default:function(){return []}
        },
        loading:{
            type:Boolean,
            default:true,
        }
    },
    data(){
        return {

        }
    },
    methods:{
        async acceptInvitation(invitation){
            await this.$store.dispatch('organizations/aceptInvitation',invitation);
        },
        async declineInvitation(invitation){
            await this.$store.dispatch('organizations/declineInvitation',invitation);
        },
    }
};
</script>

<style scoped>
    .small-size{
        font-size: 12px!important;
    }

    .size-notifications-area{
        height: 210px;
        overflow: auto;
    }

    .selector{
        cursor: pointer;
    }
</style>