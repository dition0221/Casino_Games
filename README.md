# JS를 사용하여, Casino 게임들을 만들어봅니다.

<a href="https://github.com/dition0221" target="_blank">@dition0221</a>, <a href="https://github.com/LeeMinGwi" target="_blank">@LeeMinGwi</a>

---

- **23-04-26**
  - Update
    - 블랙잭 초기설정
    - 블랙잭 시작버튼 (딜러 1장, 플레이어 2장 드로우)
    - 합계 생성 (J,Q,K = 10, Ace = 1 or 11)
- **23-04-27**
  - Update
    - js파일 주석 업데이트
    - 'hit' 버튼 기능 업데이트
    - 'stay' 버튼 추가
    - CSS 외관 업데이트
    - burst 기능 추가
  - Fix
    - 카드 드로우 및 중복제거 함수(pickCard) while 반복문, 변수명 수정
    - 카드 합계를 나타내는 함수(sumCard) 수정
    - 'play' 버튼 기능 수정
- **23-04-28**
  - Update
    - 'Stay' 버튼 : 딜러가 1장만 드로우 -> 카드 합이 17초과 될 때 까지 드로우
  - Fix
    - 주석 간소화
    - 하드코딩 변수화 (BLACKJACK = 21)
    - burst, black jack 시 글자에 색 추가
    - 'isBurst 함수' 코드 간소화
  - Issue
    - [해결] 플레이어의 합계, 딜러의 합계(playerSum, dealerSum)의 유형을 object에서 number로 변경해야 함
- **23-05-08**
  - Fix :
    - [230428 issue] Number형으로 변환
      - console.dir()를 사용하여 값 탐색
      - Number(playerSum.innerText) + let타입을 사용하여 해결
- **23-05-09**
  - Update
    - 카드 8덱으로 변경
  - Fix
    - 'play'시 플레이어가 블랙잭일 때 결과창이 나타나지 않는 현상 수정
    - 'stay'시 딜러가 이김에도 불구하고 버스트까지 드로우하는 현상 수정
      - 딜러가 17보다 작아도 플레이어보다 숫자가 크면 더 이상 드로우하지 않음
    - 'Hit'시 블랙잭이 나오면 승리 결과 표시
- **23-05-10**
  - Update
    - localStorage에 승/패/무 저장
  - Fix
    - 'hit' 시 Burst가 나온 경우에 승패결과가 나오지않는 현상 수정
    - 'stay' 시 딜러 Burst로 플레이어가 승리할 시 승,패 둘 다 적용되는 현상 해결
- **23-05-11**
  - Update
    - 게임을 끝내지 않고 'reset'버튼 클릭 시 1패 적립
    - 게임전적(전, 승, 무, 패, 승률) 표시
  - Fix
    - 상수값("Burst!", "Black Jack!", localStorage 변수) 변수화
    - localStorage에 저장하는 코드 간소화 (함수로 묶음)
- **23-05-12**
  - Update
    - 전적 초기화 기능의 버튼 추가
  - Fix
    - 'reset' 시 패만 적립이 되고, 전은 적립이 되지않는 현상 수정
- **23-05-13**
  - Fix
    - 게임전적 HTML태그 재정렬
- **23-05-14**
  - Update
    - 카드의 합계는 무조건 숫자로 보여주고, 'Burst'와 'BlackJack'의 표기는 합계 오른쪽에 따로 표기하도록 개선
  - Fix
    - 승률 개선 : (승리 / (총전적 - 무승부)) \* 100
- **23-05-19**
  - Update
    - Slot-Machine 생성
    - 'play' 버튼 클릭 시 setInterval로 랜덤한 숫자가 돌아가며, 'stop' 버튼 클릭 시 랜덤한 숫자로 멈추는 기능 생성
- **23-05-20**
  - Update : Slot-Machine
    - 결과 보여주기
      - 0~9까지 3자리 숫자
      - 1등 : 777 / 0.1 % / 20배
      - 2등 : 777을 제외한 같은 숫자 3개 / 0.9% / 5배
      - 3등 : 7-2개 / 2.7% / 3배
      - 4등 : 같은 숫자-2개(7 전부 제외) / 21%(?) / 본전
      - 5등 : 7-1개/ 24.3% / 반타작
      - 이외 : 탈락
      - Bonus : 9칸 중 7이 5개 이상 / 약 0.823% / +5,000,000 원
  - Update : Black-Jack & Slot-Machine
    - 배팅액
      - 초기 금액 설정 (게임 자체를 처음 할 시 1천만원 지급)
      - 결과에 따라 다른 배율로 배당금 지급
      - 나의 money는 localStorage에 저장
    - 배팅을 하였을 때 play 가능
    - 한 판이 끝났을 때, 이전 배팅한 금액 값을 그대로 놔두기
  - Fix : SlotMachine
    - Stop 버튼을 눌렀을 때, Stop 버튼을 비활성화 하기
- **23-05-22**
  - Update : Main
    - BGM
      - audio의 currentTime을 localStorage에 저장해 페이지 이동 시에도 이어서 재생
      - 단점
        - 페이지 이동 시 프레임이 끊김
        - 재방문 시 처음부터 재생하지 않음
        - Black-Jack의 reset 버튼이 새로고침 버튼이라 프레임이 끊김
  - Fix : Black-Jack
    - 게임 도중에 reset 버튼 클릭 시 배팅액을 잃지않는 현상 수정
  - [해결] Issue : Black-Jack
    - 게임 도중에 전적초기화 버튼을 누르고 취소 클릭 시 배팅액을 잃지않고 패배하지않는 현상
      - play 버튼을 누르면 전적초기화 버튼을 비활성화 + 게임이 끝났을 때 다시 활성화 하도록 수정할 것
- **23-05-26**
  - Update : Main
    - BGM
      - 페이지마자 각기 다른 BGM 삽입
        - 블랙잭 페이지는 reset 버튼 시 새로고침 기능을 사용하기에 BGM 미사용
      - 브라우저 정책 상 auto play가 불가능 >> 효과음 등 포기
    - 배팅
      - 1원 이상 & 자신의 금액 이하의 배팅금액만 가능하도록 변경
      - (이스터에그) 나의 금액이 0원 일 때, 메인 페이지의 'JavaScript'를 클릭하면 1천만원이 들어옴
  - Update : Black-Jack
    - 딜레이를 두고, 카드를 1장 씩 뽑는 연출 생성
      - 비동기(async-await)와 'setTimeout()'으로 구현
  - Fix : Black-Jack
    - 게임 도중에 전적초기화 버튼 비활성화
    - 다른 버튼들도 비활성화 (if-else)

---

- **to-do**

전체

- 'index.css' 수정 - 메인페이지를 따로 만들 예정
- 배팅액
  - 시드머니가 0 일 시 게임오버

슬롯머신

- 결과에 조건만 효과 들어오게 하기
  - ex. 737이면 77에만 효과 들어오게

메인 홈페이지

- 나의 금액 표시
- 나의 블랙잭 전적 표시
- 게임 바로가기 메뉴
  - 휴대폰 어플처럼 만들기
  - 그림 + 설명 + 나의 전적
- 각 게임 페이지에서 홈으로 돌아가기 버튼
