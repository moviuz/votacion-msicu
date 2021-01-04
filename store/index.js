export const state = () => ({})


export const actions = {
    socket_newMessage(cxt, data) { 
        console.log('Mensaje recibido front ', data)
    }
} 