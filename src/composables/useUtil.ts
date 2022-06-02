export default function useUtil() {
    function numberFormat(number: number): string {
        return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      }
  return {
    numberFormat,
  };
}