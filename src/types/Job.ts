//定義一個Job物件
interface Job{
    title:string,
    location:string,
    salary:number,
    id:string
}

export default Job

//使用方式
//1.先在要使用的元件中import Job from './types/Job'
//2.在setup中使用
// const jobs = ref<Job[]>([
//     {title:'AA',location:"BBB",salary:3000,id:"1"},
//     {title:'AA',location:"BBB",salary:3000,id:"1"},
//     {title:'AA',location:"BBB",salary:3000,id:"1"},
// ])
// return {jobs}
//3.將資料props到子組件的template上
//子組件要import如下，並且props設置如下，用v-for時才不會錯
// import { defineComponent,PropType } from 'vue'
// import Job from '略'

// export default defineComponent({
//     props:{
//         jobs:{
//             required:true,
//             type:Array as PropType<Job[]>
//         }
//     }
// })