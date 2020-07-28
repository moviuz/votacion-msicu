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
        let postResponse = await api.get(this, query)
            //.then((documents => {
                let file, contador, signer
                /*documents = documents.sort(function (a, b) {
                    return new Date(b.created_at) - new Date(a.created_at);
                });*/
                if (currentOrganization.id == 0) {
                    let organizations = vuexContext.rootGetters['organizations/userOrganizations'];
                    documents = documents.filter(d => d.owner_type == 'User' || organizations.findIndex(o => o.id == d.owner_id) == -1)
                }
                vuexContext.commit("setDocuments", documents);
            //})
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
