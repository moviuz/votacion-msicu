//import parser  from '~/assets/js/parsersApi';

const alerts = { 
    state:() => ({
        randomIds:[],
        alerts:[],
        upgrade:{
            active:false,
            type:'loading',
            text:null,
        }
    }),
    mutations:{
        addSuccessMutation(state,data){
            //success card config here.
           
            let alertConfig = {
                id:data.id,
                type:'success',
                text:data.data,
                color:'green darken-2'
            }
            
            state.alerts.push(alertConfig);
        },
        addErrorMutation(state,data){
            //success card config here.
            
            let alertConfig = {
                id:data.id,
                type:'error',
                text:data.data,
                color:'red darken-2',
            }
            
            state.alerts.push(alertConfig);
        },
        addRandomId(state,data){
            state.randomIds.push(data);
        },
        deleteId(state,data){
            let newArray = [];
            for(let i in state.alerts){
                if(state.alerts[i].id != data.id){
                    newArray.push(state.alerts[i]);
                }
            }
            state.alerts = newArray;
        },
        closeUpgradeAlert(state,data){
            state.upgrade = {
                active:false,
                type:'loading',
                text:null,
            };
        },
        openUpgradeAlert(state,data){
            state.upgrade = data;
        }
    },
    actions:{
        async addSuccessAlert(context,data){
            //console.log('alerts action activated')
            let alertData = {
                id: await context.dispatch('createRandomId'),
                data:data,
                color:'success',
            }
            context.commit('addSuccessMutation',alertData);
            setTimeout(function(){
                context.commit('deleteId',alertData);
            },1500);
        },
        async addErrorAlert(context,data){
            let alertData = {
                id: await context.dispatch('createRandomId'),
                data:data,
                color:'red',
            }
            //console.log(data);
            if(typeof data != 'string'){
                //alertData.data = parser.errors(data);
            }
            context.commit('addErrorMutation',alertData);
            setTimeout(function(){
                context.commit('deleteId',alertData);
            },2000);

        },
        async createRandomId(VuexContext,data){
            let uiid = 0;
            do {
                uiid = Math.floor(Math.random() * 1000001);
                
            } while( VuexContext.state.randomIds.indexOf(uiid) != -1 );
            VuexContext.commit("addRandomId",uiid);
            return uiid;
        },
        openUpgradeAlert(vuexContext,data){
            let upgrading = {
                active:true,
                text:data.text,
                type:data.type ? data.type:'plans',
            }
            vuexContext.commit('openUpgradeAlert',upgrading);
        },
        closeUpgradeAlert(vuexContext,data){
            vuexContext.commit('closeUpgradeAlert');
        }

    },
    getters:{
        activeAlerts: state => {
           // console.log('getter called',state)
            return state.alerts;
        },
        upgradeAlert:state => {
            return state.upgrade;
        }
    }
}
export default alerts;