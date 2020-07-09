<template>
    <v-card class="mobile-panel primary" elevation="0">
        <v-card-text class="px-2">
            <v-row no-gutters>
                <v-col cols="1" v-if="BackBtn">
                    <v-btn  icon @click="GoBackArrow">
                        <v-icon color="">mdi-arrow-left</v-icon>
                    </v-btn>
                </v-col>
                <v-col :cols="slotSize" >
                    <slot name="mobile-content"></slot>
                </v-col>
            </v-row>
        </v-card-text>  
    </v-card>
</template>

<script>
export default {
    props:{
        BackBtn:{
            type:Boolean,
            default:false
        },
        BackBtnPage:{
            type:String,
        }
    },
    mounted(){
        //console.log(this.BackBtn,this.BackBtnPage);
    },
    data(){
        return{

        }
    },
    methods:{
        GoBackArrow(){
            if(this.BackBtnPage){
                this.$router.push(this.BackBtnPage);
            } else {
                this.$router.go(-1)
            }
        }
    },
    computed:{
        slotSize(){
            if(this.BackBtn){
                return 11;
            } else {
                return 12;
            }
        }
    }
}
</script>

<style scoped>
    .mobile-panel{
       
        border-top-left-radius: 0px!important;
        border-top-right-radius: 0px!important;
        border-bottom-right-radius: 10px!important;
        border-bottom-left-radius: 10px!important;
        margin-bottom:3px;
    } 
</style>