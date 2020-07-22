
import { errors } from '~/assets/js/helpers.js'
import parsers from "~/assets/js/parsersApi";
export default function ({ $axios, redirect , store}) {
  const customResponse = {
    ok:true,
    payload:{},
  }

   $axios.onRequest(config => {
      return config;
  });

  
  $axios.onResponse(response => {
    let resp = {...customResponse,intercepted:true};
    //console.log('interceptor onResponse %o', response);
    if (!response.data.ok && response.data.ok == false) {
      //console.log('se cacha como error con respuesta estandar',response)
      resp.ok == false,
      resp.payload = {};
      store.dispatch('alerts/addErrorAlert',parsers.errors(response.data.errors))
    } else if (response.data.errors && response.data.errors.authentication) {
        resp.ok = false;
        resp.payload = response.data;
        store.dispatch('alerts/addErrorAlert',response.data.errors.authentication);
      //throw new Error(response.data.errors.authentication);
    } else if (response.data.errors && response.data.errors.constructor === Array) {
      resp.ok = false;
      resp.payload = {};
      console.log('se detecta error en la raiz tipo array ',errors(response.data) );
      store.dispatch('alerts/addErrorAlert',errors(response.data.errors) );
    } else if (response.data.ok == true) {
      resp.payload = response.data.payload;
    } else {
      resp.payload = response.data;
    }
    response.data = resp;
    return response;
    //return resp;
  });


  $axios.onError(error => {
    let resp = {...customResponse,intercepted:true};
    console.log('interceptor onError %o', error);
    store.dispatch('alerts/addErrorAlert',error);
    throw new Error();
  });


}