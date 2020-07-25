import { api } from "~/assets/js/helpers"

const state = () => ({
    files: []
});

const mutations = {
    setFiles(state, files) {
        state.files = files
    }
}

const actions = {
    async fetchDocuments(vuexContext, payload) {
       // hay que validar en que organizacion se encuentra
    }
}

const getters = {
    getAllFiles: state => {
        return state.files;
    }
}

const fileModule = {
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
};

export default fileModule;
