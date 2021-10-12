
import {sendWSPush} from "./webSocket"
import protoRoot from '@/assets/js/proto'
import store from './store' //在元件之外要使用store，不能用useStore

//proto型態
export const protoHeader = protoRoot.lookupType('foundation.Message')
export const routes = protoRoot.lookupEnum('route.URI')
//包裝proto的方法
const encodeProto = (data:any,lookupType:any) => {
    let proto = lookupType.encode(data).finish();
    return proto
}
//各種send方法
//發送登入訊息
export const sendLogin =(data:any) => {
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
export const sendTableJoinCall =(data:any) => {
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
//發送下注資訊
export const sendBetCall = (data:any) => {
    const protoBetCall =protoRoot.lookupType('bet.BetCall') 
    let proto = protoBetCall.create({
        header:protoHeader.create({
            uri:routes.values.BetCall
        }),
        gameUuid:data.gameUuid,
        betIndex:data.betIndex,
        betArea:data.betArea,
    })
    let message = encodeProto(proto,protoBetCall)
    console.log("sendBetCall",proto)
    sendWSPush(message);
}
//發送...

//decode和發送資料到vuex
const decodeAndVuexProto = (prototype:string,data:any)=>{
    let decodeData = protoHeader.lookupType(prototype).decode(new Uint8Array(data));
    const vuexPath = prototype.replace('.','/')
    console.log(prototype,decodeData)
    store.commit(vuexPath,decodeData)
}
//各種接收訊息的方法，可以在main.js中全局註冊監聽
export const getReCall = (e:any) =>{
    let header= protoHeader.decode(new Uint8Array(e.detail.msg.data)) //要先轉成Unit8再用Header解析meg
    switch(header.header.uri){
        case routes.values.LoginRecall:
            decodeAndVuexProto('auth.LoginRecall',e.detail.msg.data)
            break;
        case routes.values.LobbyInfo:
            decodeAndVuexProto('lobby.LobbyInfo',e.detail.msg.data)
            break;
        case routes.values.UserInfo:
            decodeAndVuexProto('auth.UserInfo',e.detail.msg.data)
            break;
        case routes.values.TableJoinRecall:
            decodeAndVuexProto('table.TableJoinRecall',e.detail.msg.data)
            break;
        case routes.value.BetRecall:
            decodeAndVuexProto('bet.BetRecall',e.detail.msg.data)
    }
}