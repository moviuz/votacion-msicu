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
    async fetchFiles(vuexContext, payload) {
        let currentUser = vuexContext.rootGetters['auth/currentUser'];
        let currentOrganization = vuexContext.rootGetters['organizations/currentOrganization'];
        let query;
        if (currentOrganization.id == 0) {
            query = "/users/" + currentUser.id + "/documents";
        } else {
            query = "users/" + currentUser.id + "/documents?organization_id=" + currentOrganization.id;
        }
        let postResponse = await api.get(this, query);
        if (postResponse.ok) {
            if (postResponse.payload.length > 0) {
                vuexContext.commit('setFiles', postResponse)

            }
            console.log("documentos respuesta %o", postResponse)        }
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
