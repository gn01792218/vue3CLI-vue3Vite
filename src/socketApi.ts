import{sendWSPush} from "./webSocket"
import protoRoot from '@/assets/js/proto'
import store from './store' //在元件之外要使用store，不能用useStore

//proto型態
export const protoHeader = protoRoot.lookupType('foundation.Header')
export const routes = protoRoot.lookupEnum('route.URI')
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
    sendWSPush(proto,"auth.LoginCall");
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
    sendWSPush(proto,"table.TableJoinCall");
}

//發送...

//各種接收訊息的方法，可以在main.js中全局註冊監聽
export const getReCall = (e:any) =>{
    switch(e.detail.header.uri){
        case routes.values.LoginRecall:
            let reCall = protoRoot.lookupType('auth.LoginRecall').decode(new Uint8Array(e.detail.msg.data))
            console.log('server傳遞',reCall)
            store.commit("auth/setLoginRecall",reCall)  //把資料灌到Vuex中
            break;
        case routes.values.LobbyInfo:
            let lobyInfo = protoRoot.lookupType('lobby.LobbyInfo').decode(new Uint8Array(e.detail.msg.data))
            console.log('server傳遞',lobyInfo)
            store.commit("lobby/setLobbyInfo",lobyInfo)  //把資料灌到Vuex中
            break;
        case routes.values.UserInfo:
            let userInfo = protoRoot.lookupType('auth.UserInfo').decode(new Uint8Array(e.detail.msg.data))
            console.log('server傳遞',userInfo)
            store.commit("auth/setUserInfo",userInfo)  //把資料灌到Vuex中
            break;
        case routes.values.TableJoinRecall:
            //先解析出是哪一桌
            let table = protoRoot.lookupType('table.TableJoinRecall').decode(new Uint8Array(e.detail.msg.data))
            store.commit("table/setTableJoinRecall",table) //取得桌號
            //再得到該桌的資訊
            let streamingUrl = protoRoot.lookupType('table.Table').decode(new Uint8Array(e.detail.msg.data))
            let tableInfor = protoRoot.lookupType('table.BetStatus').decode(new Uint8Array(e.detail.msg.data))
            console.log("server傳遞",table,streamingUrl,tableInfor)
            store.commit("table/setBetStatus",streamingUrl)
            store.commit("table/setBetStatus",tableInfor)
            break;
        
    }
    
}