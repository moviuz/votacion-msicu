<template>
    <v-form @submit.prevent="saveUsers" v-model="valid" ref="form">
        <v-row no-gutters style="min-height:300px;">
            <v-col cols="12" v-for="(user,index) in currentUsers" :key="user.id" >
                <v-row no-gutters v-if="currentBreakpoint == 'lg'">
                    <v-col cols="12"  sm="12" md="4" class="pr-2">
                        <div class="form-label">
                            Correo de usuario {{index+1}}
                        </div>
                        <v-text-field
                            outlined
                            dense
                            :rules="[rules.required,rules.email]"
                            v-model="user.invite_email"
                            single-line
                            label="Escribe el correo electronico"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="4" class="pr-2">
                        <div class="form-label">
                            Rol
                        </div>
                         <v-select
                            v-model="user.invite_rol"
                            :items="roles"
                            outlined
                            dense
                            :rules="[rules.required]"
                            item-text="name"
                            item-value="id"
                            label="Roles"
                            
                            single-line
                            ></v-select>
                    </v-col>   
                    <v-col cols="12" sm="12" md="4" class="text-right"  align-self="center" >
                        <v-btn style="text-transform:none" text 
                            class="red--text"
                            @click="removeUser(index)">Eliminar</v-btn>
                    </v-col>
                    <v-col cols="12" class="py-2" v-if="currentUsers.length > 1">
                        <v-divider></v-divider>
                    </v-col>
                </v-row>
                <v-row v-else>
                    <v-col cols="12">
                        <v-card class="user-card">
                            <v-card-text>
                                <v-row no-gutters>
                                <v-col cols="12"  sm="12" md="4" class="pr-2">
                                    <div class="form-label">
                                        Correo de usuario {{index+1}}
                                    </div>
                                    <v-text-field
                                        outlined
                                        dense
                                        :rules="[rules.required,rules.email]"
                                        v-model="user.invite_email"
                                        single-line
                                        label="Escribe el correo electronico"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12" md="4" class="pr-2">
                                    <div class="form-label">
                                        Rol
                                    </div>
                                    <v-select
                                        v-model="user.invite_rol"
                                        :items="roles"
                                        outlined
                                        dense
                                        :rules="[rules.required]"
                                        item-text="name"
                                        item-value="id"
                                        label="Roles"
                                        
                                        single-line
                                        ></v-select>
                                </v-col>   
                                <v-col cols="12" sm="12" md="4" class="text-right"  align-self="center" >
                                    <v-btn style="text-transform:none" text 
                                        class="red--text"
                                        @click="removeUser(index)">Eliminar</v-btn>
                                </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
            <v-col class="form-title text-center" cols="12" v-if="currentUsers.length==0">
                <br><br><br>
               &nbsp;&nbsp;&nbsp; No hay usuarios agregados a la organización
               
               <br>
            </v-col>
            <v-col cols="12"  >
                <v-btn text class="cincel-yellow-txt" 
                    v-if="AviableUserSlots"
                    @click="addUserSlot"> 
                        <v-icon small>mdi-plus</v-icon> Agregar usuario </v-btn>
                    <div v-else class="text-center form-title" >
                        <em>Haz alcanzado el numero máximo de invitaciones disponibles en tu plan. </em>
                    </div>
            </v-col>
            <v-col cols="12" class="text-center mt-5">
                <v-btn   class="cincel-border-btn mr-4 "  nuxt link to="/client/organizations">
                    Cancelar
                </v-btn>
                <v-btn class="cincel-yellow-btn" @click="saveUsers" 
                :disabled="!valid " :loading="loading">
                    Continuar
                </v-btn>
            </v-col>

        </v-row>
    </v-form>
</template>

<script>
import rules from "~/assets/js/rules";
import Roles from "~/data/Roles";
import {CommonMixins} from "~/mixins/Common";
import {UpgradeControls} from "~/mixins/UpgradeControls";
export default {
params:['idOrganization'],
mixins:[CommonMixins,UpgradeControls],
async mounted(){
    //la idea es que aqui, se haga la llamada a los usuarios de una organizacion a partir del id de parametros...
    //como no se si por default existe el primer usuario con el rol de owner, asumire que si, entonces, siempre va a existir un usuario en esta lista
    // teoricamente, tendriamos el resultado de esa llamada en currentUsers;
    this.currentUsers = [...this.$store.getters['organizations/currentOrganizationUsers']];
},
data(){
    return {
        currentUsers:[],
        rules,
        loading:false,
        roles:Roles,
        valid:false,
    }
},
methods:{
    addUserSlot(){
        let user = {
            invite_email:'',
            invite_name:'',
            invite_rol:3,
        };
        this.currentUsers.push(user);
    },
    removeUser(indx){
        let leftUsers = [];
        for (let i in this.currentUsers){
            if(i != indx){
                leftUsers.push(this.currentUsers[i]);
            }
        }
        this.currentUsers = leftUsers;
    },
    async saveUsers(){
        if(this.valid){
            this.loading = true;
            for(let i in this.currentUsers){
                this.currentUsers[i].permissions = this.getRolPermission(this.currentUsers[i].invite_rol);
            }
            let response = await this.$store.dispatch('organizations/sendInvitationOrganization',this.currentUsers);
            //console.log(response);
            this.loading = false;
            if(response.success.length == this.currentUsers.length){
                this.$router.push("/client/organizations");
            } else{
                // TODO: QUE HACER SI REGRESA ERRORES?
            }
                
       }
    },
    getRolPermission(idRol){
        let permissions;
        for(let i in Roles){
            if(Roles[i].id == idRol)
                permissions = [...Roles[i].permissions];
        }
        return permissions;
    }
},
computed:{
    AviableUserSlots(){
        if(this.currentUsers.length == this.maxUsers)
            return false;
        else 
            return true;
    }
}
}
</script>

<style scoped>
    .user-card{
        border-radius: 10px!important;
        box-shadow: 13px 13px 10px -10px #c7c9cb!important;
        border: solid 1px #f6f6f6!important;
    }
</style>