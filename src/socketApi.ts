
import {sendWSPush} from "./webSocket"
import protoRoot from '@/assets/js/bundle'

import store from './store' //在元件之外要使用store，不能用useStore
//proto型態
// export const protoHeader = protoRoot.lookupType('foundation.Message')
// export const routes = protoRoot.lookupEnum('route.URI')
const protoHeader = protoRoot.foundation.Header
const route = protoRoot.route.URI
//包裝proto的方法
// const encodeProto = (data:any,lookupType:any) => {
//     let proto = lookupType.encode(data).finish();
//     return proto
// }
//decode和發送資料到vuex
// const decodeAndVuexProto = (prototype:string,data:any)=>{
//     let decodeData = protoHeader.lookupType(prototype).decode(new Uint8Array(data));
//     const vuexPath = prototype.replace('.','/')
//     console.log(prototype,decodeData)
//     store.commit(vuexPath,decodeData)
// }
//各種send方法
//發送登入訊息
export const sendLogin =(data:any) => {
    let proto = protoRoot.auth.LoginCall.create({
        header:protoHeader.create({
            uri:route.LoginCall
        }),
        account:data.account,
        password:data.password
    })
    let bytes = protoRoot.auth.LoginCall.encode(proto).finish()
    console.log("sendLogin",proto)
    sendWSPush(bytes);
}
//發送選桌訊息
export const sendTableJoinCall =(data:any) => {
    let proto = protoRoot.table.TableJoinCall.create({
        header:protoHeader.create({
            uri:route.TableJoinCall
        }),
        uuid:data.uuid
    })
    let bytes = protoRoot.table.TableJoinCall.encode(proto).finish()
    console.log("sendTableJoinCall",proto)
    sendWSPush(bytes);
}
//發送下注資訊
export const sendBetCall = (data:any) => {
    let proto = protoRoot.bet.BetCall.create({
        header:protoHeader.create({
            uri:route.BetCall
        }),
        gameUuid:data.gameUuid,
        betIndex:data.betIndex,
        betArea:data.betArea,
    })
    let bytes = protoRoot.bet.BetCall.encode(proto).finish()
    console.log("sendBetCall",proto)
    sendWSPush(bytes);
}
//發送...


//各種接收訊息的方法，在main.js中全局註冊監聽
export const getReCall = (e:any) =>{
    let header = protoRoot.foundation.Message.decode(new Uint8Array(e.detail.msg.data)).header
    switch(header?.uri){
        case route.LoginRecall:
            let loginRecall = protoRoot.auth.LoginRecall.decode(new Uint8Array(e.detail.msg.data))
            console.log('LoginRecall',loginRecall)
            store.commit('auth/LoginRecall',loginRecall)
            break;
        case route.LobbyInfo:
            let lobbyInfo = protoRoot.lobby.LobbyInfo.decode(new Uint8Array(e.detail.msg.data))
            console.log('lobbyInfo',lobbyInfo)
            store.commit('lobby/LobbyInfo',lobbyInfo)
            break;
        case route.UserInfo:
            let UserInfo = protoRoot.auth.UserInfo.decode(new Uint8Array(e.detail.msg.data))
            console.log('UserInfo',UserInfo)
            store.commit('auth/UserInfo',UserInfo)
            break;
        case route.TableJoinRecall:
            let TableJoinRecall = protoRoot.table.TableJoinRecall.decode(new Uint8Array(e.detail.msg.data))
            console.log('TableJoinRecall',TableJoinRecall)
            store.commit('table/TableJoinRecall',TableJoinRecall)
            break;
        case route.BetRecall:
            let BetRecall = protoRoot.bet.BetRecall.decode(new Uint8Array(e.detail.msg.data))
            console.log('BetRecall',BetRecall)
            store.commit('bet/BetRecall',BetRecall)
    }
}