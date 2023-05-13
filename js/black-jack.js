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

const BLACKJACK_NUMBER = 21;
const BURST_STRING = "Burst!";
const BLACKJACK_STRING = "Black Jack!";
const BLACKJACK_GAME_STORAGE = "Black-jack Games";
const BLACKJACK_WIN_STORAGE = "Black-jack Wins";
const BLACKJACK_LOSE_STORAGE = "Black-jack Loses";
const BLACKJACK_DRAW_STORAGE = "Black-jack Draws";

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

// 웹페이지 load 시 게임전적 불러오기
showTotalGameRecord();

/* 블랙잭 초기 설정 */
function initialBlackjack() {
  pickCard(player, playerCard);
  pickCard(dealer, dealerCard);
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
function stay() {
  while (1) {
    if (
      sumCard(dealerCard) < 17 &&
      sumCard(dealerCard) <= sumCard(playerCard)
    ) {
      pickCard(dealer, dealerCard);
      dealerSum.innerText = `${sumCard(dealerCard)}`;
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

function showWin() {
  resultText.innerText = "You Win !";
  resultText.style.color = "blue";
  setGameRecord(BLACKJACK_GAME_STORAGE);
  setGameRecord(BLACKJACK_WIN_STORAGE);
  showTotalGameRecord();
  console.log("-- Win --");
}

function showLose() {
  resultText.innerText = "You Lose !";
  resultText.style.color = "red";
  setGameRecord(BLACKJACK_GAME_STORAGE);
  setGameRecord(BLACKJACK_LOSE_STORAGE);
  showTotalGameRecord();
  console.log("-- Lose --");
}

function showDraw() {
  resultText.innerText = "You Draw !";
  setGameRecord(BLACKJACK_GAME_STORAGE);
  setGameRecord(BLACKJACK_DRAW_STORAGE);
  showTotalGameRecord();
  console.log("-- Draw --");
}

function ifPlayerBlackjack() {
  if (sumCard(playerCard) === BLACKJACK_NUMBER) {
    showWin();
  }
}

function ifPlayerBurst() {
  if (sumCard(playerCard) > BLACKJACK_NUMBER) {
    showLose();
  }
}

function setGameRecord(record) {
  if (localStorage.getItem(record)) {
    const count = Number(localStorage.getItem(record));
    localStorage.setItem(record, count + 1);
  } else {
    localStorage.setItem(record, 1);
  }
}

function showGameRecord(record, recordCount) {
  if (localStorage.getItem(record)) {
    recordCount.innerHTML = localStorage.getItem(record);
  } else {
    recordCount.innerText = "0";
  }
}

function showTotalGameRecord() {
  showGameRecord(BLACKJACK_GAME_STORAGE, gameCount);
  showGameRecord(BLACKJACK_WIN_STORAGE, winCount);
  showGameRecord(BLACKJACK_DRAW_STORAGE, drawCount);
  showGameRecord(BLACKJACK_LOSE_STORAGE, loseCount);
  if (gameCount.innerText !== "0") {
    const ratio = (
      (Number(winCount.innerText) / Number(gameCount.innerText)) *
      100
    ).toFixed(2);
    winRatio.innerText = ratio;
  } else {
    winRatio.innerText = "0.00";
  }
}

// function sleep(ms) {
//     const wakeUpTime = Date.now() + ms;
//     while(Date.now() < wakeUpTime) {}
// }

/* 'Play'버튼 */
playButton.addEventListener("click", (event) => {
  event.preventDefault();
  playButton.setAttribute("disabled", "true");
  hitButton.removeAttribute("disabled");
  stayButton.removeAttribute("disabled");
  resetButton.removeAttribute("disabled");
  initialBlackjack();
  isBurst(playerDescription, playerCard, playerSum);
  isBurst(dealerDescription, dealerCard, dealerSum);
  ifPlayerBlackjack();
});

/* 'Hit'버튼 */
hitButton.addEventListener("click", (event) => {
  event.preventDefault();
  stayButton.removeAttribute("disabled");
  hit();
  isBurst(playerDescription, playerCard, playerSum);
  ifPlayerBlackjack();
  ifPlayerBurst();
});

/* 'Stay'버튼 */
stayButton.addEventListener("click", (event) => {
  event.preventDefault();
  stayButton.setAttribute("disabled", "true");
  hitButton.setAttribute("disabled", "true");
  stay();
  isBurst(dealerDescription, dealerCard, dealerSum);
  /* 결과 보여주기 win/lose */
  const playerSumNum = Number(playerSum.innerText);
  const dealerSumNum = Number(dealerSum.innerText);
  if (playerSumNum > dealerSumNum || dealerSumNum > BLACKJACK_NUMBER) {
    showWin();
  } else if (playerSumNum === dealerSumNum) {
    showDraw();
  } else if (dealerSumNum > playerSumNum || dealerSumNum === BLACKJACK_NUMBER) {
    showLose();
  }
});

resetButton.addEventListener("click", () => {
  if (!resultText.innerText) {
    setGameRecord(BLACKJACK_GAME_STORAGE);
    setGameRecord(BLACKJACK_LOSE_STORAGE);
  }
});

gameRecordResetBtn.addEventListener("click", () => {
  const ok = confirm("정말 모든 전적을 초기화 하시겠습니까?");
  if (ok) {
    localStorage.removeItem(BLACKJACK_GAME_STORAGE);
    localStorage.removeItem(BLACKJACK_WIN_STORAGE);
    localStorage.removeItem(BLACKJACK_DRAW_STORAGE);
    localStorage.removeItem(BLACKJACK_LOSE_STORAGE);
  }
  window.location.reload();
});
