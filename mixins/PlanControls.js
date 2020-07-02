export const PlanControls = {
    methods:{
        getPlanName(oldName){
            if(oldName == 'base')
                return 'Carbono';
            if(oldName == 'genesis')
                return 'Oro';
            if(oldName == 'stone')
                return 'Diamante';
        }
    },
    computed:{
        extraUsers(){
            let plans = this.$store.getters['suscriptions/getPlansInfo'];
            return plans.filter(p => { p.name == 'extra_user'});
        },
        currentActivePlan(){
            return this.$store.getters["subscriptions/getCurrentActivePlan"]

        },
        userPlans(){
            return this.$store.getters['subscriptions/getUserPlans'];
        },

    }
}