import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'

export default function ({ store }) { 
    Vue.use(new VueSocketIO({
        debug: false,
        connection: 'localhost:3001',
        vuex: {
            store,
            actionPrefix: 'SOCKET_',
            mutationPrefix: 'SOCKET_'
        },
        //options: { path: "/my-app/" } //Optional options
    }))
}
