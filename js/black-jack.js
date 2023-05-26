/* 카드 덱 */
const card = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
const cardSet = [].concat(card).concat(card).concat(card).concat(card); // 1덱(52장)
const deck = []
  .concat(cardSet)
  .concat(cardSet)
  .concat(cardSet)
  .concat(cardSet)
  .concat(cardSet)
  .concat(cardSet)
  .concat(cardSet)
  .concat(cardSet);
const used = []; // 사용한 숫자 배열

/* 상수 변수 */
const BLACKJACK_NUMBER = 21;
const BURST_STRING = "Burst!";
const BLACKJACK_STRING = "Black Jack!";
const BLACKJACK_GAME_STORAGE = "Black-jack Games";
const BLACKJACK_WIN_STORAGE = "Black-jack Wins";
const BLACKJACK_LOSE_STORAGE = "Black-jack Loses";
const BLACKJACK_DRAW_STORAGE = "Black-jack Draws";

/* 배당률(odds) */
const ODDS_WIN = 1;
const ODDS_DRAW = 0;
const ODDS_LOSE = -1;

let isPlaying = false;
const count = document.querySelector("tr.black-jack__count");
const dealer = document.querySelector("tr.black-jack__dealer");
const player = document.querySelector("tr.black-jack__player");

const dealerCard = [];
const playerCard = [];
const dealerSum = document.querySelector(
  ".black-jack__sum-result tr:first-child th"
);
const playerSum = document.querySelector(
  ".black-jack__sum-result tr:last-child th"
);
const dealerDescription = document.querySelector(
  ".black-jack__description-result tr:first-child th"
);
const playerDescription = document.querySelector(
  ".black-jack__description-result tr:last-child th"
);

const playButton = document.querySelector("#black-jack-nav__play-button");
const hitButton = document.querySelector("#black-jack-nav__hit-button");
const stayButton = document.querySelector("#black-jack-nav__stay-button");
const resetButton = document.querySelector("#black-jack-nav__reset-button");
const resultText = document.querySelector(".black-jack-nav__result-text");

/* 게임 전적 (localStorage)*/
const gameRecord = document.querySelector(".black-jack-score");
const gameCount = document.querySelector(
  ".black-jack-score__score:first-of-type"
);
const winCount = document.querySelector(
  ".black-jack-score__score:nth-of-type(2)"
);
const drawCount = document.querySelector(
  ".black-jack-score__score:nth-of-type(3)"
);
const loseCount = document.querySelector(
  ".black-jack-score__score:nth-of-type(4)"
);
const winRatio = document.querySelector(
  ".black-jack-score__score:last-of-type"
);
const gameRecordResetBtn = document.querySelector(".black-jack-score__reset");

/* Money */
const myMoney = document.querySelector(".money__my-money");
const bettingMoney = document.querySelector("#money__betting-money");
const variableMoney = document.querySelector(".money__variable-amount");
const BLACKJACK_BETTING_MONEY = "Black-jack Betting-money";
const LOCAL_STORAGE_MONEY = "money";

/* ! 웹페이지 load 시 게임전적, 나의 금액 불러오기 */
showTotalGameRecord();
showMyMoney();
// 이전 배팅금액 가져오기
bettingMoney.value = localStorage.getItem(BLACKJACK_BETTING_MONEY);

/* 블랙잭 초기 설정 함수 */
async function initialBlackjack() {
  pickCard(player, playerCard);
  await delay();
  pickCard(dealer, dealerCard);
  await delay();
  pickCard(player, playerCard);
  playerSum.innerText = `${sumCard(playerCard)}`;
  dealerSum.innerText = `${sumCard(dealerCard)}`;
}

/* 카드 뽑는 함수 */
function pickCard(who, whoseCard) {
  let newCard;
  while (1) {
    newCard = Math.floor(Math.random() * deck.length);
    // 중복 제거
    if (used.indexOf(newCard) === -1) {
      used.push(newCard);
      break;
    } else {
      continue;
    }
  }
  // HTML에 생성
  who.appendChild(document.createElement("td")).innerText = deck[newCard];
  // 카드덱 생성
  whoseCard.push(deck[newCard]);
}

/* 카드의 합계를 나타내는 함수 */
function sumCard(whoseCard) {
  let sum = 0;
  let aCount = 0;
  // 합계 계산
  for (let i = 0; i < whoseCard.length; i++) {
    if (whoseCard[i] === "J" || whoseCard[i] === "Q" || whoseCard[i] === "K") {
      sum += 10;
    } else if (whoseCard[i] === "A") {
      aCount++;
      sum += 11;
    } else {
      sum += whoseCard[i];
    }
  }
  // Ace카드 논외
  if (aCount && sum > BLACKJACK_NUMBER) {
    while (1) {
      sum -= 10;
      aCount--;
      if (aCount === 0 || sum <= BLACKJACK_NUMBER) {
        break;
      }
    }
  }
  return sum;
}

