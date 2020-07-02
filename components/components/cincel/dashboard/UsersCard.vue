<template>
  <v-card class="dash-card fill-height">
    <v-card-text class="fill-height">
        <v-row no-gutters="" row wrap>
            <v-col cols="11">
            <span class="dash-card-title">Usuarios</span>
            <v-spacer></v-spacer>
            </v-col>
            <v-col cols="1" class="text-center">
            
            </v-col>
            <v-col cols="12" class="py-2">
            <v-divider></v-divider>
            </v-col>
            <v-col cols="12">
            <v-row no-gutters v-if="!loading">
                <v-col cols="12" v-for="(user,$index) in users" :key="user.id">
                    <v-row >
                        <v-col cols="12" class="" style="font-size:12px;!important">
                           {{$index+1}}.- &nbsp; <span  class="form-label">{{user.name}}</span>   - <span>{{user.email}}</span>
                           
                        </v-col>
                        <v-col cols="12">
                            <v-divider></v-divider>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12" class="py-4 text-center" v-if="users.length == 0">
                    <div class="form-title">No hay usuarios registrados</div>
                </v-col>
                <v-col cols="12" v-if="false">
                    <v-btn class="cincel-yellow-btn" block nuxt link to="/client/plans/?config=upgrade">
                        Ver planes de pago
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
import {getCurrentRol} from "~/assets/js/helpers"
export default {
    props:{
        users:{
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
        userRol(user){
            let currentRol = getCurrentRol(user.permissions)
            return currentRol.name;
        },
    }
}
</script>

<style>

</style>