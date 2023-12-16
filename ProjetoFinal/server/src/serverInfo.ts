export interface IServerInfo {
    http : {
    host : string , port : number ,
    auth : { user : string , pass : string }
    }
    }
    
export let serverInfo : IServerInfo ;