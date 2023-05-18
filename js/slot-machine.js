/* 슬롯 머신 */
const slotMachineCells = document.querySelectorAll(".slot-machine td");

/* Buttons */
const playBtn = document.querySelector(".buttons__play");
const stopBtn = document.querySelector(".buttons__stop");
const resetBtn = document.querySelector(".buttons__reset");

/* play여부 */
// let isPlaying = false;
let runSlotMachine;

function showSlotMachine() {
  slotMachineCells.forEach((cell) => {
    const randomNumber = Math.floor(Math.random() * 10);
    cell.innerText = randomNumber;
  });
}

function startSlotMachine() {
  runSlotMachine = setInterval(() => showSlotMachine(), 100);
}

function stopSlotMachine() {
  clearInterval(runSlotMachine);
}

playBtn.addEventListener("click", (event) => {
  event.preventDefault();
  playBtn.setAttribute("disabled", true);
  stopBtn.removeAttribute("disabled");
  resetBtn.removeAttribute("disabled");
  // isPlaying = true;
  startSlotMachine();
});

stopBtn.addEventListener("click", (event) => {
  event.preventDefault();
  // isPlaying = false;
  stopSlotMachine();
});
