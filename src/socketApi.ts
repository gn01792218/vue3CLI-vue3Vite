
import {sendWSPush} from "./webSocket"
import protoRoot from '@/assets/js/bundle'
import store from './store' //在元件之外要使用store，不能用useStore
import router from "./router"
//proto型態
const foundation = protoRoot.foundation
const route = protoRoot.route.URI
const auth = protoRoot.auth
const lobby = protoRoot.lobby
const table = protoRoot.table
const bet = protoRoot.bet
const dealer = protoRoot.dealer
//各種send方法
//發送登入訊息
export const sendLogin =(data:any) => {
    let proto = auth.LoginCall.create({
        header:foundation.Header.create({
            uri:route.LoginCall
        }),
        account:data.account,
        password:data.password
    })
    let bytes = auth.LoginCall.encode(proto).finish()
    console.log("sendLogin",proto)
    sendWSPush(bytes);
}
//發送選桌訊息
export const sendTableJoinCall =(data:any) => {
    let proto = table.TableJoinCall.create({
        header:foundation.Header.create({
            uri:route.TableJoinCall
        }),
        uuid:data.uuid
    })
    let bytes = table.TableJoinCall.encode(proto).finish()
    console.log("sendTableJoinCall",proto)
    sendWSPush(bytes);
}
//發送下注資訊
export const sendBetCall = (data:any) => {
    let proto = bet.BetCall.create({
        header:foundation.Header.create({
            uri:route.BetCall
        }),
        gameUuid:data.gameUuid,
        betIndex:data.betIndex,
        betArea:data.betArea,
    })
    let bytes = bet.BetCall.encode(proto).finish()
    console.log("sendBetCall",proto)
    sendWSPush(bytes);
}
//發送下注重置
export const sendBetResetCall = (data:any) => {
    let proto = bet.BetResetCall.create({
        header:foundation.Header.create({
            uri:route.BetResetCall
        }),
        gameUuid:data.gameUuid,
    })
    let bytes = bet.BetResetCall.encode(proto).finish()
    console.log("sendBetResetCall",proto)
    sendWSPush(bytes);
}
//發送...


//各種接收訊息的方法，在main.js中全局註冊監聽
export const getReCall = (e:any) =>{
    let header = foundation.Message.decode(new Uint8Array(e.detail.msg.data)).header
    switch(header?.uri){
        case route.LoginRecall:
            let loginRecall = auth.LoginRecall.decode(new Uint8Array(e.detail.msg.data))
            console.log('LoginRecall',loginRecall)
            store.commit('auth/LoginRecall',loginRecall)
            break;
        case route.LobbyInfo:
            let lobbyInfo = lobby.LobbyInfo.decode(new Uint8Array(e.detail.msg.data))
            console.log('lobbyInfo',lobbyInfo)
            store.commit('lobby/LobbyInfo',lobbyInfo)
            break;
        case route.UserInfo:
            let UserInfo = auth.UserInfo.decode(new Uint8Array(e.detail.msg.data))
            console.log('UserInfo',UserInfo)
            store.commit('auth/UserInfo',UserInfo)
            break;
        case route.TableJoinRecall:
            let TableJoinRecall = table.TableJoinRecall.decode(new Uint8Array(e.detail.msg.data))
            console.log('TableJoinRecall',TableJoinRecall)
            store.commit('table/TableJoinRecall',TableJoinRecall)
            break;
        case route.BetRecall:
            let BetRecall = bet.BetRecall.decode(new Uint8Array(e.detail.msg.data))
            console.log('BetRecall',BetRecall)
            store.commit('bet/BetRecall',BetRecall)
            break;
        case route.BetResetRecall:
            let BetResetRecall = bet.BetResetRecall.decode(new Uint8Array(e.detail.msg.data))
            console.log('BetRecall',BetResetRecall)
            store.commit('bet/BetResetRecall',BetResetRecall)
            break;
        case route.Draw:
            let Draw = dealer.Draw.decode(new Uint8Array(e.detail.msg.data))
            console.log('Draw',Draw)
            store.commit('dealer/Draw',Draw)
            break;
    }
}