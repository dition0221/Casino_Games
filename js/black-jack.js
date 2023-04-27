const card = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
const deck = [].concat(card).concat(card).concat(card).concat(card);  // 1덱(52장)
const used = []; // 사용한 숫자 배열
const BLACKJACK = 21;

/* 블랙잭 초기 설정 */
function initialBlackjack() {
    const count = document.querySelector("tr.black-jack__count");
    const dealer = document.querySelector("tr.black-jack__dealer");
    const player = document.querySelector("tr.black-jack__player");
    const dealerCard = [];
    const playerCard = [];

    const p1 = Math.floor(Math.random() * deck.length);
    overlapCheck(p1, player, playerCard);
    
    const d1 = Math.floor(Math.random() * deck.length);
    overlapCheck(d1, dealer, dealerCard);
    
    const p2 = Math.floor(Math.random() * deck.length);
    overlapCheck(p2, player, playerCard);

    const dealerSum = document.querySelector(".black-jack__sum-result tr:first-child th");
    const playerSum = document.querySelector(".black-jack__sum-result tr:last-child th");
    playerSum.innerText = `${sumCard(playerCard)}`;
    dealerSum.innerText = `${sumCard(dealerCard)}`;
}

/* 카드 중복 체크 */
function overlapCheck(card, who, whoseCard) {
    while (1) {
        if (used.indexOf(card) === -1) {
            used.push(card);
            break;
        } else {
            continue;
        }
    }
    // HTML에 생성
    who.appendChild(document.createElement("td")).innerText = deck[card];
    // 카드덱 생성
    whoseCard.push(deck[card]);
}

/* 카드의 합계를 나타내는 함수 */
function sumCard(whoseCard) {
    let sum = 0;
    let aCount = 0;
    // 합계 계산
    for (let i = 0; i < whoseCard.length; i++) {
        if ((whoseCard[i] === "J") || (whoseCard[i] === "Q") || (whoseCard[i] === "K")) {
            whoseCard[i] = 10;
        }
        if (whoseCard[i] === "A") {
            whoseCard[i] = 11;
            aCount++;
        }
        sum += whoseCard[i];
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

// ======================================================================

const playButton = document.querySelector("#black-jack__play-button");
const hitButton = document.querySelector("#black-jack__hit-button");
const resetButton = document.querySelector("#black-jack__reset-button");

playButton.addEventListener("click", (event) => {
    event.preventDefault();
    initialBlackjack();
    playButton.setAttribute("disabled", "true");
    hitButton.removeAttribute("disabled");
    resetButton.removeAttribute("disabled");
});

hitButton.addEventListener("click", (event) => {
    event.preventDefault();
});