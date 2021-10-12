
import {sendWSPush} from "./webSocket"
import protoRoot from '@/assets/js/proto'
import store from './store' //在元件之外要使用store，不能用useStore

//proto型態
export const protoHeader = protoRoot.lookupType('foundation.Message')
export const routes = protoRoot.lookupEnum('route.URI')
//包裝proto的方法
const encodeProto = (data:any,lookupType:any)=>{
    let proto = lookupType.encode(data).finish();
    return proto
}
//各種send方法
//發送登入訊息
export const sendLogin =(data:any)=>{
    const protoLogin = protoRoot.lookupType('auth.LoginCall') 
    let proto = protoLogin.create({
        header:protoHeader.create({
            uri:routes.values.LoginCall
        }),
        account:data.account,
        password:data.password
    })
    let message = encodeProto(proto,protoLogin)
    console.log("sendLogin",proto)
    sendWSPush(message);
}
//發送選桌訊息
export const sendTableJoinCall =(data:any)=>{
    const protoTableJoinCall =protoRoot.lookupType('table.TableJoinCall') 
    let proto = protoTableJoinCall.create({
        header:protoHeader.create({
            uri:routes.values.TableJoinCall
        }),
        uuid:data.uuid
    })
    let message = encodeProto(proto,protoTableJoinCall)
    console.log("sendTableJoinCall",proto)
    sendWSPush(message);
}

//發送...

//各種接收訊息的方法，可以在main.js中全局註冊監聽
export const getReCall = (e:any) =>{
    let header= protoHeader.decode(new Uint8Array(e.detail.msg.data)); //要先轉成Unit8再用Header解析meg
    switch(header.header.uri){
        case routes.values.LoginRecall:
            let LoginreCall = protoRoot.lookupType('auth.LoginRecall').decode(new Uint8Array(e.detail.msg.data))
            console.log('LoginreCall',LoginreCall)
            store.commit("auth/setLoginRecall",LoginreCall)  //把資料灌到Vuex中
            break;
        case routes.values.LobbyInfo:
            let lobyInfo = protoRoot.lookupType('lobby.LobbyInfo').decode(new Uint8Array(e.detail.msg.data))
            console.log('lobyInfo',lobyInfo)
            store.commit("lobby/setLobbyInfo",lobyInfo)  //把資料灌到Vuex中
            break;
        case routes.values.UserInfo:
            let userInfo = protoRoot.lookupType('auth.UserInfo').decode(new Uint8Array(e.detail.msg.data))
            console.log('userInfo',userInfo)
            store.commit("auth/setUserInfo",userInfo)  //把資料灌到Vuex中
            break;
        case routes.values.TableJoinRecall:
            //先解析出是哪一桌
            let table = protoRoot.lookupType('table.TableJoinRecall').decode(new Uint8Array(e.detail.msg.data))
            console.log("TableJoinRecall",table)
            store.commit("table/setTableJoinRecall",table) //取得桌號
            break;
    }
}