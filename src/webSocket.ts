
import protoRoot from '@/assets/js/proto'
import protobuf from "protobufjs";
import store from './store' //在元件之外要使用store，不能用useStore
const url = "ws://139.162.102.189:8199/ws";  //後端網址
const protoHeader = protoRoot.lookupType('foundation.Header') //Header的lookup
//建立webSocket實例
let Socket:WebSocket | null
let setIntervalWesocketPush:number
//websocket方法區
//連接上後會發送心跳
const onopenWs = ()=>{
    //正式啟動時記得sendPing
    // sendPing()
    console.log("連線建立成功")
}
//連接失敗會重新連線
const onerrorWs = ()=>{
    Socket?.close()
    clearInterval(setIntervalWesocketPush)
    if(Socket?.readyState !== 3){ //stateCode 3 為連接已關閉，或沒有連接成功
        Socket = null
        createSocket()
        console.log("重連成功")
    }
}
//監聽關閉
const oncloseWs = () => {
    clearInterval(setIntervalWesocketPush)
    console.log('websocket已断开....正在尝试重连')
    if (Socket?.readyState !== 2) {  //readyState 2 = 連接正在關閉
      Socket = null
      createSocket()
    }
  }

/**
 * 发送数据但连接未建立时进行处理等待重发
 * @param {any} message 需要发送的数据
 */
 const connecting = (message:any) => {
    setTimeout(() => {
      if (Socket?.readyState === 0) { //readyState 0 表示正在連接中，那就繼續connecting
        connecting(message)
      } else {
        Socket?.send(JSON.stringify(message))
      }
    }, 1000)
  }
//暴露的方法區
/**
 * 发送数据
 * @param {any} message 需要发送的数据
 */
 export const sendWSPush = (message:any,lookupType:string) => { //第二個參數，依據不同的lookupType包裝proto
    if (Socket !== null && Socket.readyState === 3) {
      Socket.close()
      createSocket()
    } else if (Socket?.readyState === 1) { //已經連接，且可以通訊
      let bytes:any;
      //做假資料時，每個假資料都會有Header
      protobuf.load(protoRoot,protoRoot,(err,root)=>{
        if(err)throw err;
        let Product = root?.lookupType(lookupType);
        bytes =Product?.encode(message).finish();
        console.log(message)
      })
      Socket.send(bytes)
      // console.log("傳送成功",bytes)
    } else if (Socket?.readyState === 0) { //正在連接中
      connecting(message)
      console.log("readyState:"+Socket.readyState,"準備傳送:"+JSON.stringify(message));
    }
  }

  export const onmessageWs=(msg:any)=>{
    if(msg){ 
      // console.log("收到數據", msg.data)
      protobuf.load(protoRoot)
      .then((root)=>{
        let header= protoHeader.decode(new Uint8Array(msg.data)); //要先轉成Unit8再用Header解析meg
        console.log(header)
        console.log(header.uri) //lookup什麼得到的就是什麼
        //之後要用這個
        // msg = protoRoot.lookupType(header.uri).decode(new Uint8Array(msg.data))
        // const splitUrl = header.uri.split('.');  //切割Header字串，找到對應的VuexStor和對應set資料方法
        // store.commit(`${splitUrl[0]}/set${splitUrl[1]}`,msg)  //把資料灌到Vuex中
        
        //server傳來的資料型態改好之前先使用這個
        switch(header.uri){
          case '\n\vLoginRecall':
            msg=protoRoot.lookupType('auth.LoginRecall').decode(new Uint8Array(msg.data))
            console.log(msg)
            store.commit("wsStore/setWsRes",msg)  //把資料灌到Vuex中
            break;
          case '':
            break;
        }
      }).catch(err=>{
        if(err) throw err
      })
    }
}
  /**发送心跳
 * @param {number} time 心跳间隔毫秒 默认5000
 * @param {string} ping 心跳名称 默认字符串ping
 */
export const sendPing = (time = 5500, ping = 'ping') => {
    clearInterval(setIntervalWesocketPush)
    Socket?.send(ping)
    setIntervalWesocketPush = setInterval(() => {
      Socket?.send(ping)
    }, time)
  }
  //建立ws
export const createSocket =()=>{  //使用createSocket的方法，會自動開啟監聽連線、訊息等等方法
    Socket && Socket.close()
    if(!Socket){
        Socket = new WebSocket(url);
        Socket.binaryType='arraybuffer' //切記將binaryType設成二進制
        Socket.onopen = onopenWs  //會打開心跳
        Socket.onmessage = onmessageWs    
        Socket.onerror = onerrorWs
        Socket.onclose = oncloseWs
        console.log("建立websocket連線");
    }
}



