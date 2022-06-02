import { computed, Ref } from "vue";

export default function useGameSound(store: any) {
  const audio = computed<HTMLAudioElement>(() => {
    //音效的實體
    return document.querySelector("#gameresultSound") as HTMLAudioElement;
  });
  function mutedGameSound(){
    if (audio.value) {
        audio.value.muted = !audio.value.muted;
      }
  }
  return {
      //data
      
      //methods
      mutedGameSound,
  };
}