/* Hit 함수 */
function hit() {
  pickCard(player, playerCard);
  playerSum.innerText = `${sumCard(playerCard)}`;
}

/* Stay 함수 */
async function stay() {
  while (1) {
    if (
      sumCard(dealerCard) < 17 &&
      sumCard(dealerCard) <= sumCard(playerCard)
    ) {
      pickCard(dealer, dealerCard);
      dealerSum.innerText = `${sumCard(dealerCard)}`;
      // 시간 딜레이
      if (
        sumCard(dealerCard) < 17 &&
        sumCard(dealerCard) <= sumCard(playerCard)
      ) {
        await delay();
      }
    } else {
      break;
    }
  }
}

/* Burst, BlackJack 판정 */
function isBurst(whoseDescription, whoseCard, whoseSum) {
  if (sumCard(whoseCard) > BLACKJACK_NUMBER) {
    whoseDescription.innerText = BURST_STRING;
    whoseDescription.style.color = "red";
    whoseSum.style.color = "red";
  } else if (sumCard(whoseCard) === BLACKJACK_NUMBER) {
    whoseDescription.innerText = BLACKJACK_STRING;
    whoseDescription.style.color = "blue";
    whoseSum.style.color = "blue";
  } else {
    return;
  }
  hitButton.setAttribute("disabled", "true");
  stayButton.setAttribute("disabled", "true");
}

/* 이겼을 때 */
function showWin() {
  isPlaying = false;
  // 결과창
  resultText.innerText = "You Win !";
  resultText.style.color = "blue";
  // 게임전적
  setGameRecord(BLACKJACK_GAME_STORAGE);
  setGameRecord(BLACKJACK_WIN_STORAGE);
  showTotalGameRecord();
  // 금액 계산
  calcMoney(ODDS_WIN);
  // console.log
  console.log("-- Win --");
}

/* 졌을 때 */
function showLose() {
  isPlaying = false;
  // 결과창
  resultText.innerText = "You Lose !";
  resultText.style.color = "red";
  // 개임전적
  setGameRecord(BLACKJACK_GAME_STORAGE);
  setGameRecord(BLACKJACK_LOSE_STORAGE);
  showTotalGameRecord();
  // 금액 계산
  calcMoney(ODDS_LOSE);
  // console.log
  console.log("-- Lose --");
}

/* 비겼을 때 */
function showDraw() {
  isPlaying = false;
  // 결과창
  resultText.innerText = "You Draw !";
  // 개임전적
  setGameRecord(BLACKJACK_GAME_STORAGE);
  setGameRecord(BLACKJACK_DRAW_STORAGE);
  showTotalGameRecord();
  // 금액 계산
  calcMoney(ODDS_DRAW);
  // console.log
  console.log("-- Draw --");
}

/* Player가 Black-Jack 일 때 */
function ifPlayerBlackjack() {
  if (sumCard(playerCard) === BLACKJACK_NUMBER) {
    showWin();
  }
}

/* Player가 Burst 일 때 */
function ifPlayerBurst() {
  if (sumCard(playerCard) > BLACKJACK_NUMBER) {
    showLose();
  }
}

/* 전적 저장 */
function setGameRecord(record) {
  // 최초 저장 시
  if (localStorage.getItem(record)) {
    const count = Number(localStorage.getItem(record));
    localStorage.setItem(record, count + 1);
  }
  // 최초 저장이 아닐 시
  else {
    localStorage.setItem(record, 1);
  }
}

/* 전적 보여주기 */
function showGameRecord(record, recordCount) {
  if (localStorage.getItem(record)) {
    recordCount.innerHTML = localStorage.getItem(record);
  } else {
    recordCount.innerText = "0";
  }
}

/* 유저에게 전체 전적을 보여주기 */
function showTotalGameRecord() {
  showGameRecord(BLACKJACK_GAME_STORAGE, gameCount);
  showGameRecord(BLACKJACK_WIN_STORAGE, winCount);
  showGameRecord(BLACKJACK_DRAW_STORAGE, drawCount);
  showGameRecord(BLACKJACK_LOSE_STORAGE, loseCount);
  // 승률 계산
  if (gameCount.innerText !== "0") {
    const ratio = (
      (Number(winCount.innerText) /
        (Number(gameCount.innerText) - Number(drawCount.innerText))) *
      100
    ).toFixed(2);
    winRatio.innerText = ratio;
  } else {
    winRatio.innerText = "0.00";
  }
}

