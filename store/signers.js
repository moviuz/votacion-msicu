import { api } from "~/assets/js/helpers"

const state = () => ({
    signers:[]
});

const mutations = {
    setSigners(state, data) {
        state.signers = [...data]
    }
}

const actions = {

}

const getters = {
    externalSigners: state => {
        return state.signers
    }
}

const signersModule = {
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
};

export default signersModule