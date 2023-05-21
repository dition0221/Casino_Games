const audio = new Audio("../audio/로스트아크_쿠크세이튼_마리오_BGM.mp3");
audio.loop = true;

const LOCAL_STORAGE_AUDIO = "audio-current-time";

window.addEventListener("load", () => {
  // 첫 방문 시 0초부터 BGM 시작
  if (localStorage.getItem(LOCAL_STORAGE_AUDIO)) {
    audio.currentTime = localStorage.getItem(LOCAL_STORAGE_AUDIO);
  }
  audio.play();
});

window.addEventListener("unload", () => {
  localStorage.setItem(LOCAL_STORAGE_AUDIO, audio.currentTime);
});