/* 나의 금액 보여주기 */
function showMyMoney() {
  // 처음 접속 시 1천만 원 지급
  if (!localStorage.getItem(LOCAL_STORAGE_MONEY)) {
    localStorage.setItem(LOCAL_STORAGE_MONEY, 10000000);
  }
  myMoney.innerText = localStorage.getItem(LOCAL_STORAGE_MONEY);
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

/* 배당률에 따른 금액 계산 */
function calcMoney(odds) {
  const variableMoney = Math.floor(Number(bettingMoney.value) * odds);
  const money =
    Number(localStorage.getItem(LOCAL_STORAGE_MONEY)) + variableMoney;
  localStorage.setItem(LOCAL_STORAGE_MONEY, money);
  // output
  if (odds < 0) {
    console.log(`${variableMoney} x(${odds})`);
    variableMoney.innerText = `(${variableMoney} x(${odds}))`;
  } else {
    console.log(`+${variableMoney} x(${odds})`);
    variableMoney.innerText = `(+${variableMoney} x(${odds}))`;
  }
  showMyMoney();
}

/* 시간 딜레이 함수 */
function delay() {
  return new Promise((resolve) => setTimeout(resolve, 400));
}

/* 'Play'버튼 */
playButton.addEventListener("click", (event) => {
  event.preventDefault();
  checkBettingMoney();
  if (isPlaying) {
    // 셋팅
    playButton.setAttribute("disabled", "true");
    hitButton.removeAttribute("disabled");
    stayButton.removeAttribute("disabled");
    resetButton.removeAttribute("disabled");
    bettingMoney.setAttribute("disabled", "true");
    gameRecordResetBtn.setAttribute("disabled", "true");
    // 배팅금액 저장
    localStorage.setItem(BLACKJACK_BETTING_MONEY, bettingMoney.value);
    variableMoney.innerText = "";
    // 동작
    initialBlackjack();
    isBurst(playerDescription, playerCard, playerSum);
    isBurst(dealerDescription, dealerCard, dealerSum);
    ifPlayerBlackjack();
  }
});

/* 'Hit'버튼 */
hitButton.addEventListener("click", (event) => {
  event.preventDefault();
  // 게임 도중
  if (isPlaying) {
    stayButton.removeAttribute("disabled");
    hit();
    isBurst(playerDescription, playerCard, playerSum);
    ifPlayerBlackjack();
    ifPlayerBurst();
  } else {
    // 게임 중이 아닐 때
    alert("게임 중이 아닐 때에는 작동하지 않습니다.");
  }
});

/* 'Stay'버튼 */
stayButton.addEventListener("click", async (event) => {
  event.preventDefault();
  // 게임 도중
  if (isPlaying) {
    stayButton.setAttribute("disabled", "true");
    hitButton.setAttribute("disabled", "true");
    await stay();
    isBurst(dealerDescription, dealerCard, dealerSum);
    // 결과 보여주기 win/lose
    const playerSumNum = Number(playerSum.innerText);
    const dealerSumNum = Number(dealerSum.innerText);
    if (playerSumNum > dealerSumNum || dealerSumNum > BLACKJACK_NUMBER) {
      showWin();
    } else if (playerSumNum === dealerSumNum) {
      showDraw();
    } else if (
      dealerSumNum > playerSumNum ||
      dealerSumNum === BLACKJACK_NUMBER
    ) {
      showLose();
    }
  } else {
    // 게임 중이 아닐 때
    alert("게임 중이 아닐 때에는 작동하지 않습니다.");
  }
});

/* 게임이 끝나지 않았을 때 reset 버튼 누를 시 */
resetButton.addEventListener("click", () => {
  if (!resultText.innerText) {
    // 전적(전+패) 추가
    setGameRecord(BLACKJACK_GAME_STORAGE);
    setGameRecord(BLACKJACK_LOSE_STORAGE);
    // 배팅액 잃음
    calcMoney(ODDS_LOSE);
  }
});

/* 전적 초기화 버튼 */
gameRecordResetBtn.addEventListener("click", () => {
  const ok = confirm("정말 모든 전적을 초기화 하시겠습니까?");
  // 게임 중이 아닐 때에만 동작
  if (!isPlaying) {
    if (ok) {
      localStorage.removeItem(BLACKJACK_GAME_STORAGE);
      localStorage.removeItem(BLACKJACK_WIN_STORAGE);
      localStorage.removeItem(BLACKJACK_DRAW_STORAGE);
      localStorage.removeItem(BLACKJACK_LOSE_STORAGE);
      window.location.reload();
    } else {
      alert("전적 초기화를 취소하였습니다.");
    }
  } else {
    // 게임 도중에는 비활성화
    alert("게임 도중에는 전적 초기화를 할 수 없습니다.");
  }
});
