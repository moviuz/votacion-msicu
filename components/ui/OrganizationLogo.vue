<template>
  <v-card class="organization-logo  "  :class="[size,activeClass,elevationClass] " 
    :style="{backgroundImage:'url('+organization.image+')',backgroundSize:'contain',backgroundPosition:'center'}" 
    @click="clickOnImage(organization)">
        <v-card-text class="pa-0" >
        
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    props:{
        organization:Object,
        size:{
            type:String,
            default:'md'
        },
        active:{
            type:Boolean,
            default:false,
        },
        elevation:{
            type:Boolean,
            default:false,
        }
    },
    mounted(){
     
    },
    data(){
        return{ };
    },
    methods:{
        clickOnImage(org){
            this.$emit('clickedImage',org);
        }
    },
    computed:{
        activeClass(){
            if(this.active == true){
                return 'active-logo';
            }
        },
        elevationClass(){
            if(this.elevation == false ){
                return 'elevation-0';
            }
        }
    }
}
</script>

<style scoped>

 .organization-logo{
    width: 60px!important;
    height: 60px!important;
    border-radius: 40px!important;
   
  }
  
  .organization-logo.elevation{
       box-shadow: 0 2px 9px 3px rgba(0, 0, 0, 0.18)!important;

  }

  .organization-logo.active-logo{
      box-shadow: 0 2px 9px 3px #0D30FF!important;
  }
.v-card--link:focus:before{
    opacity: 0!important;
}

 .organization-logo.sm{
     width: 40px!important;
     height: 40px!important;
 }
</style>