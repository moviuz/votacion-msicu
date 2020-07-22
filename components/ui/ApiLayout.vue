<template>
<v-row row wrap no-gutters >
    <v-col cols="12">
        <v-skeleton-loader v-if="rendering"  type="list-item,list-item"></v-skeleton-loader>
        <v-row row wrap no-gutters 
            class="component-expansor blue-grey lighten-4" 
            v-if="!rendering">
            <v-col cols="8" >
                <strong> {{title}} </strong>
            </v-col>
            <v-col cols="4" class="text-right">
                <v-btn small icon @click="expanded = !expanded" >
                    <v-icon v-if="!expanded">mdi-chevron-down</v-icon>
                    <v-icon v-if="expanded">mdi-chevron-up</v-icon>
                </v-btn>
            </v-col>                      
        </v-row>
    </v-col>
    <v-col cols="12" v-if="!expanded && !rendering" class="mt-1 " >
        <div class="custom-selected-item">
            <slot name="default-item" >
                <v-row no-gutters>
                    <v-col cols="10">
                        {{ items.length }} {{itemsName}} 
                    </v-col>
                    
                </v-row>
            </slot>
        </div>
    </v-col>
    <v-col cols="7" v-if="expanded" class="mt-2 pr-2" >
        <v-skeleton-loader v-if="rendering"  type="card-heading, list-item, list-item, list-item"></v-skeleton-loader>  
        <v-row v-if="!rendering" no-gutters class="" row wrap >
            <v-col cols="12" class="custom-list-header">
                <v-row no-gutters>
                    <v-col cols="7">
                        Lista
                    </v-col>
                    <v-col cols="5" class="text-right">
                        <v-btn color="" icon small @click="refreshClicked" >
                            <v-icon>mdi-refresh</v-icon>
                        </v-btn>
                        <v-btn color="" small text @click="createClicked">Nuevo</v-btn>
                    </v-col>
                </v-row>                  
            </v-col>
            <v-col cols="12"  class="custom-list" >
                <v-row no-gutters v-for="item in items" 
                    :key="item.id" class="custom-list-item" :class="{'active':(selectedItem && selectedItem.id == item.id)}" >
                    <v-col cols="12">
                        <slot name="item-content" v-bind:item="item">
                            <v-row no-gutters row wrap @dblclick="itemClicked(item)">
                                <v-col cols="7">
                                    <v-icon class="pr-1" v-if="iconName">{{iconName}}</v-icon>
                                    {{item[propText]}}
                                </v-col>
                                <v-col cols="5" class="text-right">
                                    <v-btn color="primary" v-if="item.id != 0" small elevation="0"  @click="editClicked(item)">editar</v-btn>
                                    <v-btn color="error" small elevation="0" @click="deleteClicked(item)">eliminar</v-btn>
                                </v-col>
                            </v-row>
                        </slot>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    
    </v-col>
    <v-col cols="5" v-if="expanded && formOpen" class="mt-2 pl-2">
        <v-row no-gutters class="" row wrap >
          <v-col cols="12" class="custom-list-header">
              <v-row no-gutters>
                  <v-col cols="7">
                      Formulario 
                  </v-col>
                  <v-col cols="5" class="text-right">
                      <v-btn color="" icon small @click="closeFormClicked" >
                          <v-icon>mdi-close</v-icon>
                      </v-btn>
                  </v-col>
              </v-row>
          </v-col>
          <v-col cols="12"  class="custom-list" >
              <slot name="form-content">
                  {{selectedItem}}
              </slot>
          </v-col>
      </v-row>        
    </v-col>
</v-row>
</template>

<script>
export default {
    props:{
        title:{
            type:String,
            default:'Api tester'
        },
        items:{
            type:Array,
            default:()=>{[]}
        },
        itemsName:{
            type:String,
            default:'items',
        },
        propText:{
            type:String,
            default:'name'
        },
        formOpen:{
            type:Boolean,
            default:false,
        },
        iconName:{
            type:String
        },
        selectedItem:{
            type:Object,
            default:() => { {} }
        },
        rendering:{
            type:Boolean,
            default:true,
        }
    },
    data(){
        return {
            expanded:false
        }
    },
    methods:{
        refreshClicked(){
            this.$emit('refresh')
        },
        createClicked(){
            this.$emit('createItem')
        },
        itemClicked(item){
            this.expanded = false;
            this.$emit('itemClicked',item);
            
        },
        editClicked(item){
            this.$emit('editItem',item);
        },
        deleteClicked(item){
            this.$emit('deleteItem',item);
        },
        closeFormClicked(){
            this.$emit('closeForm');
        },
    }
}
</script>

<style scoped>
    .custom-list-header{
        /* border: solid 1px #373b3f63!important; */
        border: solid 1px #dfe2e6!important;
        display: block;
        padding:6px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        background:#f5f6fa!important;
        line-height: 27px;
        font-size:13px;
        font-weight: bold;
        text-transform: uppercase!important;
        font-family: 'Montserrat';
    }

    .custom-list {
        height: 216px;
        display: block;
        /* border: solid 1px #373b3f63!important; */
        border: solid 1px #dfe2e6!important;
        border-top:none!important;
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 5px;
        overflow:auto;
        background:#fff;
    }
    .custom-list-item {
        /* border-bottom: solid 1px #dfe2e6!important;  */
        border-bottom: solid 1px #dfe2e6!important; 
        padding:7px;
        padding-left: 6px;
        padding-right: 5px;
        font-size:15px;
        line-height: 26px;
    }
    .custom-list-item.active {
        /* border-bottom: solid 1px #dfe2e6!important;  */
        background: #fbc02d33!important;
        border-bottom:solid 1px #dfe2e66b!important;
    }
    .custom-list-item.active:hover  {
        /* border-bottom: solid 1px #dfe2e6!important;  */
        background: #fbc02d33!important;
        border-bottom:solid 1px #dfe2e66b!important;
    }

    .custom-list-item:hover {
        background: #dfe2e66b!important;
        border-bottom:solid 1px #dfe2e66b!important;
        cursor:pointer;
    }

    .custom-list-item:last-child{
        border-bottom:solid 1px #dfe2e6!important;
        border-bottom-right-radius: 3px;
        border-bottom-left-radius: 3px;
    }
    .custom-selected-item {
        /* border-bottom: solid 1px #dfe2e6!important;  */
        border: solid 1px #dfe2e6!important; 
        border-radius: 5px;
        background: #fff!important;
        padding:7px;
        padding-left: 6px;
        padding-right: 5px;
        font-size:15px;
        line-height: 26px;
    }
    .component-expansor{
        border: solid 1px #dfe2e6!important;
        
        padding:6px;
        border-radius: 5px;
        /*background:#f5f6fa!important; */
        line-height: 35px;
        font-size:13px;
        font-weight: bold;
        text-transform: uppercase!important;
        font-family: 'Montserrat';
    }
</style>