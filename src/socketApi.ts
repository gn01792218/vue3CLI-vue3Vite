
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
const game = protoRoot.game
const roadmap = protoRoot.roadmap
//各種send方法
//發送心跳
const sendPon = ()=>{
    let proto = foundation.HeartbeatPong.create({
        header:foundation.Header.create({
            uri:route.HeartbeatPong
        })
    })
    let bytes = foundation.HeartbeatPong.encode(proto).finish()
    // console.log("sendPon",proto)
    sendWSPush(bytes)
}
//發送登入訊息
export const sendLogin =(data:any) => {
    let proto = auth.LoginCall.create({
        header:foundation.Header.create({
            uri:route.LoginCall
        }),
        token:data.token,
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
    // console.log("sendTableJoinCall",proto)
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
    // console.log("sendBetResetCall",proto)
    sendWSPush(bytes);
}


//各種接收訊息的方法，在main.js中全局註冊監聽
export const getMsgReCall = (e:any) =>{
    let header = foundation.Message.decode(new Uint8Array(e.detail.msg.data)).header
    switch(header?.uri){
        case route.HeartbeatPing:
            // console.log("接收ping")
            sendPon()
            break
        case route.LoginRecall:
            let loginRecall = auth.LoginRecall.decode(new Uint8Array(e.detail.msg.data))
            console.log('LoginRecall',loginRecall)
            store.commit('auth/LoginRecall',loginRecall)
            break
        case route.LobbyInfo:
            let lobbyInfo = lobby.LobbyInfo.decode(new Uint8Array(e.detail.msg.data))
            console.log('lobbyInfo',lobbyInfo)
            store.commit('lobby/LobbyInfo',lobbyInfo)
            break
        case route.UserInfo:
            let UserInfo = auth.UserInfo.decode(new Uint8Array(e.detail.msg.data))
            console.log('UserInfo',UserInfo)
            store.commit('auth/UserInfo',UserInfo)
            break
        case route.TableJoinRecall:
            let TableJoinRecall = table.TableJoinRecall.decode(new Uint8Array(e.detail.msg.data))
            console.log('TableJoinRecall',TableJoinRecall)
            store.commit('table/TableJoinRecall',TableJoinRecall)
            break
        case route.BetRecall:
            let BetRecall = bet.BetRecall.decode(new Uint8Array(e.detail.msg.data))
            console.log('BetRecall',BetRecall)
            store.commit('bet/BetRecall',BetRecall)
            break
        case route.BetResetRecall:
            let BetResetRecall = bet.BetResetRecall.decode(new Uint8Array(e.detail.msg.data)).toJSON()
            console.log(BetResetRecall)
            // console.log('BetReSetRecall',BetResetRecall)
            store.commit('bet/BetResetRecall',BetResetRecall)
            break
        case route.BetError:
            let BetError = bet.BetError.decode(new Uint8Array(e.detail.msg.data))
            console.log('BetError',BetError)
            store.commit('bet/BetError',BetError)
            break
        case route.Draw:
            let Draw = dealer.Draw.decode(new Uint8Array(e.detail.msg.data))
            console.log('Draw',Draw)
            store.commit('dealer/Draw',Draw)
            break
        case route.BroadcastGameResult:
            let BroadcastGameResult = dealer.GameResult.decode(new Uint8Array(e.detail.msg.data))
            console.log('BroadcastGameResult',BroadcastGameResult)
            store.commit('dealer/BroadcastGameResult',BroadcastGameResult)
            break
        case route.BetRoundStart:
            let BetRoundStart = game.BetRoundStart.decode(new Uint8Array(e.detail.msg.data))
            console.log('BetRoundStart',BetRoundStart)
            store.commit('game/BetRoundStart',BetRoundStart)
            break
        case route.BetRoundEnd:
            let BetRoundEnd = game.BetRoundEnd.decode(new Uint8Array(e.detail.msg.data))
            // console.log('BetRoundEnd',BetRoundEnd)
            store.commit('game/BetRoundEnd',BetRoundEnd)
            break
        case route.GameStatus:
            let GameStatus = game.GameStatus.decode(new Uint8Array(e.detail.msg.data))
            console.log('GameStatus',GameStatus)
            store.commit('game/GameStatus',GameStatus)
            break
        case route.BetRoundCountdown:
            let BetRoundCountdown = game.BetRoundCountdown.decode(new Uint8Array(e.detail.msg.data))
            // console.log('BetRoundCountdown',BetRoundCountdown)
            store.commit('game/BetRoundCountdown',BetRoundCountdown)
            break
        case route.Roadmap:
            let map = roadmap.Roadmap.decode(new Uint8Array(e.detail.msg.data))
            console.log('map',map)
            store.commit('roadmap/map',map)
            break
        case route.BroadcastDealerRoundEnd:
            let end = dealer.BroadcastDealerRoundEnd.decode(new Uint8Array(e.detail.msg.data))
            console.log('換靴',end)
            store.commit('dealer/end',end)
    }
}