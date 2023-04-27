const card = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
const deck = [].concat(card).concat(card).concat(card).concat(card);  // 1덱(52장)
const used = []; // 사용한 숫자 배열
const BLACKJACK = 21;

const count = document.querySelector("tr.black-jack__count");
const dealer = document.querySelector("tr.black-jack__dealer");
const player = document.querySelector("tr.black-jack__player");

const dealerCard = [];
const playerCard = [];
const dealerSum = document.querySelector(".black-jack__sum-result tr:first-child th");
const playerSum = document.querySelector(".black-jack__sum-result tr:last-child th");

// ======================================================================

const playButton = document.querySelector("#black-jack__play-button");
const hitButton = document.querySelector("#black-jack__hit-button");
const stayButton = document.querySelector("#black-jack__stay-button");
const resetButton = document.querySelector("#black-jack__reset-button");

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
        if ((whoseCard[i] === "J") || (whoseCard[i] === "Q") || (whoseCard[i] === "K")) {
            sum += 10;
        } else if (whoseCard[i] === "A") {
            aCount++;
            sum += 11;
        } else {
            sum += whoseCard[i];
        }

    }
    // Ace카드 논외
    if (aCount && (sum > BLACKJACK)) {
        while(1) {
            sum -= 10;
            aCount--;
            if ((aCount === 0) || (sum <= BLACKJACK)) {
                break;
            }
        }
    }
    return sum;
};

/* Hit 버튼 클릭 시 */
function hit() {
    pickCard(player, playerCard);
    playerSum.innerText = `${sumCard(playerCard)}`;
}

/* Stay 버튼 클릭 시 */
function stay() {
    if (sumCard(dealerCard) < 17) {
        pickCard(dealer, dealerCard);
        dealerSum.innerText = `${sumCard(dealerCard)}`;
    }
}

/* Burst, BlackJack 판정 */
function isBurst(whoseSum, whoseCard) {
    if (sumCard(whoseCard) > 21) {
        whoseSum.innerText = `Burst!`;
        hitButton.setAttribute("disabled", "true");
        stayButton.setAttribute("disabled", "true");
    } else if (sumCard(whoseCard) == 21) {
        whoseSum.innerText = `Black Jack!`;
        hitButton.setAttribute("disabled", "true");
        stayButton.setAttribute("disabled", "true");
    }
}

/* 'Play'버튼 클릭 시 */
playButton.addEventListener("click", (event) => {
    event.preventDefault();
    initialBlackjack();
    playButton.setAttribute("disabled", "true");
    hitButton.removeAttribute("disabled");
    stayButton.removeAttribute("disabled");
    resetButton.removeAttribute("disabled");
    isBurst(playerSum, playerCard);
    isBurst(dealerSum, dealerCard);
});

/* 'Hit'버튼 클릭 시 */
hitButton.addEventListener("click", (event) => {
    event.preventDefault();
    hit();
    stayButton.removeAttribute("disabled");
    isBurst(playerSum, playerCard);
});

/* 'Stay'버튼 클릭 시 */
stayButton.addEventListener("click", (event) => {
    event.preventDefault();
    stay();
    stayButton.setAttribute("disabled", "true");
    isBurst(dealerSum, dealerCard);
});