export default [
    /*    {
            name:'Owner',
            id:1,
            permissions:[
                
            ]
        },
        // respaldo, se cambio esto por manage 
        {name:'invitations',action:'create'},
                {name:'invitations',action:'read'},
                {name:'invitations',action:'update'},
                {name:'invitations',action:'delete'},
    */
        {
            name:'Admin',
            id:2,
            permissions:[
                
                {name:'invitations',action:'manage'},
                
                {name:'documents',action:'manage'},
    
                {name:'files',action:'manage'},
    
                { name:'organization_users', action: 'manage' },
                
                {name:'organization_invitations',action:'manage'},
    
                {name:'document_permissions',action:'manage'},
    
                {name:'document_comments',action:'manage'},
    
                {name:'file_comments',action:'manage'},
                
                {name:'organization_permissions',action:'manage'},
    
            ] 
        },
        {
            name:'Regular',
            id:3,
            permissions:[
                {name:'documents',action:'create'},
                {name:'documents', action:'read'},
                {name:'documents',action:'update'},
                
                {name:'invitations',action:'manage'},

                {name:'organization_users',action:'read'},
        
                {name:'files',action:'manage'},
    
                {name:'document_permissions',action:'manage'},
    
                {name:'document_comments',action:'create'},
                {name:'document_comments',action:'read'},
                
                {name:'file_comments',action:'manage'},
    
            ]
        },
    ];