/* CRUD HELPERS */

const customResponse = {
    ok:true,
    payload:{},
  }

export const api = {
    post:postFunction,
    get:getFunction,
};

async function postFunction(context,path,payload){
    let response = {...customResponse};
    try {
        response = await context.$axios.$post(path,payload).then(res => {
            //console.log('entrando a then de helper %o',res);
            return res;
        }).catch(function(e) {
            //console.log('entrando a catch de axios/helper, %o',e);
            response.ok = false;
            response.payload = {};
            return response; 
        });
        //console.log('custom post function helper, %o',response);
    } catch(error){
        console.log('catched Errors, %o',error);
        response.ok = false;
        response.payload = error;
    };
    return response;
}

async function getFunction(vue,path,payload){
    let response = {...customResponse};
    try {
        response = await vue.$axios.$get(path,payload).then(res => {
            //console.log('entrando a then de helper %o',res);
            return res;
        }).catch(function(e) {
            //console.log('entrando a catch de axios/helper, %o',e);
            response.ok = false;
            response.payload = {};
            return response; 
        });
    } catch(error){
        console.log('catched Errors, %o',error);
        response.ok = false;
        response.payload = error;
    };
    return response;
}


/* OTHER HELPERS */




export function errors(errorsArray){
    console.log(errorsArray)
    let auxString = ''
    let first = true
    errorsArray.forEach((e)=>{
        if (first) auxString +=  e['name'] ? `${e['name']}:${e['message']}`:`${e['message']}` 
        else auxString += e['name'] ? `, ${e['name']}:${e['message']}`:`, ${e['message']}` 
        first = false
    })
    return auxString
};

export function decodeJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  }
