import { differenceInMinutes } from 'date-fns';

//const differenceInMinutes = require('date-fns/differenceInMinutes')
const state = () => ({
    expirations:[],
});

const mutations = {
    
};

const actions = {
    async checkout(vuexContext,payload){
        const serverCalls = [{
            name:'Plans',
            action:'suscriptions/planProducts',
            mutation:'suscriptions/setPlanProducts',
            minutes:1,
        },
        {
            name:'Notifications',
            action:'notifications/getAllNotifications',
            mutation:'suscriptions/setPlanProducts',
            minutes:1,
        }];

        for(let i in serverCalls){
            let storeTemplate = JSON.parse(sessionStorage.getItem(serverCalls[i].name)) || null; 
            if(storeTemplate){
                
                if(differenceInMinutes(Date.now(),storeTemplate.load_time) > serverCalls[i].minutes){
                    console.log('sobre pasa el tiempo, se llama a servidor'),console.log(differenceInMinutes(Date.now(),storeTemplate.load_time))

                } else {
                    //console.log('Esta en el rango');
                }
                //console.log('recuperado: %o', storeTemplate);
             } else {
                storeTemplate = await vuexContext.dispatch('createTimerObject',serverCalls[i]);
                storeTemplate.payload = await vuexContext.dispatch(serverCalls[i].action,{},{root:true});
                vuexContext.commit(serverCalls[i].mutation,storeTemplate.payload,{root:true});
                sessionStorage.setItem('Plans',JSON.stringify(storeTemplate));
             }
        }
        return  ;
    },
    async createTimerObject(vuexContext,payload){
        console.log('creating the object')
        const defaults = {
            load_time: Date.now(),
            minutes:payload.minutes,
            name:payload.name,
            data:payload.data,
        };
        return defaults;
    }
};

const syncModule = {
    state:state,
    mutations:mutations,
    actions:actions,

};
export default syncModule;