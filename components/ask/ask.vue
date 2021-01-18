<template>
    <v-card class="elevation-1 transparent">
        <v-card-text>
            <v-row no-gutters justify="center">
                <v-col cols="12" sm="10" md="7">
                    <div class="text-center title"> Crear una nueva pregunta</div>
                </v-col>
                <v-col cols="12" sm="10" md="7">
                <v-form @submit.prevent="new_survey" v-model="valid">
                    <v-row no-gutters="">
                        <v-col cols="12"> 
                            <label class="login-label">Escribe tu encuesta</label>
                            <v-text-field
                            class="login-field"
                            placeholder="Ingresa la lo que quieres consultar"
                            outlined
                            v-model="pregunta"
                            :rules="[rules.required]">
                            </v-text-field>
                        </v-col>
                        <v-col cols="12"> 
                            <label class="login-label">Escribe la primer opción</label>
                            <v-text-field
                            class="login-field"
                            placeholder="Ingresa la primer opción"
                            outlined
                            v-model="respuesta_1"
                            :rules="[rules.required]">
                            </v-text-field>
                        </v-col>
                        <v-col cols="12"> 
                            <label class="login-label">Escribe la segunda opción</label>
                            <v-text-field
                            class="login-field"
                            placeholder="Ingresa la segunda opción"
                            outlined
                            v-model="respuesta_2"
                            :rules="[rules.required]">
                            </v-text-field>
                        </v-col>
                        <v-col cols="12"> 
                            <label class="login-label">Escribe la tercera opción</label>
                            <v-text-field
                            class="login-field"
                            placeholder="Ingresa la segunda opción"
                            outlined
                            v-model="respuesta_3"
                            :rules="[rules.required]">
                            </v-text-field>
                        </v-col>
                    <v-col cols="12" class="text-center">
                        <div class="text-center">
                        <v-btn
                        class="cincel-yellow-btn"
                        :loading="loading"
                        color
                        variant="primary"
                        :disabled="!valid"
                        @click="login"> 
                       Crear encuesta</v-btn>
                </div>

              </v-col>
                    </v-row>
                </v-form>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>
<script>
import rules from "~/assets/js/rules";

export default {
      middleware:["auth"],
    data(){
        return{
            rules,
             valid: false,
        }
    },
    methods:{
        new_survey(){

        }
    }
}
</script><style scoped>

</style>