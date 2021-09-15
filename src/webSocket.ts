
import protoRoot from '@/proto/proto'
import protobuf, { Root } from "protobufjs";
import { useStore } from "vuex";  //為了把資料存到vuex的wsStore中

// const store = useStore();
const url = "ws://139.162.102.189:8199/ws";
//建立webSocket實例
let Socket:WebSocket | null
let setIntervalWesocketPush:number

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
  /** */
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
/**
 * 发送数据
 * @param {any} message 需要发送的数据
 */
 export const sendWSPush = (message:any) => {
    if (Socket !== null && Socket.readyState === 3) {
      Socket.close()
      createSocket()
      console.log("readyState:"+Socket.readyState,"傳送成功:"+JSON.stringify(message));
    } else if (Socket?.readyState === 1) { //已經連接，且可以通訊
      let bytes:any;
      protobuf.load(protoRoot,protoRoot,function(err,root){
        if(err)throw err;
        let Product = root?.lookupType("PBUser");
        bytes = Product?.encode(message).finish();
      })
      Socket.send(bytes)
      // Socket.send(JSON.stringi(message))
      // console.log("readyState:"+Socket.readyState,"傳送成功:"+message);
    } else if (Socket?.readyState === 0) { //正在連接中
      connecting(message)
      console.log("readyState:"+Socket.readyState,"傳送成功:"+JSON.stringify(message));
    }
  }

  export const onmessageWs=(msg:any)=>{
    if(msg){ 
      console.log("收到數據")
      let reader = new FileReader();
      reader.readAsText(msg.data,'utf-8')
      reader.onload =()=>{
        // store.commit('wsStore/setWsRes',reader.result)  //把資料灌到Vuex中
        console.log(reader.result)
        return reader.result
      }
      
      //解析protobuf
      // let Udata = new Uint8Array(msg);
      // protobuf.load(protoRoot,protoRoot,function(err,root){
      //   if(err) throw err;
      //   let message = root.lookupType("PBUser");
      //   msg= message.decode(Udata);
      // })
      // console.log(msg.data)
    // JSON.stringify(msg.data)
    // console.log("接收訊息",msg)
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
export const resPing = () => {
    Socket?.send("pingt")
  }

  //建立ws
export const createSocket =()=>{  //使用createSocket的方法，會自動開啟監聽連線、訊息等等方法
    Socket && Socket.close()
    if(!Socket){
        Socket = new WebSocket(url);
        Socket.onopen = onopenWs  //會打開心跳
        Socket.onmessage = onmessageWs
        Socket.onerror = onerrorWs
        Socket.onclose = oncloseWs
        console.log("建立websocket連線");
    }
}



