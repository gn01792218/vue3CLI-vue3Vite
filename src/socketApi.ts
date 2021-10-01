import{sendWSPush} from "./webSocket"
import protoRoot from '@/assets/js/proto'
//proto型態
export const protoHeader = protoRoot.lookupType('foundation.Header')
export const protoLogin = protoRoot.lookupType('auth.LoginCall') 
export const protoTableJoinCall =protoRoot.lookupType('table.TableJoinCall') 

//各種send方法

//發送登入訊息
export const sendLogin =(data:any)=>{
    let proto = protoLogin.create({
        header:protoHeader.create({
            uri:data.uri
        }),
        account:data.account,
        password:data.password
    })
    sendWSPush(proto,"auth.LoginCall");
}
//發送選桌訊息
export const sendTableJoinCall =(data:any)=>{
    let proto = protoTableJoinCall.create({
        header:protoHeader.create({
            uri:data.uri
        }),
        uuid:data.uuid
    })
    sendWSPush(proto,"table.TableJoinCall");
}

//發送...