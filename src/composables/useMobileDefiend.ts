import { ref } from "vue";
export default function useMobileDefiend() {
  const mobileDevice = ref([
    //各種手機的系統
    "Android",
    "webOS",
    "iPhone",
    "iPad",
    "iPod",
    "BlackBerry",
    "Windows Phone",
  ]);
  function isMobile() {
    //判斷是否是手機
    return mobileDevice.value.some((e: any) => navigator.userAgent.match(e)); //只要match手機裝置列表的其中一個，就返回true。否則false
  }
  const isMobileOrNot = isMobile();
  return {
    isMobileOrNot,
  };
}
