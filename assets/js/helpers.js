/* CRUD HELPERS */

const customResponse = {
    ok:true,
    payload:{},
  }

export const api = {
    post:postFunction,
    get:getFunction,
    put:putFunction,
    delete:deleteFunction
};

async function postFunction(vue,path,payload){
    let response = {...customResponse};
    try {
        response = await vue.$axios.$post(path,payload).then(res => {
            if(res.data){
                if(!res.data.ok){
                    console.log('POST: esta llamada no cumple estandares => '+ path);
                }
                return res.data;
            }
            return res;
        }).catch(function(e) {
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

async function getFunction(vue,path,payload){
    let response = {...customResponse};
    try {
        response = await vue.$axios.$get(path,payload).then(res => {
            if(!res.ok){
                console.log('GET:esta llamada no cumple estandares => '+ path);
            }
            return res;
        }).catch(function(e) {
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

async function putFunction(vue,path,payload){
    let response = {...customResponse};
    try {
        response = await vue.$axios.put(path,payload).then(res =>{
            if(!res.data.ok){
                console.log('PUT: esta llamada no cumple estandares => '+ path);
            } 
            return res.data;
        }).catch(function(e) {
            response.ok = false;
            response.payload = {};
            return response; 
        });
    }catch(error){
        console.log('catched Errors, %o',error);
        response.ok = false;
        response.payload = error;
    }
    //console.log(response);
    return response;
}

async function deleteFunction(vue,path,payload){
    let response = {...customResponse};
    try{
        response = await vue.$axios.delete(path,payload).then(res => {
            //console.log(res);
            if(res.data){
                return res.data
            }
            return res;
        }).catch(function(e) {
            response.ok = false;
            response.payload = {};
            return response; 
        });
    } catch(error){
        console.log('catched Errors, %o',error);
        response.ok = false;
        response.payload = error;
    }
    //console.log(response);
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
