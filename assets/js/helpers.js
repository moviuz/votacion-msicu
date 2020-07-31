import Roles from '~/data/Roles'
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
// funciones deferentes
export function signersOfFileByStage(document,file){
    let stages = []
    let userAux
    let auxStage = 1;
    document.invitations.forEach(i=>{
      let signer = file.signers.find(s=>s.email == i.invite_email)
      if(!i.stage){
        auxStage = Math.floor(Math.random() * 2) + 1;
        console.log("no regresa la propiedad stage para %o, se agrega a etapa %i",i.invite_email,auxStage);
      }
      userAux = {
        idInvitation:i.id,
        has_sign: (signer && signer.status && signer.status== "signed" ) ? true : false, 
        email: i.invite_email || i.user.email, 
        name: i.invite_name || i.user.name,
        avatar_url: (signer) ? signer.user.avatar_url:null, 
        stage:(i.stage) ? i.stage:auxStage,
      }
      if(stages[userAux.stage -1]){
        stages[userAux.stage -1].push(userAux);
      } else {
        stages[userAux.stage - 1] = [userAux];
      }
    })
    return stages;
  }
//post,put,get
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
};

export function getCurrentRol(permissionsArray) {
    if (permissionsArray && permissionsArray.length) {
        if (permissionsArray.length == 0) {
            return {
                name: 'Owner',
                id: 1,
                permissions: []
            };
        }
        if (permissionsArray.lenght == 9) {
            return Roles[0];
        } else {
            return Roles[1];
        }
    }
}
