/* 슬롯 머신 */
const slotMachineCells = document.querySelectorAll(".slot-machine td");

/* Buttons */
const playBtn = document.querySelector(".slot-machine-buttons__play");
const stopBtn = document.querySelector(".slot-machine-buttons__stop");

/* Money */
const myMoney = document.querySelector(".money__my-money");
const bettingMoney = document.querySelector("#money__betting-money");
const variableMoney = document.querySelector(".money__variable-amount");
const bonusMoney = document.querySelector(".money__bonus-amount");
const LOCAL_STORAGE_MONEY = "money";
const INITIAL_MONEY = 10000000;
const BONUS_MONEY = 5000000;

let isPlaying = false; // play 여부
let runSlotMachine; // 슬롯머신 돌리기
let isBonus = false; // Bonus 여부

/* 배당률(odds) */
const ODDS_1ST = 50;
const ODDS_2ND = 10;
const ODDS_3RD = 5;
const ODDS_4TH = 0;
const ODDS_5TH = -0.5;
const ODDS_NO = -1;

/* 페이지 로드 시 초기 셋팅 */
let money = Number(myMoney.innerText); // 나의 금액
showMyMoney();

function showSlotMachine() {
  slotMachineCells.forEach((cell) => {
    const randomNumber = Math.floor(Math.random() * 10);
    cell.innerText = randomNumber;
  });
}

function startSlotMachine() {
  runSlotMachine = setInterval(() => showSlotMachine(), 50);
}

function stopSlotMachine() {
  clearInterval(runSlotMachine);
}

/* 슬롯머신 결과 계산 */
function resultSlotMachine() {
  const result = [
    Number(slotMachineCells[3].innerText),
    Number(slotMachineCells[4].innerText),
    Number(slotMachineCells[5].innerText),
  ];
  const [slot1, slot2, slot3] = result;
  // '7'의 갯수
  let countSeven = 0;
  result.forEach((slot) => {
    if (slot === 7) {
      countSeven++;
    }
  });
  /* 등수 계산*/
  let rank;
  // Bonus 계산 (9칸 중 7이 5개 이상 / 약 0.823%)
  let countBonusSeven = 0;
  slotMachineCells.forEach((cell) => {
    if (Number(cell.innerText) === 7) {
      countBonusSeven++;
    }
  });
  if (countBonusSeven >= 5) {
    isBonus = true;
  }
  // 1등 (777 / 0.1%)
  if (countSeven === 3) {
    rank = 1;
    calcMoney(rank, ODDS_1ST);
  }
  // 2등 (777을 제외한 같은 숫자 3개 / 0.9%)
  else if (slot1 === slot2 && slot2 === slot3 && countSeven === 0) {
    rank = 2;
    calcMoney(rank, ODDS_2ND);
  }
  // 3등 (7이 2개 / 2.7%)
  else if (countSeven === 2) {
    rank = 3;
    calcMoney(rank, ODDS_3RD);
  }
  // 4등 (같은 숫자가 2개(77 제외) / 24.3% / 본전)
  else if (
    (slot1 === slot2 || slot2 === slot3 || slot3 === slot1) &&
    countSeven < 2
  ) {
    rank = 4;
    calcMoney(rank, ODDS_4TH);
  }
  // 5등 (5등 : 7-1개/ 24.3% / 반타작)
  else if (countSeven === 1) {
    rank = 5;
    calcMoney(rank, ODDS_5TH);
  }
  // 탈락
  else {
    rank = "꼴";
    calcMoney(rank, ODDS_NO);
  }
}

/* 배팅 금액 체크 */
function checkBettingMoney() {
  // 잘못 입력 시
  if (
    isNaN(bettingMoney.value) ||
    bettingMoney.value === "" ||
    bettingMoney.value <= 0
  ) {
    alert("1원 이상을 배팅하세요.");
  }
  // 배팅 금액 > 나의 금액 일 시
  else if (
    bettingMoney.value > Number(localStorage.getItem(LOCAL_STORAGE_MONEY))
  ) {
    alert("나의 금액 보다 배팅 금액이 더 많습니다.");
  }
  // 정상 작동
  else {
    isPlaying = true;
  }
}

/* 나의 금액 보여주기 */
function showMyMoney() {
  // 처음 접속 시 1천만 원 지급
  if (!localStorage.getItem(LOCAL_STORAGE_MONEY)) {
    localStorage.setItem(LOCAL_STORAGE_MONEY, INITIAL_MONEY);
  }
  myMoney.innerText = localStorage.getItem(LOCAL_STORAGE_MONEY);
}

/* 배당률에 따른 금액 계산 */
function calcMoney(rank, odds) {
  const variableAmount = Math.floor(Number(bettingMoney.value) * odds);
  money = Number(localStorage.getItem(LOCAL_STORAGE_MONEY)) + variableAmount;
  localStorage.setItem(LOCAL_STORAGE_MONEY, money);
  // console.log
  if (odds < 0) {
    variableMoney.innerText = `(${rank}등 : ${variableAmount} x(${odds}))`;
  } else {
    variableMoney.innerText = `(${rank}등 : +${variableAmount} x(${odds}))`;
  }
  // Bonus
  if (isBonus) {
    money = money + BONUS_MONEY;
    localStorage.setItem(LOCAL_STORAGE_MONEY, money);
    // console.log
    bonusMoney.innerText = `BONUS : ${BONUS_MONEY} 원을 얻었습니다.`;
  }
  showMyMoney();
}

/* Play 버튼 */
playBtn.addEventListener("click", (event) => {
  event.preventDefault();
  checkBettingMoney();
  if (isPlaying) {
    // 셋팅
    playBtn.setAttribute("disabled", true);
    stopBtn.removeAttribute("disabled");
    bettingMoney.setAttribute("disabled", true);
    variableMoney.innerText = "";
    // 동작
    startSlotMachine();
  }
});

/* Stop 버튼 */
stopBtn.addEventListener("click", (event) => {
  event.preventDefault();
  // 셋팅
  stopBtn.setAttribute("disabled", true);
  playBtn.removeAttribute("disabled");
  bettingMoney.removeAttribute("disabled");
  // 동작
  isPlaying = false;
  stopSlotMachine();
  resultSlotMachine();
});
