import { api } from "~/assets/js/helpers"
const state = () => ({
    count: 0
})

const mutations = {
    SOCKET_COUNTER_INCREMENT(state, counter) { 
        state.count = counter
    },
    SOCKET_COUNTER_DECREMENT(state, counter) { 
        state.count = counter
    } 
}

const actions = {
    socket_increment: ({ state, rootState }) => { 
        rootState.io.emit('increment', state.count)
    },
    socket_decrement: ({ state, rootState }) => { 
        rootState.io.emit('decrement', state.count)
    }
}

const getters = {
}

const testingModule = {
    state: state,
    mutations: mutations, 
    actions: actions,
    getters:getters
}

export default testingModule;
