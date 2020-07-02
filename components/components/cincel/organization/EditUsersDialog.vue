<template>
<v-dialog
    persistent
    medium
    content-class="form-dialog"
    v-model="open" >
    <v-card>
        <v-card-text class="pt-5" style="max-height:500px;overflow:auto">
            <v-row no-gutters="" >
                <v-col cols="12" class="form-title pb-2" >
                    Usuarios
                </v-col>
                <v-col cols="12">
                    <v-row no-gutters  v-for="user in currentUsers" 
                        :key="'u'+user.id" class="py-2" >
                        <v-col cols="12"  sm="12" md="4" class="pr-2">
                            <div class="form-label">
                                Correo 
                            </div>
                            <v-text-field
                                outlined
                                dense
                                :rules="[rules.required,rules.email]"
                                v-model="user.email"
                                single-line
                                hide-details
                                disabled
                                label="Escribe el correo electronico"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="4" >
                            <div class="form-label">
                                Rol
                            </div>
                            <div class="form-title pt-2 pl-4">
                               {{userRol(user)}}
                            </div>
                            <v-select
                                v-if="false"
                                v-model="user.invite_rol"
                                :items="roles"
                                outlined
                                disabled
                                dense
                                hide-details
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
                                
                                @click="removeUser(user)">Eliminar</v-btn>
                        </v-col>
                        <v-col cols="12" class="py-2" v-if="orgInvitations.length > 1">
                            <v-divider></v-divider>
                        </v-col>
                    </v-row>
                    <div class="text-center form-label " v-if="currentUsers.length == 0">
                        Nadie a aceptado la invitación. 
                    </div>
                </v-col>
            </v-row>
            <v-row no-gutters v-if="orgInvitations.length > 0">
                <v-col cols="12" >
                    <v-row no-gutters  v-for="invite in orgInvitations" :key="invite.id" class="pb-2" >
                        <v-col cols="12"  sm="12" md="4" class="pr-2">
                            <div class="form-label">
                                Correo 
                            </div>
                            <v-text-field
                                outlined
                                dense
                                :rules="[rules.required,rules.email]"
                                v-model="invite.invite_email"
                                single-line
                                hide-details
                                disabled
                                label="Escribe el correo electronico"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="5" class="pr-2">
                            <div class="form-title pt-7 pl-4">
                               Invitacion pendiente
                            </div>
                        </v-col>   
                        <v-col cols="12" sm="12" md="3" class="text-right"  align-self="center" >
                            <v-btn style="text-transform:none" text 
                                class="red--text"
                                
                                @click="deleteInvitation(invite)">Eliminar</v-btn>
                        </v-col>
                    </v-row>
                </v-col>
                
            </v-row>
            <v-row no-gutters="" v-if="AviableInvitationSlots || pendingInvitations.length > 0">
                <v-col cols="12">
                    <v-form v-model="valid">
                        <v-row no-gutters v-for="(newInvite,indx) in pendingInvitations" :key="'i'+indx" class="pb-2">
                            <v-col cols="12"  sm="12" md="4" class="pr-2">
                                <div class="form-label">
                                    Correo 
                                </div>
                                <v-text-field
                                    outlined
                                    dense
                                    hide-details
                                    :rules="[rules.required,rules.email]"
                                    v-model="newInvite.invite_email"
                                    single-line
                                    label="Escribe el correo electronico"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="4" class="pr-2">
                                <div class="form-label">
                                    Rol
                                </div>
                                <v-select
                                    v-model="newInvite.invite_rol"
                                    :items="roles"
                                    outlined
                                    dense
                                    hide-details
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
                                    @click="removePendingInvitation(indx)">Eliminar</v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-col>
                <v-col cols="12" class="pt-1" >
                    <v-divider></v-divider>
                    <div v-if="AviableInvitationSlots">
                        <v-btn text class="cincel-yellow-txt" 
                            @click="addInviteSlot"> 
                            <v-icon small>mdi-plus</v-icon> Invitar usuario 
                        </v-btn>
                       
                    </div>
                    
                    <div v-else class="text-center form-title" >
                        <em>Haz alcanzado el numero máximo de invitaciones disponibles en tu plan. </em>
                    </div>
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
import Users from "~/components/cincel/organization/users"
import Roles from "~/data/Roles";
import {UpgradeControls} from "~/mixins/UpgradeControls";
import {getCurrentRol} from "~/assets/js/helpers"
export default {
  props: {
    open: Boolean,
  },
  components:{
    Users
  },
  mixins:[UpgradeControls],
  async mounted(){
    //la idea es que aqui, se haga la llamada a los usuarios de una organizacion a partir del id de parametros...
    //como no se si por default existe el primer usuario con el rol de owner, asumire que si, entonces, siempre va a existir un usuario en esta lista
    // teoricamente, tendriamos el resultado de esa llamada en currentUsers;
    //console.log('mounting dialog')
    this.currentUsers = [...this.$store.getters['organizations/currentOrganizationUsers']];
    this.initialUserLength = this.currentUsers.length;
    this.initialInviteLength = this.$store.getters['organizations/currentOrganizationInvitations'].length;
    //console.log(this.initialInviteLength,this.initialUserLength);
 },
  data() {
    return {
        valid:false,
        rules,
        loading:false,
        roles:Roles,
        currentUsers:[],
        pendingInvitations:[],
        initialInviteLength:0,
        initialPendingLength:0,
        initialUserLength:0,

    };
  },
  methods:{
  	close(){
  		this.$emit('Closing',false);
    },
    async saveChanges(){
        this.loading = true;
        for(let i in this.pendingInvitations){
            this.pendingInvitations[i].permissions = this.getRolPermission(this.pendingInvitations[i].invite_rol);
        }
        let response = await this.$store.dispatch('organizations/sendInvitationOrganization',this.pendingInvitations);
        //console.log(response);
        this.loading = false;
        if(response.success.length == this.pendingInvitations.length){
            //this.$router.push("/client/organizations");
            this.close();
        } else{
            // TODO: QUE HACER SI REGRESA ERRORES?
        }
    },
    userRol(user){
      let currentRol = getCurrentRol(user.permissions)
      return currentRol.name;
    },
    getRolPermission(idRol){
        let permissions;
        for(let i in Roles){
            if(Roles[i].id == idRol)
                permissions = [...Roles[i].permissions];
        }
        return permissions;
    },
    addInviteSlot(){
        let newInvite = {
            invite_email:'',
            invite_name:'',
            invite_rol:3,
        };
        this.pendingInvitations.push(newInvite);
    },
    removePendingInvitation(indx){
        let leftInvites = [];
        for (let i in this.pendingInvitations){
            if(i != indx){
                leftInvites.push(this.pendingInvitations[i]);
            }
        }
        this.pendingInvitations = leftInvites;
    },
    async deleteInvitation(indx){
        let deleteResponse = await this.$store.dispatch('organizations/deleteInvitationFromOrganization',{invitation:indx});
        if(deleteResponse.ok){
            this.close();
        }
    },
    async removeUser(user){
       this.loading = true;
       let deleteResponse = await this.$store.dispatch('organizations/deleteUserFromOrganization',{idUser:user.id});
       this.loading = false; 
       if(deleteResponse){
           this.close();
       }
    }
  },
  computed:{
        validChanges(){
            if((this.initialPendingLength != this.pendingInvitations.length) && this.valid)
                return false;
            else
                return true;
        },
        orgInvitations(){
            return this.$store.getters['organizations/currentOrganizationInvitations'];
        },
        orgUsers(){
            return this.$store.getters['organizations/currentOrganizationUsers'];
        },
        AviableInvitationSlots(){
            let countUsers = this.orgUsers.length;
            //let cuntInvites = this.orgInvitations.length;
            let countPendingInvites = this.pendingInvitations.length;
            if((countUsers + countPendingInvites) == this.maxUsers)
                return false;
            else 
                return true;
        }
  }
}
</script>

<style >

</style>