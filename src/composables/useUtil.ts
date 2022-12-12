export default function useUtil() {
    function numberFormat(number: number): string {
        return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      }
    //動態獲取靜態圖檔
    function getAssetsFileURL(url:string){
      return new URL(`../assets/${url}`,import.meta.url).href
  }
  return {
    numberFormat,
    getAssetsFileURL,
  };
}