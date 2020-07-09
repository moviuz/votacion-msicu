<template>
  <v-card class="transparent" elevation="0">
      <v-card-text>
          <v-container >
              <v-row no-gutters>
                  <v-col cols="12" v-if="!hideTitle">
                      <v-row no-gutters>
                          <v-col cols="7">
                            <div class="desktop-title">{{title}}</div>
                            <div class="desktop-subtitle">{{subtitle}}</div>
                          </v-col>
                          <v-col cols="5" class="text-right" v-if="this.redirectTo" >
                             <ActionButton  v-if="true" :text="actionName" :to="this.redirectTo" ></ActionButton>
                          </v-col>
                      </v-row>
                  </v-col>
                  <v-col cols="12" style="min-height:80vh">
                      <slot name="main-content">

                      </slot>
                  </v-col>
              </v-row>
          </v-container> 
      </v-card-text>
  </v-card>
</template>

<script>
import ActionButton from '~/components/ui/buttons/ActionButton'
export default {
    props:{
        title:{
            type:String,
            default:''
        },
        subtitle:{
            type:String,
        },
        hideTitle:{
            type:Boolean,
            default:false,
        },
        redirectTo:{
            type:String,
            default:'',
        },
        actionName:{
            type:String,
        }
    },
    components:{
        ActionButton
    },
    methods:{
        clickedBtn(){
            this.$emit('clickedBtn');
        }
    }
}
</script>

<style>

</style>