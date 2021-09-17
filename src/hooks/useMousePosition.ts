//可以供使用的滑鼠點擊取得座標的函數
import { onBeforeMount,onMounted,ref } from "@vue/runtime-core"
export default function (){
    const x = ref(0)
    const y = ref(0)
    const clickHandler = (e:MouseEvent)=>{
      x.value = e.pageX
      y.value = e.pageY
    }
    //頁面加載完了再進行點擊操作
    onMounted(()=>{
      window.addEventListener('click',clickHandler)
    })
    //頁面卸載前要移除監聽
    onBeforeMount(()=>{
      window.removeEventListener('click',clickHandler)
    })
    return {
        x,y
    }
}