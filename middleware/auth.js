export default async function (context){
	//if (!context.store.getters['auth/isAuthenticated'] || !context.store.getters['auth/user']) {
    // se quito la segunda validacion, se checara para que se habia implementado
	await context.store.dispatch('auth/initAuth');
	if(!context.store.getters['auth/isAuthenticated'] || !context.store.getters['auth/currentUser']){
		if(context.route.path != '/login'){
			context.redirect('/login')
			context.store.dispatch('alerts/addErrorAlert',"Necesitas iniciar sesión para poder acceder.")
		}
	}
}