<template>
    <div>
        <v-dialog  v-model="dialog" max-width="450px" persistent>
            <v-card>
                <v-form ref="survey_dialog" v-model="valid">
                <v-card-title
                class="headline blue-grey--text pb-0"
                style="display: block; width=100%"  
                >
                Nueva encuesta
                <v-icon class="float-right" @click="cerrarDialog">
                    mdi-close
                </v-icon>
                </v-card-title>
                <v-card-text class="pb-0">
                <v-col cols="11">
                <v-text-field
                v-model="survey.pregunta"
                class="filed mb-0"
                :rules="[rules.required,rules.spacer,rules.minLength(1,'debe contener almenos 1 caracter'), rules.maxLength(80, 'Tiene un maximo de 80 caracteres')]"
                label="Escribe tu pregunta"
                outlined
                dense
                />
                </v-col>
                <v-col cols="11">
                <v-text-field
                v-model="survey.consulta1"
                class="filed mb-0"
                :rules="[rules.required,rules.spacer,rules.minLength(1,'debe contener almenos 1 caracter'), rules.maxLength(80, 'Tiene un maximo de 80 caracteres')]"
                label="Escribe la primer opcion"
                outlined
                dense
                /></v-col>
                <v-col cols="11">
                <v-text-field
                v-model="survey.consulta2"
                class="filed mb-0"
                :rules="[rules.required,rules.spacer,rules.minLength(1,'debe contener almenos 1 caracter'), rules.maxLength(80, 'Tiene un maximo de 80 caracteres')]"
                label="Escribe la 2da opcion"
                outlined
                dense
                />
                </v-col>
                <v-col cols="11">
                    <v-text-field
                    v-model="survey.consulta3"
                    clas="filed mb-0"
                    :rules="[rules.required,rules.spacer,rules.minLength(1,'debe contener almenos 1 caracter'), rules.maxLength(120, 'La contraseña tiene un maximo de 10 caracteres')]"
                    label="Escribe la 3dera opcion"
                    outlined
                    dense
                    />
                </v-col>
               </v-card-text>
               <v-card-actions>
                   <v-btn  v-if="false" @click="clearForm">Limpiar formulario</v-btn>
                   <v-spacer></v-spacer>
                   <v-btn @click="crear" :disabled="!valid" class="preguntas-acept-btn">Crear encuesta</v-btn>
               </v-card-actions>
                 </v-form>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import rules from "~/assets/js/rules";

export default {
    props:{
        dialog:{
            type : Boolean,
            default: false
        }
    },
    middleware:["auth"],
    data(){
        return{
            rules,
             valid: false,
             survey:{
             pregunta: '',
             consulta1: '',
             consulta2: '',
             consulta3: ''},
             surveyDefault:{
             pregunta: null,
             consulta1: null,
             consulta2: null,
             consulta3: null}
        }
    },
    methods:{
        new_survey(){
        
        },
        cerrarDialog(){
            this.survey = this.surveyDefault
            this.$refs.survey_dialog.resetValidation();
             this.$emit("closeDialog");
        },
        clearForm(){
            this.survey.pregunta = null,
            this.survey.consulta1 = null,
            this.survey.consulta2 = null,
            this.survey.consulta3 = null,
            this.$refs.survey_dialog.resetValidation();

        },
        crear(){
            let control = this.survey
            control.control = 1
            this.survey = this.surveyDefault
            this.$refs.survey_dialog.resetValidation();
            this.$emit('createSurvey',control);
        }
    },
    
}
</script>
<style scoped>
.preguntas-acept-btn{
    background-color: #2196F3!important;
    color:blanchedalmond
}
</style>